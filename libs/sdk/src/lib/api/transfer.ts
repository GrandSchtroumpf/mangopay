import { Api, MangoPayContext, Money } from '../type';
import { toMoney } from '../utils';
import type { TransactionNature, TransactionStatus, TransactionType } from './transaction';

export interface Transfer {
  Id: string;
  CreationDate: number;
  Tag: null | string;
  DebitedFunds: Money;
  CreditedFunds?: Money;
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


export interface CreateTransfer {
  AuthorId: string;
  CreditedUserId: string;
  DebitedWalletId: string;
  CreditedWalletId: string;
  DebitedFunds: Money | number;
  Fees?: Money | number;
  Tag?: string;
}

function toTransfer(ctx: MangoPayContext, transfer: CreateTransfer) {
  return {
    ...transfer,
    DebitedFunds: toMoney(ctx, transfer.DebitedFunds),
    Fees: toMoney(ctx, transfer.Fees)
  }
}

const baseUrl = 'transfers';
export const transferApi = ({ context, post, put, get }: Api) => ({
  create(transfer: CreateTransfer): Promise<Transfer> {
    return post(baseUrl, toTransfer(context, transfer));
  },
  get(id: string): Promise<Transfer | undefined> {
    return get(`${baseUrl}/${id}`);
  },
});