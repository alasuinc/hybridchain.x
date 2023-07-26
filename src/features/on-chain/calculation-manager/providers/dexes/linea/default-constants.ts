import { wrappedNativeTokensList } from 'src/common/tokens';
import { BLOCKCHAIN_NAME } from 'src/core/blockchain/models/blockchain-name';
import { UniswapV2ProviderConfiguration } from 'src/features/on-chain/calculation-manager/providers/dexes/common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration';

const defaultLineaRoutingProvidersAddresses = [
    wrappedNativeTokensList[BLOCKCHAIN_NAME.LINEA]!.address, // WETH
    '0xf5C6825015280CdfD0b56903F9F8B5A2233476F5', // BNB
    '0x7d43AABC515C356145049227CeE54B608342c0ad' // BUSD
];

const defaultLineaWethAddress = wrappedNativeTokensList[BLOCKCHAIN_NAME.LINEA]!.address;

export const defaultLineaProviderConfiguration: UniswapV2ProviderConfiguration = {
    maxTransitTokens: 2,
    routingProvidersAddresses: defaultLineaRoutingProvidersAddresses,
    wethAddress: defaultLineaWethAddress
};