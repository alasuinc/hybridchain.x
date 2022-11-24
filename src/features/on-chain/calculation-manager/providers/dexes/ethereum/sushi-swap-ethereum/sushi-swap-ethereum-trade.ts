import { SUSHI_SWAP_ETHEREUM_CONTRACT_ADDRESS } from 'src/features/on-chain/calculation-manager/providers/dexes/ethereum/sushi-swap-ethereum/constants';
import { UniswapV2AbstractTrade } from 'src/features/on-chain/calculation-manager/providers/dexes/common/uniswap-v2-abstract/uniswap-v2-abstract-trade';
import {
    ON_CHAIN_TRADE_TYPE,
    OnChainTradeType
} from 'src/features/on-chain/calculation-manager/providers/common/models/on-chain-trade-type';

export class SushiSwapEthereumTrade extends UniswapV2AbstractTrade {
    public static get type(): OnChainTradeType {
        return ON_CHAIN_TRADE_TYPE.SUSHI_SWAP;
    }

    public readonly dexContractAddress = SUSHI_SWAP_ETHEREUM_CONTRACT_ADDRESS;
}