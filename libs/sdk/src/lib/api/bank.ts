import type { Api, CountryISO, Address, BaseType } from '../type';
import { Converter, fromMangoPay, toMangoPay } from '../utils';

// @todo(): US account: https://docs.mangopay.com/endpoints/v2.01/bank-accounts#e27_create-a-us-bank-account
// @todo(): CA account: https://docs.mangopay.com/endpoints/v2.01/bank-accounts#e27_create-a-ca-bank-account
// @todo(): GB account: https://docs.mangopay.com/endpoints/v2.01/bank-accounts#e27_create-a-gb-bank-account
// @todo(): OTHER account: https://docs.mangopay.com/endpoints/v2.01/bank-accounts#e27_create-an-other-bank-account

export type BankAccountType = 'IBAN' | 'GB' | 'US' | 'CA' | 'OTHER';

export interface BankAccountBase extends BaseType {
  Type: BankAccountType;
  /** Address of the owner */
  OwnerAddress: Address;
  /** The name of the owner of the bank account */
  OwnerName: string;
  /** The object owner's UserId */
  UserId: string;
  /** The Country ISO */
  Active: boolean;
}

// IBAN

export interface IbanAccount extends BankAccountBase {
  Type: 'IBAN';
  IBAN: string;
  BIC: null | string;
}

export interface CreateIbanAccount {
  OwnerName: string;
  OwnerAddress: Address;
  IBAN: string;
  BIC?: string;
  Tag?: string;
}

export type BankAccount = IbanAccount;


const converter: Converter<BankAccount> = {
  date: ['CreationDate'],
  boolean: ['Active']
}
const fromBankAccount = fromMangoPay(converter);
const toBankAccount = toMangoPay(converter);

export function isIban(bankAccount: BankAccount): bankAccount is IbanAccount {
  return bankAccount.Type === 'IBAN';
}

const baseUrl = (userId: string) => `users/${userId}/bankaccounts`;
export const bankAccountApi = ({ post, put, get }: Api) => ({
  createIban(userId: string, bankAccount: CreateIbanAccount): Promise<IbanAccount> {
    return post(`${baseUrl(userId)}/iban`, toBankAccount(bankAccount));
  },
  async get(userId: string, bankAccountId: string) {
    const res = await get<BankAccount | undefined>(`${baseUrl(userId)}/${bankAccountId}`);
    return fromBankAccount(res);
  },
  async list(userId: string) {
    const res = await get<BankAccount[]>(baseUrl(userId));
    return res.map(fromBankAccount);
  },
  deactivate(userId: string, bankAccountId: string) {
    return put(`${baseUrl(userId)}/${bankAccountId}`, { Active: false });
  }
});