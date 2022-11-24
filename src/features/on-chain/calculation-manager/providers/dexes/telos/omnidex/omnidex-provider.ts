import { BLOCKCHAIN_NAME } from 'src/core/blockchain/models/blockchain-name';
import { OMNIDEX_PROVIDER_CONFIGURATION } from 'src/features/on-chain/calculation-manager/providers/dexes/telos/omnidex/constants';
import { OmnidexTrade } from 'src/features/on-chain/calculation-manager/providers/dexes/telos/omnidex/omnidex-trade';
import { UniswapV2AbstractProvider } from 'src/features/on-chain/calculation-manager/providers/dexes/common/uniswap-v2-abstract/uniswap-v2-abstract-provider';

export class OmnidexProvider extends UniswapV2AbstractProvider<OmnidexTrade> {
    public readonly blockchain = BLOCKCHAIN_NAME.TELOS;

    public readonly UniswapV2TradeClass = OmnidexTrade;

    public readonly providerSettings = OMNIDEX_PROVIDER_CONFIGURATION;
}