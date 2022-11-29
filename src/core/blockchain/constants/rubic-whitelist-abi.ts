import { AbiItem } from 'web3-utils';

export const rubicWhitelistContractAbi: AbiItem[] = [
    {
        anonymous: false,
        inputs: [{ indexed: false, internalType: 'address', name: 'newAdmin', type: 'address' }],
        name: 'AcceptAdmin',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [{ indexed: false, internalType: 'uint8', name: 'version', type: 'uint8' }],
        name: 'Initialized',
        type: 'event'
    },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: 'address', name: 'currentAdmin', type: 'address' },
            { indexed: false, internalType: 'address', name: 'pendingAdmin', type: 'address' }
        ],
        name: 'TransferAdmin',
        type: 'event'
    },
    {
        inputs: [],
        name: 'acceptAdmin',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address[]', name: '_anyRouters', type: 'address[]' }],
        name: 'addAnyRouters',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address[]', name: '_crossChains', type: 'address[]' }],
        name: 'addCrossChains',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address[]', name: '_dexs', type: 'address[]' }],
        name: 'addDEXs',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address[]', name: '_operators', type: 'address[]' }],
        name: 'addOperators',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address[]', name: '_blackAddrs', type: 'address[]' }],
        name: 'addToBlackList',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [],
        name: 'admin',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getAvailableAnyRouters',
        outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getAvailableCrossChains',
        outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getAvailableDEXs',
        outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getAvailableOperators',
        outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'getBlackList',
        outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address[]', name: '_operators', type: 'address[]' },
            { internalType: 'address', name: '_admin', type: 'address' }
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_router', type: 'address' }],
        name: 'isBlacklisted',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_operator', type: 'address' }],
        name: 'isOperator',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_anyRouter', type: 'address' }],
        name: 'isWhitelistedAnyRouter',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_crossChain', type: 'address' }],
        name: 'isWhitelistedCrossChain',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_dex', type: 'address' }],
        name: 'isWhitelistedDEX',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [],
        name: 'pendingAdmin',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address[]', name: '_anyRouters', type: 'address[]' }],
        name: 'removeAnyRouters',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address[]', name: '_crossChains', type: 'address[]' }],
        name: 'removeCrossChains',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address[]', name: '_dexs', type: 'address[]' }],
        name: 'removeDEXs',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address[]', name: '_blackAddrs', type: 'address[]' }],
        name: 'removeFromBlackList',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address[]', name: '_operators', type: 'address[]' }],
        name: 'removeOperators',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [
            { internalType: 'address', name: '_token', type: 'address' },
            { internalType: 'uint256', name: '_amount', type: 'uint256' }
        ],
        name: 'sweepTokens',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    {
        inputs: [{ internalType: 'address', name: '_admin', type: 'address' }],
        name: 'transferAdmin',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    }
];
