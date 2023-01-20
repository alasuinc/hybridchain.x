import { BLOCKCHAIN_NAME } from 'src/core/blockchain/models/blockchain-name';

export const multichainProxyCrossChainSupportedBlockchains = [
    BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN,
    BLOCKCHAIN_NAME.POLYGON,
    BLOCKCHAIN_NAME.KAVA,
    BLOCKCHAIN_NAME.BITGERT,
    BLOCKCHAIN_NAME.CRONOS,
    BLOCKCHAIN_NAME.ARBITRUM,
    BLOCKCHAIN_NAME.FANTOM,
    BLOCKCHAIN_NAME.MOONRIVER,
    BLOCKCHAIN_NAME.TELOS,
    BLOCKCHAIN_NAME.MOONBEAM,
    BLOCKCHAIN_NAME.FUSE,
    BLOCKCHAIN_NAME.CELO,
    BLOCKCHAIN_NAME.OKE_X_CHAIN,
    BLOCKCHAIN_NAME.BOBA,
    BLOCKCHAIN_NAME.GNOSIS,
    BLOCKCHAIN_NAME.OPTIMISM,
    BLOCKCHAIN_NAME.AVALANCHE,
    BLOCKCHAIN_NAME.ETHEREUM,
    BLOCKCHAIN_NAME.OASIS,
    BLOCKCHAIN_NAME.METIS,
    BLOCKCHAIN_NAME.DFK,
    BLOCKCHAIN_NAME.KLAYTN,
    BLOCKCHAIN_NAME.VELAS,
    BLOCKCHAIN_NAME.SYSCOIN
] as const;

export type MultichainProxyCrossChainSupportedBlockchain =
    typeof multichainProxyCrossChainSupportedBlockchains[number];
