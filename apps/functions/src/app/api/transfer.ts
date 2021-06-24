import type { Api } from '../mangopay';
import { Money } from '../type';
import type { TransactionNature, TransactionStatus, TransactionType } from './transaction';

interface Transfer {
  Id: string;
  CreationDate: number;
  Tag?: string;
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

type CreateTransfer = Pick<Transfer, 'AuthorId' | 'CreditedUserId' | 'DebitedFunds' | 'Fees' | 'DebitedWalletId' | 'CreditedWalletId' | 'Tag'>;

const baseUrl = 'transfers';
export const transferApi = ({ post, put, get }: Api) => ({
  create(data: CreateTransfer): Promise<Transfer> {
    return post(baseUrl, data);
  },
  get(id: string): Promise<Transfer | undefined> {
    return get(`${baseUrl}/${id}`);
  },
});