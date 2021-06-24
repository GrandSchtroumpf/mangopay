import type { Api, MangoPayContext } from "../mangopay";
import { CurrencyISO, CardType, CountryISO } from "../type";

type CardValidity = 'UNKNOWN' | 'VALID' | 'INVALID';
type CardStatus = 'CREATED' | 'VALIDATED' | 'ERROR';

interface CardRegistration {
  UserId: string;
  Currency: CurrencyISO;
  AccessKey: string;
  /** A specific value to pass to the `CardRegistrationURL` */
  PreregistrationData: string;
  /** The URL to submit the card details form to */
  CardRegistrationURL: string;
  /** Having registered a card, this confirmation hash needs to be updated to the card item */
  RegistrationData: string;
  /** The type of card */
  CardType: CardType;
  /** The ID of a card */
  CardId: string;
  ResultCode: string;
  /** A verbal explanation of the `ResultCode` */
  ResultMessage: string;
  /** Status of the card registration */
  Status: CardStatus;
}

interface CreateCardRegistration {
  /** Id of the owner of the card */
  UserId: string;
  Currency?: CurrencyISO;
  /** The type of card. Defaults to "CB_VISA_MASTERCARD". */
  CardType?: CardType;
}

interface Card {
  /** The expiry date of the card - must be in format MMYY */
  ExpirationDate: number;
  /** A partially obfuscated version of the credit card number */
  Alias: string;
  /** The provider of the card */
  CardProvider: string;
  /** The type of card */
  CardType: CardType;
  /** The Country of the Address */
  Country: CountryISO;
  /** The card product type  */
  Product: string;
  BankCode: string;
  /** Whether the card is active or not */
  Active: boolean;
  Currency: CurrencyISO;
  /** Whether the card is valid or not. Once they process (or attempt to process) a payment with the card we are able to indicate if it is "valid" or "invalid". If they didn’t process a payment yet the "Validity" stay at "unknown". */
  Validity: CardValidity;
  /** A unique representation of a 16-digits card number */
  Fingerprint: string;
}

function toRegistration(ctx: MangoPayContext, registration: CreateCardRegistration) {
  return {
    Currency: registration.Currency || ctx.currency,
    ...registration
  }
}

export const cardApi = ({ context, post, put, get }: Api) => ({
  registration: {
    create(card: CreateCardRegistration): Promise<CardRegistration> {
      return post('cardregistrations', toRegistration(context, card));
    },
    update(registrationId: string, registrationData: string): Promise<CardRegistration> {
      return put(`cardregistrations/${registrationId}`, { RegistrationData: registrationData });
    },
    get(registrationId: string): Promise<CardRegistration | undefined> {
      return get(`cardregistrations/${registrationId}`);
    }
  },
  get(cardId: string): Promise<Card | undefined> {
    return get(`cards/${cardId}`);
  },
  listByUser(userId: string): Promise<Card[]> {
    return get(`users/${userId}/cards`);
  },
  listByFingerprint(fingerprint: string): Promise<Card[]> {
    return get(`cards/fingerprints/${fingerprint}`);
  },
  // @todo() move to transactions
  listTransactionByFingerprint(fingerprint: string) {
    return get(`cards/fingerprints/${fingerprint}/transactions`);
  },
  /** ⚠️ Note that once deactivated, a card can't be reactivated afterwards */
  deactivate(cardId: string) {
    return put(`cards/${cardId}`, { Active: false });
  }

});