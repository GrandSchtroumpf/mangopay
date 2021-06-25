import type { Api, MangoPayContext } from '../mangopay';
import { Money } from '../type';
import { toMoney } from '../utils';

type PaymentStatus = 'CREATED' | 'VALIDATED' | 'ERROR';
type PaymentType = 'BANK_WIRE';

interface Payout {
  Id: string;
  Tag: null | string;
  AuthorId: string;
  BankAccountId: string;
  BankWireRef: null | string;
  CreationDate: number;
  CreditedFunds: Money;
  CreditedUserId: null | string;
  CreditedWalletId: null | string;
  DebitedFunds: Money;
  DebitedWalletId: string;
  ExecutionDate: null | number;
  FallbackReason: null | string;
  Fees: Money;
  ModeApplied: "PENDING_RESPONSE"
  ModeRequested: null
  Nature: "REGULAR"
  PaymentType: PaymentType;
  ResultCode: null | string;
  ResultMessage: null | string;
  Status: PaymentStatus;
  Type: "PAYOUT"
}

interface CreatePayout {
  Tag?: string;
  AuthorId: string;
  /** Information about the funds that are being debited */
  DebitedFunds: Money | number;
  /** Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet) */
  Fees?: Money | number;
  /** The ID of a Bank Account receiving the payout */
  BankAccountId: string;
  /** The ID of the wallet that was debited */
  DebitedWalletId: string;
  /** A custom reference you wish to appear on the user’s bank statement (your Client Name is already shown). We advise you not to add more than 12 characters. */
  BankWireRef?: string;
  /**
   * Payout mode requested. May take one of the following values:
   * STANDARD (value by default if no parameter is sent): a standard bank wire is requested and the processing time of the funds is about 48 hours;
   * INSTANT_PAYMENT: an instant payment bank wire is requested and the processing time is within 25 seconds (subject to prerequisites)
   */
  PayoutModeRequested?: 'STANDARD' | 'INSTANT_PAYMENT';
}


function toPayout(ctx: MangoPayContext, payout: CreatePayout) {
  return {
    ...payout,
    DebitedFunds: toMoney(ctx, payout.DebitedFunds),
    Fees: toMoney(ctx, payout.Fees)
  }
}

const baseUrl = 'payouts';
export const payoutApi = ({ context, post, put, get }: Api) => ({
  create(payout: CreatePayout): Promise<Payout> {
    return post(`${baseUrl}/bankwire`, toPayout(context, payout));
  },
  get(id: string): Promise<Payout | undefined> {
    return get(`${baseUrl}/${id}`);
  },
});