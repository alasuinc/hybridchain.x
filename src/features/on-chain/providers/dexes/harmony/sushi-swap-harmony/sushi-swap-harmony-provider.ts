import { SushiSwapHarmonyTrade } from 'src/features/on-chain/providers/dexes/harmony/sushi-swap-harmony/sushi-swap-harmony-trade';
import { UniswapV2AbstractProvider } from 'src/features/on-chain/providers/dexes/abstract/uniswap-v2-abstract/uniswap-v2-abstract-provider';
import { BLOCKCHAIN_NAME } from 'src/core/blockchain/models/blockchain-name';
import { SUSHI_SWAP_HARMONY_PROVIDER_CONFIGURATION } from 'src/features/on-chain/providers/dexes/harmony/sushi-swap-harmony/constants';

export class SushiSwapHarmonyProvider extends UniswapV2AbstractProvider<SushiSwapHarmonyTrade> {
    public readonly blockchain = BLOCKCHAIN_NAME.HARMONY;

    public readonly UniswapV2TradeClass = SushiSwapHarmonyTrade;

    public readonly providerSettings = SUSHI_SWAP_HARMONY_PROVIDER_CONFIGURATION;
}
