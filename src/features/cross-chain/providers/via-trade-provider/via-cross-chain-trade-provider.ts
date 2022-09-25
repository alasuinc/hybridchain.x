import { BlockchainName, EvmBlockchainName } from 'src/core/blockchain/models/blockchain-name';
import {
    IActionStepTool,
    IGetRoutesRequestParams,
    IGetRoutesResponse,
    IRoute
} from '@viaprotocol/router-sdk/dist/types';
import { FeeInfo } from 'src/features/cross-chain/providers/common/models/fee';
import { RequiredCrossChainOptions } from 'src/features/cross-chain/models/cross-chain-options';
import {
    ViaCrossChainSupportedBlockchain,
    viaCrossChainSupportedBlockchains
} from 'src/features/cross-chain/providers/via-trade-provider/constants/via-cross-chain-supported-blockchain';
import { VIA_DEFAULT_CONFIG } from 'src/features/cross-chain/providers/via-trade-provider/constants/via-default-api-key';
import { Injector } from 'src/core/injector/injector';
import { viaContractAddress } from 'src/features/cross-chain/providers/via-trade-provider/constants/contract-data';
import { evmCommonCrossChainAbi } from 'src/features/cross-chain/providers/common/emv-cross-chain-trade/constants/evm-common-cross-chain-abi';
import { Web3Pure } from 'src/core/blockchain/web3-pure/web3-pure';
import { nativeTokensList } from 'src/common/tokens/constants/native-tokens';
import { bridges, BridgeType } from 'src/features/cross-chain/providers/common/models/bridge-type';
import { PriceToken, PriceTokenAmount } from 'src/common/tokens';
import { TRADE_TYPE, TradeType } from 'src/features/instant-trades/providers/models/trade-type';
import { Via } from '@viaprotocol/router-sdk';
import { ViaCrossChainTrade } from 'src/features/cross-chain/providers/via-trade-provider/via-cross-chain-trade';
import { CROSS_CHAIN_TRADE_TYPE } from 'src/features/cross-chain/models/cross-chain-trade-type';
import { ItType } from 'src/features/cross-chain/providers/common/models/it-type';
import { CrossChainTradeProvider } from 'src/features/cross-chain/providers/common/cross-chain-trade-provider';
import { EvmWeb3Pure } from 'src/core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure';
import BigNumber from 'bignumber.js';
import { blockchainId } from 'src/core/blockchain/utils/blockchains-info/constants/blockchain-id';
import { CalculationResult } from 'src/features/cross-chain/providers/common/models/calculation-result';

interface ToolType extends IActionStepTool {
    type: 'swap' | 'cross';
}

export class ViaCrossChainTradeProvider extends CrossChainTradeProvider {
    public static isSupportedBlockchain(
        blockchain: BlockchainName
    ): blockchain is ViaCrossChainSupportedBlockchain {
        return viaCrossChainSupportedBlockchains.some(
            supportedBlockchain => supportedBlockchain === blockchain
        );
    }

    public readonly type = CROSS_CHAIN_TRADE_TYPE.VIA;

    public isSupportedBlockchains(
        fromBlockchain: BlockchainName,
        toBlockchain: BlockchainName
    ): boolean {
        return (
            ViaCrossChainTradeProvider.isSupportedBlockchain(fromBlockchain) &&
            ViaCrossChainTradeProvider.isSupportedBlockchain(toBlockchain)
        );
    }

    public async calculate(
        from: PriceTokenAmount<EvmBlockchainName>,
        toToken: PriceToken,
        options: RequiredCrossChainOptions
    ): Promise<CalculationResult> {
        const fromBlockchain = from.blockchain;
        const toBlockchain = toToken.blockchain;
        if (
            !ViaCrossChainTradeProvider.isSupportedBlockchain(fromBlockchain) ||
            !ViaCrossChainTradeProvider.isSupportedBlockchain(toBlockchain)
        ) {
            return null;
        }

        try {
            const fromChainId = blockchainId[fromBlockchain];
            const toChainId = blockchainId[toBlockchain];

            const via = new Via({
                ...VIA_DEFAULT_CONFIG,
                timeout: options.timeout
            });

            const pages = await via.routesPages();
            const fromAddress = this.getWalletAddress(fromBlockchain);
            const toAddress = options.receiverAddress || fromAddress;
            const params: IGetRoutesRequestParams = {
                fromChainId,
                fromTokenAddress: from.address,
                // `number` max value is less, than from wei amount
                fromAmount: from.stringWeiAmount as unknown as number,
                toChainId,
                toTokenAddress: toToken.address,
                ...(fromAddress && { fromAddress }),
                ...(toAddress && { toAddress }),
                multiTx: false,
                limit: 1
            };
            const wrappedRoutes = await Promise.allSettled(
                [...Array(pages)].map((_, i) =>
                    via.getRoutes({
                        ...params,
                        offset: i + 1
                    })
                )
            );
            const routes = (
                wrappedRoutes.filter(
                    wrappedRoute =>
                        wrappedRoute.status === 'fulfilled' && wrappedRoute.value.routes.length
                ) as PromiseFulfilledResult<IGetRoutesResponse>[]
            )
                .map(wrappedRoute => wrappedRoute.value.routes)
                .flat()
                .filter(route => this.parseBridge(route));
            if (!routes.length) {
                return null;
            }

            const [fromTokenPrice, nativeTokenPrice] = await this.getTokensPrice(fromBlockchain, [
                {
                    address: from.address,
                    price: from.price
                },
                { address: EvmWeb3Pure.nativeTokenAddress }
            ]);
            const bestRoute = await this.getBestRoute(toToken, nativeTokenPrice!, routes);

            from = new PriceTokenAmount({
                ...from.asStructWithAmount,
                price: fromTokenPrice!
            });
            const to = new PriceTokenAmount({
                ...toToken.asStruct,
                weiAmount: new BigNumber(bestRoute.toTokenAmount)
            });
            const toTokenAmountMin = Web3Pure.fromWei(
                to.weiAmountMinusSlippage((bestRoute.slippage || 0) / 100),
                to.decimals
            );

            const gasData =
                options.gasCalculation === 'enabled'
                    ? await ViaCrossChainTrade.getGasData(from, to, bestRoute)
                    : null;

            const additionalFee = bestRoute.actions[0]?.additionalProviderFee;
            const cryptoFeeAmount = Web3Pure.fromWei(additionalFee?.amount.toString() || 0);
            const cryptoFeeSymbol = additionalFee?.token.symbol;
            const feeInfo = {
                ...(await this.getFeeInfo(fromBlockchain, options.providerAddress, from)),
                cryptoFee: additionalFee
                    ? {
                          amount: cryptoFeeAmount,
                          tokenSymbol: cryptoFeeSymbol!
                      }
                    : null
            };

            const nativeToken = nativeTokensList[from.blockchain];
            const cryptoFeeToken = new PriceTokenAmount({
                ...nativeToken,
                price: nativeTokenPrice || new BigNumber(0),
                tokenAmount: cryptoFeeAmount
            });

            const itType = this.parseItProviders(bestRoute);
            const bridgeType = this.parseBridge(bestRoute)!;

            return {
                trade: new ViaCrossChainTrade(
                    {
                        from,
                        to,
                        route: bestRoute,
                        gasData,
                        priceImpact: 0, // @TODO add price impact
                        toTokenAmountMin,
                        feeInfo,
                        cryptoFeeToken,
                        itType,
                        bridgeType
                    },
                    options.providerAddress,
                    fromAddress
                )
            };
        } catch (err: unknown) {
            return {
                trade: null,
                error: CrossChainTradeProvider.parseError(err)
            };
        }
    }

    private async getBestRoute(
        toToken: PriceToken,
        nativeTokenPrice: BigNumber | null,
        routes: IRoute[]
    ): Promise<IRoute> {
        const toTokenPrice = (await this.getTokensPrice(toToken.blockchain, [toToken]))[0];

        const sortedRoutes = routes.sort((routeA, routeB) => {
            if (!toTokenPrice) {
                return new BigNumber(routeB.toTokenAmount).comparedTo(routeA.toTokenAmount);
            }

            const nativeTokenAmountA = routeA.actions[0]?.additionalProviderFee?.amount;
            const nativeTokenAmountB = routeB.actions[0]?.additionalProviderFee?.amount;

            const routeProfitA = toTokenPrice
                .multipliedBy(routeA.toTokenAmount)
                .minus(nativeTokenPrice?.multipliedBy(nativeTokenAmountA?.toString() || 0) || 0);
            const routeProfitB = toTokenPrice
                .multipliedBy(routeB.toTokenAmount)
                .minus(nativeTokenPrice?.multipliedBy(nativeTokenAmountB?.toString() || 0) || 0);

            return routeProfitB.comparedTo(routeProfitA);
        });
        return sortedRoutes[0]!;
    }

    private async getTokensPrice(
        blockchain: BlockchainName,
        tokens: {
            address: string;
            price?: BigNumber;
        }[]
    ): Promise<(BigNumber | null)[]> {
        const chainId = blockchainId[blockchain];

        try {
            const response = await Injector.httpClient.get<{
                [chainId: number]: { [address: string]: { USD: number } };
            }>('https://explorer-api.via.exchange/v1/token_price', {
                params: {
                    chain: chainId,
                    tokens_addresses: tokens.map(token => token.address).join(',')
                }
            });
            return tokens.map(token => new BigNumber(response[chainId]![token.address]!.USD));
        } catch {
            return tokens.map(token => token.price || null);
        }
    }

    private parseItProviders(route: IRoute): ItType {
        const steps = route.actions[0]?.steps;

        const firstStep = steps?.[0];
        const firstItProvider =
            (firstStep?.tool as ToolType).type === 'swap' ? firstStep?.tool.name : undefined;

        const lastStep = steps?.reverse()[0];
        const secondItProvider =
            steps?.length && steps.length > 1 && (lastStep?.tool as ToolType).type === 'swap'
                ? lastStep?.tool.name
                : undefined;

        return {
            from: this.parseTradeType(firstItProvider),
            to: this.parseTradeType(secondItProvider)
        };
    }

    private parseTradeType(type: string | undefined): TradeType | undefined {
        if (!type) {
            return undefined;
        }

        type = type.toUpperCase();
        const foundType = Object.values(TRADE_TYPE).find(
            tradeType => tradeType.split('_').join('') === type
        );
        if (foundType) {
            return foundType;
        }

        switch (type) {
            case '0x':
                return TRADE_TYPE.ZRX;
            case '1INCH':
                return TRADE_TYPE.ONE_INCH;
            case '1SOL':
                return TRADE_TYPE.ONE_SOL;
            case 'DODOEX':
                return TRADE_TYPE.DODO;
            case 'TRADERJOE':
                return TRADE_TYPE.JOE;
            case 'UNISWAP':
                return TRADE_TYPE.UNISWAP_V2;
            default:
                return undefined;
        }
    }

    private parseBridge(route: IRoute): BridgeType | undefined {
        const bridgeApi = route.actions[0]?.steps.find(
            step => (step.tool as ToolType).type === 'cross'
        )?.tool.name;
        if (!bridgeApi) {
            return undefined;
        }

        return bridges.find(bridge => bridge === bridgeApi.split(' ')[0]?.toLowerCase());
    }

    protected override async getFeeInfo(
        fromBlockchain: ViaCrossChainSupportedBlockchain,
        providerAddress: string,
        percentFeeToken: PriceTokenAmount
    ): Promise<FeeInfo> {
        return {
            fixedFee: {
                amount: await this.getFixedFee(
                    fromBlockchain,
                    providerAddress,
                    viaContractAddress[fromBlockchain],
                    evmCommonCrossChainAbi
                ),
                tokenSymbol: nativeTokensList[fromBlockchain].symbol
            },
            platformFee: {
                percent: await this.getFeePercent(
                    fromBlockchain,
                    providerAddress,
                    viaContractAddress[fromBlockchain],
                    evmCommonCrossChainAbi
                ),
                tokenSymbol: percentFeeToken.symbol
            },
            cryptoFee: null
        };
    }
}
