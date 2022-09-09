import { BlockchainName } from '@rsdk-core/blockchain/models/blockchain-name';
import { Token } from 'src/common';

/**
 * Stores information about blockchain.
 */
export interface Blockchain<T extends BlockchainName = BlockchainName> {
    id: number;
    name: T;
    nativeCoin: Token<T>;
}
