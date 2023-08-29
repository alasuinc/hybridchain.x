export const TEST_EVM_BLOCKCHAIN_NAME = {
    MUMBAI: 'MUMBAI',
    BINANCE_SMART_CHAIN_TESTNET: 'BSCT',
    GOERLI: 'GOERLI',
    FUJI: 'FUJI',
    SCROLL_SEPOLIA: 'SCROLL_SEPOLIA'
} as const;
export const MAIN_EVM_BLOCKCHAIN_NAME = {
    ETHEREUM: 'ETH',
    BINANCE_SMART_CHAIN: 'BSC',
    POLYGON: 'POLYGON',
    POLYGON_ZKEVM: 'POLYGON_ZKEVM',
    AVALANCHE: 'AVALANCHE',
    MOONRIVER: 'MOONRIVER',
    FANTOM: 'FANTOM',
    HARMONY: 'HARMONY',
    ARBITRUM: 'ARBITRUM',
    AURORA: 'AURORA',
    TELOS: 'TELOS',
    OPTIMISM: 'OPTIMISM',
    CRONOS: 'CRONOS',
    OKE_X_CHAIN: 'OKX',
    GNOSIS: 'GNOSIS',
    FUSE: 'FUSE',
    MOONBEAM: 'MOONBEAM',
    CELO: 'CELO',
    BOBA: 'BOBA',
    BOBA_BSC: 'BOBA_BSC',
    BOBA_AVALANCHE: 'BOBA_AVALANCHE',
    ASTAR_EVM: 'ASTAR_EVM',
    ETHEREUM_POW: 'ETHW',
    KAVA: 'KAVA',
    BITGERT: 'BITGERT',
    OASIS: 'OASIS',
    METIS: 'METIS',
    DFK: 'DEFIKINGDOMS',
    KLAYTN: 'KLAYTN',
    VELAS: 'VELAS',
    SYSCOIN: 'SYSCOIN',
    ETHEREUM_CLASSIC: 'ETHEREUM_CLASSIC',
    FLARE: 'FLARE',
    IOTEX: 'IOTEX',
    THETA: 'THETA',
    BITCOIN_CASH: 'BITCOIN_CASH',
    ZK_SYNC: 'ZK_SYNC',
    PULSECHAIN: 'PULSECHAIN',
    LINEA: 'LINEA',
    BASE: 'BASE',
    MANTLE: 'MANTLE'
} as const;

export const EVM_BLOCKCHAIN_NAME = {
    ...TEST_EVM_BLOCKCHAIN_NAME,
    ...MAIN_EVM_BLOCKCHAIN_NAME
} as const;

const NON_EVM_BLOCKCHAIN_NAME = {
    SOLANA: 'SOLANA',
    NEAR: 'NEAR',
    BITCOIN: 'BITCOIN',
    TRON: 'TRON',
    ICP: 'ICP',
    CARDANO: 'CARDANO',
    AION: 'AION',
    ALGORAND: 'ALGORAND',
    APTOS: 'APTOS',
    ARDOR: 'ARDOR',
    ARK: 'ARK',
    ASTAR: 'ASTAR',
    COSMOS: 'COSMOS',
    BAND_PROTOCOL: 'BAND_PROTOCOL',
    BITCOIN_DIAMOND: 'BITCOIN_DIAMOND',
    BSV: 'BSV',
    BITCOIN_GOLD: 'BITCOIN_GOLD',
    CASPER: 'CASPER',
    DASH: 'DASH',
    DECRED: 'DECRED',
    DIGI_BYTE: 'DIGI_BYTE',
    DIVI: 'DIVI',
    DOGECOIN: 'DOGECOIN',
    POLKADOT: 'POLKADOT',
    MULTIVERS_X: 'MULTIVERS_X',
    FIO_PROTOCOL: 'FIO_PROTOCOL',
    FIRO: 'FIRO',
    FLOW: 'FLOW',
    HEDERA: 'HEDERA',
    HELIUM: 'HELIUM',
    ICON: 'ICON',
    IOST: 'IOST',
    IOTA: 'IOTA',
    KADENA: 'KADENA',
    KOMODO: 'KOMODO',
    KUSAMA: 'KUSAMA',
    LISK: 'LISK',
    LITECOIN: 'LITECOIN',
    TERRA: 'TERRA',
    TERRA_CLASSIC: 'TERRA_CLASSIC',
    MINA_PROTOCOL: 'MINA_PROTOCOL',
    NANO: 'NANO',
    NEO: 'NEO',
    OSMOSIS: 'OSMOSIS',
    PIVX: 'PIVX',
    POLYX: 'POLYX',
    QTUM: 'QTUM',
    THOR_CHAIN: 'THOR_CHAIN',
    RAVENCOIN: 'RAVENCOIN',
    SIA: 'SIA',
    SECRET: 'SECRET',
    STEEM: 'STEEM',
    STRATIS: 'STRATIS',
    STACKS: 'STACKS',
    SOLAR: 'SOLAR',
    TON: 'TON',
    VE_CHAIN: 'VE_CHAIN',
    WAVES: 'WAVES',
    WAX: 'WAX',
    DX_CHAIN: 'DX_CHAIN',
    E_CASH: 'E_CASH',
    NEM: 'NEM',
    STELLAR: 'STELLAR',
    MONERO: 'MONERO',
    RIPPLE: 'RIPPLE',
    TEZOS: 'TEZOS',
    VERGE: 'VERGE',
    SYMBOL: 'SYMBOL',
    ZCASH: 'ZCASH',
    HORIZEN: 'HORIZEN',
    ZILLIQA: 'ZILLIQA',
    KAVA_COSMOS: 'KAVA_COSMOS',
    FILECOIN: 'FILECOIN',
    EOS: 'EOS',
    ONTOLOGY: 'ONTOLOGY',
    XDC: 'XDC'
} as const;

export const BLOCKCHAIN_NAME = {
    ...EVM_BLOCKCHAIN_NAME,
    ...NON_EVM_BLOCKCHAIN_NAME
} as const;

export type BlockchainName = (typeof BLOCKCHAIN_NAME)[keyof typeof BLOCKCHAIN_NAME];

export type TestnetEvmBlockchain =
    (typeof TEST_EVM_BLOCKCHAIN_NAME)[keyof typeof TEST_EVM_BLOCKCHAIN_NAME];
export type EvmBlockchainName = (typeof EVM_BLOCKCHAIN_NAME)[keyof typeof EVM_BLOCKCHAIN_NAME];
export type SolanaBlockchainName = typeof BLOCKCHAIN_NAME.SOLANA;
export type NearBlockchainName = typeof BLOCKCHAIN_NAME.NEAR;
export type BitcoinBlockchainName = typeof BLOCKCHAIN_NAME.BITCOIN;
export type TronBlockchainName = typeof BLOCKCHAIN_NAME.TRON;
export type IcpBlockchainName = typeof BLOCKCHAIN_NAME.ICP;

export const MAINNET_BLOCKCHAIN_NAME = {
    ...MAIN_EVM_BLOCKCHAIN_NAME,
    ...NON_EVM_BLOCKCHAIN_NAME
} as const;

export type MainnetBlockchainName =
    (typeof MAINNET_BLOCKCHAIN_NAME)[keyof typeof MAINNET_BLOCKCHAIN_NAME];
