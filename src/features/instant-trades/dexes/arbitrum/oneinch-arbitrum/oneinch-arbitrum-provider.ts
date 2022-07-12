import { OneinchAbstractProvider } from '@rsdk-features/instant-trades/dexes/common/oneinch-common/oneinch-abstract-provider';
import { BLOCKCHAIN_NAME } from '@rsdk-core/blockchain/models/blockchain-name';
import { TRADE_TYPE, TradeType } from 'src/features';

export class OneinchArbitrumProvider extends OneinchAbstractProvider {
    get type(): TradeType {
        return TRADE_TYPE.ONE_INCH_ARBITRUM;
    }

    public readonly blockchain = BLOCKCHAIN_NAME.ARBITRUM;
}