import { BLOCKCHAIN_NAME } from 'src/core/blockchain/models/blockchain-name';
import { OneinchAbstractProvider } from 'src/features/on-chain/calculation-manager/providers/dexes/common/oneinch-abstract/oneinch-abstract-provider';

export class OneinchZksyncProvider extends OneinchAbstractProvider {
    public readonly blockchain = BLOCKCHAIN_NAME.ZK_SYNC;
}