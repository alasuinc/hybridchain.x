import { BLOCKCHAIN_NAME } from 'src/core/blockchain/models/blockchain-name';

export const changenowApiBlockchain = {
    // Evm
    [BLOCKCHAIN_NAME.ETHEREUM]: 'eth',
    [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: 'bsc',
    [BLOCKCHAIN_NAME.POLYGON]: 'matic',
    [BLOCKCHAIN_NAME.ARBITRUM]: 'arbitrum',
    [BLOCKCHAIN_NAME.BITCOIN_CASH]: 'bch',
    [BLOCKCHAIN_NAME.BITGERT]: 'brise',
    [BLOCKCHAIN_NAME.AVALANCHE]: 'avaxc',
    [BLOCKCHAIN_NAME.CELO]: 'celo',
    [BLOCKCHAIN_NAME.EOS]: 'eos',
    [BLOCKCHAIN_NAME.ETHEREUM_CLASSIC]: 'etc',
    [BLOCKCHAIN_NAME.ETHEREUM_POW]: 'ethw',
    [BLOCKCHAIN_NAME.FILECOIN]: 'fil',
    [BLOCKCHAIN_NAME.FLARE]: 'flr',
    [BLOCKCHAIN_NAME.FANTOM]: 'ftm',
    [BLOCKCHAIN_NAME.IOTEX]: 'iotx',
    [BLOCKCHAIN_NAME.KLAYTN]: 'klay',
    [BLOCKCHAIN_NAME.ONTOLOGY]: 'ont',
    [BLOCKCHAIN_NAME.OPTIMISM]: 'op',
    [BLOCKCHAIN_NAME.OASIS]: 'rose',
    [BLOCKCHAIN_NAME.SYSCOIN]: 'sys',
    [BLOCKCHAIN_NAME.THETA]: 'theta',
    [BLOCKCHAIN_NAME.XDC]: 'xdc',
    // Non evm
    [BLOCKCHAIN_NAME.BITCOIN]: 'btc',
    [BLOCKCHAIN_NAME.ICP]: 'icp',
    [BLOCKCHAIN_NAME.CARDANO]: 'ada',
    [BLOCKCHAIN_NAME.AION]: 'aion',
    [BLOCKCHAIN_NAME.ALGORAND]: 'algo',
    [BLOCKCHAIN_NAME.APTOS]: 'apt',
    [BLOCKCHAIN_NAME.ARDOR]: 'ardr',
    [BLOCKCHAIN_NAME.ASTAR]: 'astr',
    [BLOCKCHAIN_NAME.ARK]: 'ark',
    [BLOCKCHAIN_NAME.COSMOS]: 'atom',
    [BLOCKCHAIN_NAME.BAND_PROTOCOL]: 'band',
    [BLOCKCHAIN_NAME.BITCOIN_DIAMOND]: 'bcd',
    [BLOCKCHAIN_NAME.BSV]: 'bsv',
    [BLOCKCHAIN_NAME.BITCOIN_GOLD]: 'btg',
    [BLOCKCHAIN_NAME.CASPER]: 'cspr',
    [BLOCKCHAIN_NAME.DASH]: 'dash',
    [BLOCKCHAIN_NAME.DECRED]: 'dcr',
    [BLOCKCHAIN_NAME.DIGI_BYTE]: 'dgb',
    [BLOCKCHAIN_NAME.DIVI]: 'divi',
    [BLOCKCHAIN_NAME.DOGECOIN]: 'doge',
    [BLOCKCHAIN_NAME.POLKADOT]: 'dot',
    [BLOCKCHAIN_NAME.MULTIVERS_X]: 'egld',
    [BLOCKCHAIN_NAME.FIO_PROTOCOL]: 'fio',
    [BLOCKCHAIN_NAME.FIRO]: 'firo',
    [BLOCKCHAIN_NAME.FLOW]: 'flow',
    [BLOCKCHAIN_NAME.HEDERA]: 'hbar',
    [BLOCKCHAIN_NAME.HELIUM]: 'hnt',
    [BLOCKCHAIN_NAME.ICON]: 'icx',
    [BLOCKCHAIN_NAME.IOST]: 'iost',
    [BLOCKCHAIN_NAME.IOTA]: 'iota',
    [BLOCKCHAIN_NAME.KADENA]: 'kda',
    [BLOCKCHAIN_NAME.KOMODO]: 'kmd',
    [BLOCKCHAIN_NAME.KUSAMA]: 'ksm',
    [BLOCKCHAIN_NAME.LISK]: 'lsk',
    [BLOCKCHAIN_NAME.LITECOIN]: 'ltc',
    [BLOCKCHAIN_NAME.TERRA]: 'luna',
    [BLOCKCHAIN_NAME.TERRA_CLASSIC]: 'lunc',
    [BLOCKCHAIN_NAME.MINA_PROTOCOL]: 'mina',
    [BLOCKCHAIN_NAME.NANO]: 'nano',
    [BLOCKCHAIN_NAME.NEAR]: 'near',
    [BLOCKCHAIN_NAME.NEO]: 'neo',
    [BLOCKCHAIN_NAME.OSMOSIS]: 'osmo',
    [BLOCKCHAIN_NAME.PIVX]: 'pivx',
    [BLOCKCHAIN_NAME.POLYX]: 'polyx',
    [BLOCKCHAIN_NAME.QTUM]: 'qtum',
    [BLOCKCHAIN_NAME.THOR_CHAIN]: 'rune',
    [BLOCKCHAIN_NAME.RAVENCOIN]: 'rvn',
    [BLOCKCHAIN_NAME.SIA]: 'sc',
    [BLOCKCHAIN_NAME.SECRET]: 'scrt',
    [BLOCKCHAIN_NAME.SOLANA]: 'sol',
    [BLOCKCHAIN_NAME.STEEM]: 'steem',
    [BLOCKCHAIN_NAME.STRATIS]: 'strax',
    [BLOCKCHAIN_NAME.STACKS]: 'stx',
    [BLOCKCHAIN_NAME.SOLAR]: 'sxp',
    [BLOCKCHAIN_NAME.TON]: 'ton',
    [BLOCKCHAIN_NAME.VE_CHAIN]: 'vet',
    [BLOCKCHAIN_NAME.WAVES]: 'waves',
    [BLOCKCHAIN_NAME.WAX]: 'waxp',
    [BLOCKCHAIN_NAME.DX_CHAIN]: 'xchain',
    [BLOCKCHAIN_NAME.E_CASH]: 'xec',
    [BLOCKCHAIN_NAME.NEM]: 'xem',
    [BLOCKCHAIN_NAME.STELLAR]: 'xlm',
    [BLOCKCHAIN_NAME.MONERO]: 'xmr',
    [BLOCKCHAIN_NAME.RIPPLE]: 'xrp',
    [BLOCKCHAIN_NAME.TEZOS]: 'xtz',
    [BLOCKCHAIN_NAME.VERGE]: 'xvg',
    [BLOCKCHAIN_NAME.SYMBOL]: 'xym',
    [BLOCKCHAIN_NAME.ZCASH]: 'zec',
    [BLOCKCHAIN_NAME.HORIZEN]: 'zen',
    [BLOCKCHAIN_NAME.ZILLIQA]: 'zil',
    [BLOCKCHAIN_NAME.TRON]: 'trx',
    [BLOCKCHAIN_NAME.KAVA_COSMOS]: 'kava'
};

export type ChangenowCrossChainSupportedBlockchain = keyof typeof changenowApiBlockchain;