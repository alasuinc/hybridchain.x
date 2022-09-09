import BigNumber from 'bignumber.js';
import { BlockchainsInfo } from 'src/core';
import { CelerCrossChainContractTrade } from '@rsdk-features/cross-chain/providers/celer-trade-provider/celer-cross-chain-contract-trade/celer-cross-chain-contract-trade';
import { CelerCrossChainContractData } from '@rsdk-features/cross-chain/providers/celer-trade-provider/celer-cross-chain-contract-data';
import { DestinationCelerSwapInfo } from '@rsdk-features/cross-chain/providers/celer-trade-provider/celer-cross-chain-contract-trade/models/destination-celer-swap-info';
import { SwapVersion } from '@rsdk-features/cross-chain/providers/common/celer-rubic/models/provider-type.enum';
import { BridgeCelerSwapInfo } from '@rsdk-features/cross-chain/providers/celer-trade-provider/celer-cross-chain-contract-trade/models/bridge-celer-swap-info';
import { CelerCrossChainSupportedBlockchain } from '@rsdk-features/cross-chain/providers/celer-trade-provider/constants/celer-cross-chain-supported-blockchain';
import { PriceTokenAmount, RubicSdkError } from 'src/common';
import { EvmWeb3Pure } from 'src/core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure';
import { EvmBlockchainName } from 'src/core/blockchain/models/blockchain-name';

export class CelerDirectCrossChainContractTrade extends CelerCrossChainContractTrade {
    public readonly fromToken: PriceTokenAmount<EvmBlockchainName>;

    public readonly toToken: PriceTokenAmount<EvmBlockchainName>;

    public readonly toTokenAmountMin: BigNumber;

    constructor(
        blockchain: CelerCrossChainSupportedBlockchain,
        contract: CelerCrossChainContractData,
        private readonly token: PriceTokenAmount<EvmBlockchainName>
    ) {
        super(blockchain, contract, 0);
        this.fromToken = this.token;
        this.toToken = this.token;
        this.toTokenAmountMin = this.toToken.tokenAmount;
    }

    protected getFirstPath(): string[] {
        return [this.token.address];
    }

    public getSecondPath(): string[] {
        return [EvmWeb3Pure.addressToBytes32(this.token.address)];
    }

    protected async modifyArgumentsForProvider(methodArguments: unknown[][]): Promise<void> {
        const exactTokensForTokens = true;
        const swapTokenWithFee = false;

        if (!methodArguments?.[0]) {
            throw new RubicSdkError('Method arguments array must not be empty');
        }

        methodArguments[0].push(exactTokensForTokens, swapTokenWithFee);
    }

    public getCelerSourceTrade(): string {
        const trade: BridgeCelerSwapInfo = {
            srcBridgeToken: this.toToken.address
        };
        return trade.srcBridgeToken;
    }

    public getCelerDestinationTrade(integratorAddress: string, receiverAddress: string): unknown[] {
        const trade: DestinationCelerSwapInfo = {
            dex: EvmWeb3Pure.EMPTY_ADDRESS,
            nativeOut: this.toToken.isNative,
            receiverEOA: receiverAddress,
            integrator: integratorAddress,
            version: SwapVersion.BRIDGE,
            path: [this.toToken.address],
            pathV3: '0x',
            deadline: 0,
            amountOutMinimum: '0'
        };
        return Object.values(trade);
    }

    /**
     * Returns method's arguments to use in source network.
     */
    public async getMethodArguments(
        toContractTrade: CelerCrossChainContractTrade,
        walletAddress: string,
        providerAddress: string,
        options: {
            maxSlippage: number;
            receiverAddress: string;
        }
    ): Promise<unknown[]> {
        const receiver = toContractTrade.contract.address || walletAddress;
        const tokenInAmountAbsolute = this.fromToken.stringWeiAmount;
        const targetChainId = BlockchainsInfo.getBlockchainByName(
            toContractTrade.toToken.blockchain
        ).id;
        const source = this.getCelerSourceTrade();
        const destination = toContractTrade.getCelerDestinationTrade(
            providerAddress,
            options.receiverAddress
        );

        return [
            receiver,
            tokenInAmountAbsolute,
            targetChainId,
            source,
            destination,
            options.maxSlippage
        ];
    }
}
