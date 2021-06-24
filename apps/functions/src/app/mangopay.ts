import fetch from 'node-fetch';
import { userApi } from './api/user';
import { walletApi } from './api/wallet';
import { bankAccountApi } from './api/bank';
import { kycApi } from './api/kyc';
import { payinApi } from './api/payin';
import { cardApi } from './api/card';
import { eventApi } from './api/event';
import { transactionApi } from './api/transaction';
import { transferApi } from './api/transfer';
import { payoutApi } from './api/payout';


interface MangoPayOptions {
  clientId: string;
  apiKey: string;
  sandbox?: boolean;
}

export interface Api {
  get<T>(url: string, queryParams?: object): Promise<T>;
  post<Input, Output>(url: string, data: Input): Promise<Output>;
  put<Input, Output>(url: string, data: Input): Promise<Output>;
}

const version = '2.01'

export function initialize(options: MangoPayOptions) {
  const { clientId, apiKey, sandbox } = options;
  const domain = sandbox
    ? `https://api.sandbox.mangopay.com/v${version}`
    : `https://api.mangopay.com/v${version}`;

  // OAuth 2.0 
  let token: string;
  let authorizationExpireTime = 0;
  async function getToken() {
    const isExpired = new Date().getTime() > authorizationExpireTime;
    if (!token || isExpired) {
      const result = await fetch(`${domain}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from(`${clientId}:${apiKey}`).toString('base64')
        },
        body: 'grant_type=client_credentials'
      });
      const { token_type, access_token, expires_in } = await result.json();
      authorizationExpireTime = new Date().getTime() + (expires_in * 1000);
      token = `${token_type} ${access_token}`;
    }
    return token;
  }


  async function post(url: string, data: unknown) {
    const authorization = await getToken();
    const res = await fetch(`${domain}/${clientId}/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorization
      },
      body: JSON.stringify(data)
    });
    if (res.status === 204) return;
    return res.json(); 
  }

  async function put(url: string, data: unknown) {
    const authorization = await getToken();
    const res = await fetch(`${domain}/${clientId}/${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorization
      },
      body: JSON.stringify(data)
    });
    return res.json();
  }

  async function get(url: string, queryParams: Record<string, string | number | boolean> = {}) {
    const params = Object.entries(queryParams).map(([key, value]) => `${key}=${value}`).join('&');
    const baseUrl = `${domain}/${clientId}/${url}`;
    const getUrl = [baseUrl, params].join('?');
    const authorization = await getToken();
    const res = await fetch(getUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authorization
      },
    });
    return res.json();
  }

  const api = { get, post, put };

  return {
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
  };
}


export type MangoPay = ReturnType<typeof initialize>;