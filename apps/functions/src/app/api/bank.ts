import type { Api } from "../mangopay";
import type { CountryISO, Address } from "../type";

// @todo(): US account: https://docs.mangopay.com/endpoints/v2.01/bank-accounts#e27_create-a-us-bank-account
// @todo(): CA account: https://docs.mangopay.com/endpoints/v2.01/bank-accounts#e27_create-a-ca-bank-account
// @todo(): GB account: https://docs.mangopay.com/endpoints/v2.01/bank-accounts#e27_create-a-gb-bank-account
// @todo(): OTHER account: https://docs.mangopay.com/endpoints/v2.01/bank-accounts#e27_create-an-other-bank-account

export type BankAccountType = 'IBAN' | 'GB' | 'US' | 'CA' | 'OTHER';

interface BankAccountBase {
  Id: string;
  /** The Type of the bank account */
  Type: BankAccountType;
  /** Address of the owner */
  OwnerAddress: Address;
  /** The name of the owner of the bank account */
  OwnerName: string;
  /** The account number of the bank account. Must be numbers only. Canadian account numbers must be a maximum of 20 digits. */
  AccountNumber: string;
  /** The Country ISO */
  Country: CountryISO;
  /** Custom data */
  Tag: string;
}

interface IbanAccount extends BankAccountBase {
  Type: 'IBAN';
  /** The IBAN of the bank account */
  IBAN: string;
  /** The BIC of the bank account */
  BIC?: string;
}

type CreateIbanAccount = Pick<IbanAccount, 'OwnerName' | 'OwnerAddress' | 'IBAN' | 'BIC' | 'Tag'>;

type BankAccount = IbanAccount;

export function isIban(bankAccount: BankAccount): bankAccount is IbanAccount {
  return bankAccount.Type === 'IBAN';
}

const baseUrl = (userId: string) => `users/${userId}/bankaccounts`;
export const bankAccountApi = ({ post, put, get }: Api) => ({
  createIban(userId: string, bankAccount: CreateIbanAccount): Promise<IbanAccount> {
    return post(`${baseUrl(userId)}/iban`, bankAccount);
  },
  get(userId: string, bankAccountId: string) {
    return get<BankAccount | undefined>(`${baseUrl(userId)}/${bankAccountId}`);
  },
  list(userId: string) {
    return get<BankAccount[]>(baseUrl(userId));
  },
  deactivate(userId: string, bankAccountId: string) {
    return put(`${baseUrl(userId)}/${bankAccountId}`, { Active: false });
  }
});