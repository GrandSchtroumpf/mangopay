import type { Api } from "../mangopay";
import type { Money, FundsType, CurrencyISO } from "../type";

/**
 * A Wallet is an object in which PayIns and Transfers from users are stored in order to collect money. You can pay into a Wallet, withdraw funds from a wallet or transfer funds from a Wallet to another Wallet.
 */
interface Wallet {
  Id: string;
  /**  An array of userIDs of who own's the wallet. For now, you only can set up a unique owner*/
  Owners: [string];
  /** The current balance of the wallet */
  Balance: Money;
  /** The type of funds in the wallet */
  FundsType: FundsType;
  /** A description of the wallet */
  Description: string;
  /** The currency - should be ISO_4217 format */
  Currency: CurrencyISO;
  /** Custom data */
  Tag?: string;
}

type CreateWallet = Pick<Wallet, 'Owners' | 'Currency' | 'Description' | 'Tag'>;
type UpateWallet = Pick<Wallet, 'Id' | 'Description'>;

const baseUrl = 'wallets';
export const walletApi = ({ post, put, get }: Api) => ({
  create(data: CreateWallet): Promise<Wallet> {
    return post(baseUrl, data);
  },
  update(data: UpateWallet): Promise<Wallet> {
    return put(`${baseUrl}/${data.Id}`, data);
  },
  get(id: string): Promise<Wallet | undefined> {
    return get(`${baseUrl}/${id}`);
  },
  list(userId: string): Promise<Wallet[]> {
    return get(`${userId}/${baseUrl}`);
  }
});