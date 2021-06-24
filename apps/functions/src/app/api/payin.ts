import type { Api } from "../mangopay";
import { Address, CountryISO, Language, Money, CardType, BrowserInfo } from "../type";

interface AddressDestination {
  FirstName: string;
  LastName: string;
  Address: Address;
}

type SecureMode = 'DEFAULT' | 'FORCE' | 'NO_CHOICE';
type PaymentType = 'CARD' | 'DIRECT_DEBIT' | 'PREAUTHORIZED' | 'BANK_WIRE';

interface Payin {
  PaymentType: PaymentType;
  ExecutionType: 'WEB' | 'DIRECT' | 'EXTERNAL_INSTRUCTION';
}

interface WebPayin {
  /** Custom data that you can add to this item */
  Tag?: string;
  /** A user's ID */
  AuthorId: string;
  /** The user ID who is credited (defaults to the owner of the wallet) */
  CreditedUserId?: string;
  /** Information about the funds that are being debited */
  DebitedFunds: Money;
  /** Information about the fees that were taken by the client for this transaction (and were hence transferred to the Client's platform wallet) */
  Fees: Money;
  /** The URL to redirect to after payment (whether successful or not) */
  ReturnURL: string;
  /** The type of card is required for web payins */
  CardType: CardType;
  /** The ID of the wallet where money will be credited */
  CreditedWalletId: string;
  /** The SecureMode is used to select a 3DS1 and 3DS2 protocol for CB Visa and MasterCard. The field lets you ask for an Frictionless payment with the value "DEFAULT". The value "NO_CHOICE" will allow you to make the transaction eligible for Frictionless, but the exemption will be applied by the other payment actors. The value force "FORCE"will force customer authentification. */
  SecureMode?: SecureMode;
  /** The language to use for the payment page - needs to be the ISO code of the language */
  Culture: Language;
  /** A URL to an SSL page to allow you to customise the payment page. Must be in the format: array("PAYLINE"=>"https://...") and meet all the specifications listed here. Note that only a template for Payline is currently available */
  TemplateURLOptions?: {
    /** The corresponding template URL V2 with the Payline Javascript Widget */
    PaylineV2: string
  };
  /** A custom description to appear on the user's bank statement. It can be up to 10 characters long; and can only include alphanumeric characters or spaces. See here for important info. Note that each bank handles this information differently, some show less or no information. */
  StatementDescriptor?: string;
  /** Contains every useful informations related to the user billing */
  Billing?: AddressDestination;
  /** Contains every useful information's related to the user shipping */
  Shipping?: AddressDestination;
}

interface PayinCardDetails {
  Id: string;
  PaymentType: 'CARD';
  /** When the transaction happened */
  ExecutionDate: number;
  /** The expiry date of the card - must be in format MMYY */
  ExpirationDate: string;
  /** A partially obfuscated version of the credit card number */
  Alias: string;
  CardType: CardType;
  Country: CountryISO;
  /** A unique representation of a 16-digits card number */
  Fingerprint: string;
}

interface DirectPayin {
  AuthorId: string;
  CreditedUserId?: string;
  CreditedWalletId: string;
  DebitedFunds: Money;
  Fees: Money;
  SecureModeReturnURL: string;
  CardId: string;
  Culture?: Language;
  SecureMode?: SecureMode;
  StatementDescriptor?: string;
  Billing?: AddressDestination;
  Shipping?: AddressDestination
  IpAddress?: string;
  BrowserInfo?: BrowserInfo;
  Tag?: string;
}

const baseUrl = 'payins/card';
export const payinApi = ({ post, put, get }: Api) => ({
  web: {
    create(data: WebPayin): Promise<Payin & WebPayin> {
      return post(`${baseUrl}/web`, data);
    },
    get(id: string): Promise<PayinCardDetails> {
      return get(`${baseUrl}/web/${id}/extended`);
    },
  },
  direct: {
    create(data: DirectPayin): Promise<Payin & DirectPayin> {
      return post(`${baseUrl}/direct`, data);
    },
  },
  get(id: string): Promise<Payin & (WebPayin | DirectPayin)> {
    return get(`payins/${id}`);
  }
})