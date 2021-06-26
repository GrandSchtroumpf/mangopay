import { Api } from '../type';

export * from './event';
export * from './hook';
export * from './kyc';
export * from './payin';
export * from './payout';
export * from './sso';
export * from './transaction';
export * from './transfer';
export * from './user';
export * from './wallet';
export * from './bank';

import { userApi } from './user';
import { walletApi } from './wallet';
import { bankAccountApi } from './bank';
import { kycApi } from './kyc';
import { payinApi } from './payin';
import { cardApi } from './card';
import { eventApi } from './event';
import { transactionApi } from './transaction';
import { transferApi } from './transfer';
import { payoutApi } from './payout';
import { hookApi } from './hook';
import { clientApi } from './client';
import { ssoApi } from './sso';


export function getMangoPayApi(api: Api) {
  return {
    /** @see: https://docs.mangopay.com/endpoints/v2.01/clients */
    client: clientApi(api),
    /** @see: https://docs.mangopay.com/endpoints/v2.01/users */
    user: userApi(api),
    /** @see: https://docs.mangopay.com/endpoints/v2.01/bank-accounts */
    bankAccount: bankAccountApi(api),
    /** @see: https://docs.mangopay.com/endpoints/v2.01/wallets */
    wallet: walletApi(api),
    /** @see: https://docs.mangopay.com/endpoints/v2.01/kyc-documents */
    kyc: kycApi(api),
    /** @see: https://docs.mangopay.com/endpoints/v2.01/payins */
    payin: payinApi(api),
    /** @see: https://docs.mangopay.com/endpoints/v2.01/cards */
    card: cardApi(api),
    /** @see: https://docs.mangopay.com/endpoints/v2.01/events */
    event: eventApi(api),
    /** @see: https://docs.mangopay.com/endpoints/v2.01/transactions */
    transaction: transactionApi(api),
    /** @see: https://docs.mangopay.com/endpoints/v2.01/transfers */
    transfer: transferApi(api),
    /** @see: https://docs.mangopay.com/endpoints/v2.01/payouts */
    payout: payoutApi(api),
    /** @see: https://docs.mangopay.com/endpoints/v2.01/hooks */
    hook: hookApi(api),
    /** @see: https://docs.mangopay.com/endpoints/v2.01/sso */
    sso: ssoApi(api),
  };
}

export type MangoPay = ReturnType<typeof getMangoPayApi>;