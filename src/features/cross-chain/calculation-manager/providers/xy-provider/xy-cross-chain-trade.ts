import { EvmBlockchainName } from 'src/core/blockchain/models/blockchain-name';
import { FeeInfo } from 'src/features/cross-chain/calculation-manager/providers/common/models/fee-info';
import { PriceTokenAmount } from 'src/common/tokens';
import { GasData } from 'src/features/cross-chain/calculation-manager/providers/common/emv-cross-chain-trade/models/gas-data';
import { Injector } from 'src/core/injector/injector';
import { CROSS_CHAIN_TRADE_TYPE } from 'src/features/cross-chain/calculation-manager/models/cross-chain-trade-type';
import { evmCommonCrossChainAbi } from 'src/features/cross-chain/calculation-manager/providers/common/emv-cross-chain-trade/constants/evm-common-cross-chain-abi';
import { Web3Pure } from 'src/core/blockchain/web3-pure/web3-pure';
import BigNumber from 'bignumber.js';
import { blockchainId } from 'src/core/blockchain/utils/blockchains-info/constants/blockchain-id';
import { EvmCrossChainTrade } from 'src/features/cross-chain/calculation-manager/providers/common/emv-cross-chain-trade/evm-cross-chain-trade';
import { GetContractParamsOptions } from 'src/features/cross-chain/calculation-manager/providers/common/models/get-contract-params-options';
import { BRIDGE_TYPE } from 'src/features/cross-chain/calculation-manager/providers/common/models/bridge-type';
import { xyContractAddress } from 'src/features/cross-chain/calculation-manager/providers/xy-provider/constants/xy-contract-address';
import { XyCrossChainSupportedBlockchain } from 'src/features/cross-chain/calculation-manager/providers/xy-provider/constants/xy-supported-blockchains';
import { XyCrossChainProvider } from 'src/features/cross-chain/calculation-manager/providers/xy-provider/xy-cross-chain-provider';
import { XyTransactionRequest } from 'src/features/cross-chain/calculation-manager/providers/xy-provider/models/xy-transaction-request';
import { XyTransactionResponse } from 'src/features/cross-chain/calculation-manager/providers/xy-provider/models/xy-transaction-response';
import { TradeInfo } from 'src/features/cross-chain/calculation-manager/providers/common/models/trade-info';
import { EvmWeb3Pure } from 'src/core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure';
import { ContractParams } from 'src/features/common/models/contract-params';

/**
 * Calculated XY cross-chain trade.
 */
export class XyCrossChainTrade extends EvmCrossChainTrade {
    /** @internal */
    public static async getGasData(
        from: PriceTokenAmount<EvmBlockchainName>,
        to: PriceTokenAmount<EvmBlockchainName>,
        transactionRequest: XyTransactionRequest
    ): Promise<GasData | null> {
        const fromBlockchain = from.blockchain as XyCrossChainSupportedBlockchain;
        const walletAddress =
            Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }

        try {
            const { contractAddress, contractAbi, methodName, methodArguments, value } =
                await new XyCrossChainTrade(
                    {
                        from,
                        to,
                        transactionRequest,
                        gasData: null,
                        priceImpact: 0,
                        slippage: 0,
                        feeInfo: {
                            fixedFee: { amount: new BigNumber(0), tokenSymbol: '' },
                            platformFee: { percent: 0, tokenSymbol: '' },
                            cryptoFee: null
                        }
                    },
                    EvmWeb3Pure.EMPTY_ADDRESS
                ).getContractParams({});

            const web3Public = Injector.web3PublicService.getWeb3Public(fromBlockchain);
            const [gasLimit, gasPrice] = await Promise.all([
                web3Public.getEstimatedGas(
                    contractAbi,
                    contractAddress,
                    methodName,
                    methodArguments,
                    walletAddress,
                    value
                ),
                new BigNumber(await Injector.gasPriceApi.getGasPrice(from.blockchain))
            ]);

            if (!gasLimit?.isFinite()) {
                return null;
            }

            const increasedGasLimit = Web3Pure.calculateGasMargin(gasLimit, 1.2);
            return {
                gasLimit: increasedGasLimit,
                gasPrice
            };
        } catch (_err) {
            return null;
        }
    }

    public static readonly nativeAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

    public readonly type = CROSS_CHAIN_TRADE_TYPE.XY;

    public readonly isAggregator = false;

    public readonly onChainSubtype = {
        from: undefined,
        to: undefined
    };

    public readonly bridgeType = BRIDGE_TYPE.XY;

    public readonly from: PriceTokenAmount<EvmBlockchainName>;

    public readonly to: PriceTokenAmount<EvmBlockchainName>;

    public readonly toTokenAmountMin: BigNumber;

    public readonly priceImpact: number;

    public readonly gasData: GasData | null;

    private readonly transactionRequest: XyTransactionRequest;

    private get fromBlockchain(): XyCrossChainSupportedBlockchain {
        return this.from.blockchain as XyCrossChainSupportedBlockchain;
    }

    protected get fromContractAddress(): string {
        return xyContractAddress[this.fromBlockchain].rubicRouter;
    }

    public readonly feeInfo: FeeInfo;

    private readonly slippage: number;

    constructor(
        crossChainTrade: {
            from: PriceTokenAmount<EvmBlockchainName>;
            to: PriceTokenAmount<EvmBlockchainName>;
            transactionRequest: XyTransactionRequest;
            gasData: GasData | null;
            priceImpact: number;
            slippage: number;
            feeInfo: FeeInfo;
        },
        providerAddress: string
    ) {
        super(providerAddress);

        this.from = crossChainTrade.from;
        this.to = crossChainTrade.to;
        this.transactionRequest = crossChainTrade.transactionRequest;
        this.gasData = crossChainTrade.gasData;
        this.priceImpact = crossChainTrade.priceImpact;
        this.slippage = crossChainTrade.slippage;
        this.toTokenAmountMin = this.to.tokenAmount.multipliedBy(1 - crossChainTrade.slippage);
        this.feeInfo = crossChainTrade.feeInfo;
        this.priceImpact = crossChainTrade.priceImpact;
    }

    public async getContractParams(options: GetContractParamsOptions): Promise<ContractParams> {
        const receiverAddress = options?.receiverAddress || this.walletAddress;
        const { data, value: providerValue } = await this.getTransactionRequest(receiverAddress);
        const toChainId = blockchainId[this.to.blockchain];
        const fromContracts = xyContractAddress[this.fromBlockchain];

        const swapArguments = [
            this.from.address,
            this.from.stringWeiAmount,
            toChainId,
            this.to.address,
            Web3Pure.toWei(this.toTokenAmountMin, this.to.decimals),
            receiverAddress,
            this.providerAddress,
            fromContracts.providerRouter
        ];

        const methodArguments: unknown[] = [`native:${this.type.toLowerCase()}`, swapArguments];
        if (!this.from.isNative) {
            methodArguments.push(fromContracts.providerGateway);
        }
        methodArguments.push(data);

        const value = this.getSwapValue(providerValue);

        return {
            contractAddress: fromContracts.rubicRouter,
            contractAbi: evmCommonCrossChainAbi,
            methodName: this.methodName,
            methodArguments,
            value
        };
    }

    public getTradeAmountRatio(fromUsd: BigNumber): BigNumber {
        return fromUsd.dividedBy(this.to.tokenAmount);
    }

    private async getTransactionRequest(receiverAddress?: string): Promise<{
        data: string;
        value: string;
    }> {
        const params: XyTransactionRequest = {
            ...this.transactionRequest,
            ...(receiverAddress && { receiveAddress: receiverAddress })
        };

        const { tx } = await Injector.httpClient.get<XyTransactionResponse>(
            `${XyCrossChainProvider.apiEndpoint}/swap`,
            { params: { ...params } }
        );
        return tx!;
    }

    public getUsdPrice(): BigNumber {
        return this.from.price.multipliedBy(this.from.tokenAmount);
    }

    public getTradeInfo(): TradeInfo {
        return {
            estimatedGas: this.estimatedGas,
            feeInfo: this.feeInfo,
            priceImpact: this.priceImpact ? { total: this.priceImpact } : null,
            slippage: { total: this.slippage }
        };
    }
}