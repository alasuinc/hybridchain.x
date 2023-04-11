import { BridgersCrossChainProvider } from 'src/features/cross-chain/calculation-manager/providers/bridgers-provider/bridgers-cross-chain-provider';
import { CbridgeCrossChainProvider } from 'src/features/cross-chain/calculation-manager/providers/cbridge/cbridge-cross-chain-provider';
import { ChangenowCrossChainProvider } from 'src/features/cross-chain/calculation-manager/providers/changenow-provider/changenow-cross-chain-provider';
import { DebridgeCrossChainProvider } from 'src/features/cross-chain/calculation-manager/providers/debridge-provider/debridge-cross-chain-provider';
import { LifiCrossChainProvider } from 'src/features/cross-chain/calculation-manager/providers/lifi-provider/lifi-cross-chain-provider';
import { MultichainCrossChainProvider } from 'src/features/cross-chain/calculation-manager/providers/multichain-provider/multichain-cross-chain-provider';
import { SymbiosisCrossChainProvider } from 'src/features/cross-chain/calculation-manager/providers/symbiosis-provider/symbiosis-cross-chain-provider';
import { XyCrossChainProvider } from 'src/features/cross-chain/calculation-manager/providers/xy-provider/xy-cross-chain-provider';

import { StargateCrossChainProvider } from '../providers/stargate-provider/stargate-cross-chain-provider';

const proxyProviders = [
    SymbiosisCrossChainProvider,
    MultichainCrossChainProvider,
    StargateCrossChainProvider,
    XyCrossChainProvider,
    CbridgeCrossChainProvider,
    LifiCrossChainProvider
] as const;

const nonProxyProviders = [
    DebridgeCrossChainProvider,
    BridgersCrossChainProvider,
    ChangenowCrossChainProvider
] as const;

export const CrossChainProviders = [
    ...proxyProviders,
    ...nonProxyProviders
    // CelerCrossChainProvider,
    // RangoCrossChainProvider,
    // ViaCrossChainProvider,
] as const;