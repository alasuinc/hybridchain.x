import BigNumber from 'bignumber.js';
import { PriceTokenAmount, Web3Public } from 'src/core';
import {
    CROSS_CHAIN_TRADE_TYPE,
    CrossChainTrade,
    SwapTransactionOptions,
    TradeType
} from 'src/features';
import { Route } from '@lifinance/sdk';
import { Injector } from 'src/core/sdk/injector';
import { FailedToCheckForTransactionReceiptError } from 'src/common';
import {
    lifiContractAbi,
    lifiContractAddress
} from 'src/features/cross-chain/providers/lifi-trade-provider/constants/lifi-contract-data';
import { GasData } from 'src/features/cross-chain/models/gas-data';
import { EMPTY_ADDRESS } from 'src/core/blockchain/constants/empty-address';

/**
 * Calculated Celer cross chain trade.
 */
export class LifiCrossChainTrade extends CrossChainTrade {
    public readonly type = CROSS_CHAIN_TRADE_TYPE.LIFI;

    private readonly httpClient = Injector.httpClient;

    public readonly from: PriceTokenAmount;

    public readonly to: PriceTokenAmount;

    public readonly toTokenAmountMin: BigNumber;

    public readonly gasData: GasData | null;

    protected readonly fromWeb3Public: Web3Public;

    private readonly route: Route;

    // @TODO update
    public readonly itType: { from: TradeType; to: TradeType } = {
        from: 'ONE_INCH_ARBITRUM',
        to: 'ONE_INCH_ARBITRUM'
    };

    public get fromContractAddress() {
        return lifiContractAddress;
    }

    constructor(
        crossChainTrade: {
            from: PriceTokenAmount;
            to: PriceTokenAmount;
            route: Route;
            gasData: GasData | null;
            toTokenAmountMin: BigNumber;
        },
        providerAddress: string
    ) {
        super(providerAddress);

        this.from = crossChainTrade.from;
        this.to = crossChainTrade.to;
        this.route = crossChainTrade.route;
        this.gasData = crossChainTrade.gasData;
        this.toTokenAmountMin = crossChainTrade.toTokenAmountMin;

        this.fromWeb3Public = Injector.web3PublicService.getWeb3Public(this.from.blockchain);
    }

    protected async checkTradeErrors(): Promise<void | never> {
        this.checkWalletConnected();
        this.checkBlockchainCorrect();

        await Promise.all([this.checkUserBalance()]);
    }

    public async swap(options: SwapTransactionOptions = {}): Promise<string | never> {
        await this.checkTradeErrors();
        await this.checkAllowanceAndApprove(options);

        const { onConfirm, gasLimit, gasPrice } = options;

        const { contractAddress, contractAbi, methodName, methodArguments, value } =
            await this.getContractParams();

        let transactionHash: string;
        try {
            const onTransactionHash = (hash: string) => {
                if (onConfirm) {
                    onConfirm(hash);
                }
                transactionHash = hash;
            };

            await Injector.web3Private.tryExecuteContractMethod(
                contractAddress,
                contractAbi,
                methodName,
                methodArguments,
                {
                    gas: gasLimit,
                    gasPrice,
                    value,
                    onTransactionHash
                }
            );

            return transactionHash!;
        } catch (err) {
            if (err instanceof FailedToCheckForTransactionReceiptError) {
                return transactionHash!;
            }
            throw err;
        }
    }

    public async getContractParams() {
        const methodName = 'lifiCall';

        const data = await this.getSwapData();
        const methodArguments = [this.from.address, this.from.stringWeiAmount, EMPTY_ADDRESS, data];

        const value = this.from.isNative ? this.from.stringWeiAmount : '0';

        return {
            contractAddress: lifiContractAddress,
            contractAbi: lifiContractAbi,
            methodName,
            methodArguments,
            value
        };
    }

    private async getSwapData(): Promise<string> {
        const firstStep = this.route.steps[0]!;
        const step = {
            ...firstStep,
            action: {
                ...firstStep.action,
                fromAddress: this.walletAddress,
                toAddress: this.walletAddress
            },
            execution: {
                status: 'NOT_STARTED',
                process: [
                    {
                        message: 'Preparing transaction.',
                        startedAt: Date.now(),
                        status: 'STARTED',
                        type: 'CROSS_CHAIN'
                    }
                ]
            }
        };

        const swapResponse: {
            transactionRequest: {
                data: string;
            };
        } = await this.httpClient.post('https://li.quest/v1/advanced/stepTransaction', {
            ...step
        });

        return swapResponse.transactionRequest.data;
    }
}
