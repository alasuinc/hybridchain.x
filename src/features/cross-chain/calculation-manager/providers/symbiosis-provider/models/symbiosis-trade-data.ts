import { TransactionRequest } from '@ethersproject/abstract-provider';
import { Percent, SymbiosisTradeType, TokenAmount } from 'symbiosis-js-sdk';

export interface SymbiosisTradeData {
    fee: TokenAmount;
    tokenAmountOut: TokenAmount;
    priceImpact: Percent;
    transactionRequest: TransactionRequest;
    inTradeType?: SymbiosisTradeType;
    outTradeType?: SymbiosisTradeType;
}
