import type { Api } from "../mangopay";
import { CurrencyISO, Money, FundsType } from "../type";

type TransactionNature = 'REGULAR' | 'REPUDIATION' | 'REFUND' | 'SETTLEMENT';
type TransactionStatus = 'CREATED' | 'SUCCEEDED' | 'FAILED';
type TransactionType = 'PAYIN' | 'TRANSFER' | 'PAYOUT';

interface Transaction {
  DebitedFunds: Money;
  CreditedFunds: Money;
  Fees: Money;
  DebitedWalletId: string;
  CreditedWalletId: string;
  AuthorId: string;
  CreditedUserId: string;
  Nature: TransactionNature;
  Status: TransactionStatus;
  ExecutionDate: number;
  ResultCode: string;
  ResultMessage: string;
  Type: TransactionType;
}

interface TransactionQueryParams {
  /** The result code of the transaction */
  ResultCode: string | string[];
  /** The status of the transaction */
  Status: TransactionStatus | TransactionStatus[];
}

/** Join array of string from the query params if any */
function transactionQueryParams(query?: TransactionQueryParams) {
  if (!query) return;
  const fromArray = (data: string | string[]) => Array.isArray(data) ? data.join() : data;
  return {
    ResultCode: fromArray(query.ResultCode),
    Status: fromArray(query.Status),
  };
}

export const transactionApi = ({ get }: Api) => ({
  listByUser(userId: string): Promise<Transaction[]> {
    return get(`users/${userId}/transactions`);
  },
  listByWallet(walletId: string): Promise<Transaction[]> {
    return get(`wallets/${walletId}/transactions`);
  },
  listByDispute(disputeId: string): Promise<Transaction[]> {
    return get(`disputes/${disputeId}/transactions`);
  },
  listByFundsType(fundType: FundsType, currency: CurrencyISO): Promise<Transaction[]> {
    return get(`wallets/${fundType}/${currency}/transactions`);
  },
  listByPreauthorization(preAuthorizationId: string): Promise<Transaction[]> {
    return get(`preauthorizations/${preAuthorizationId}/transactions`);
  },
  listByBankAccount(bankAccountId: string, queryParams?: TransactionQueryParams): Promise<Transaction[]> {
    return get(`bankaccounts/${bankAccountId}/transactions`, transactionQueryParams(queryParams));
  },
  listByCard(cardId: string, queryParams?: TransactionQueryParams): Promise<Transaction[]> {
    return get(`cards/${cardId}/transactions`, transactionQueryParams(queryParams));
  },
  listByMandate(mandateId: string, queryParams?: TransactionQueryParams): Promise<Transaction[]> {
    return get(`mandates/${mandateId}/transactions`, transactionQueryParams(queryParams));
  },
  listByFingerprint(fingerprint: string): Promise<Transaction[]> {
    return get(`cards/fingerprints/${fingerprint}/transactions`);
  },
});