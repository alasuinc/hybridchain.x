import {
    UniswapV2AbstractTrade,
    UniswapV2TradeStruct
} from 'src/features/on-chain/calculation-manager/providers/dexes/abstract/uniswap-v2-abstract/uniswap-v2-abstract-trade';
import { SUSHI_SWAP_POLYGON_CONTRACT_ADDRESS } from 'src/features/on-chain/calculation-manager/providers/dexes/polygon/sushi-swap-polygon/constants';
import {
    ON_CHAIN_TRADE_TYPE,
    OnChainTradeType
} from 'src/features/on-chain/calculation-manager/providers/models/on-chain-trade-type';

export class SushiSwapPolygonTrade extends UniswapV2AbstractTrade {
    public static get type(): OnChainTradeType {
        return ON_CHAIN_TRADE_TYPE.SUSHI_SWAP;
    }

    public readonly contractAddress = SUSHI_SWAP_POLYGON_CONTRACT_ADDRESS;

    constructor(tradeStruct: UniswapV2TradeStruct) {
        super(tradeStruct);
    }
}