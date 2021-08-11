import { Api, MangoPayContext, CurrencyISO, CardType, CountryISO, BaseType } from "../type";
import { Converter, fromMangoPay, toMangoPay } from "../utils";

export type CardValidity = 'UNKNOWN' | 'VALID' | 'INVALID';
export type CardStatus = 'CREATED' | 'VALIDATED' | 'ERROR';

// Registration

export interface CardRegistration extends BaseType {
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

export interface CreateCardRegistration {
  /** Id of the owner of the card */
  UserId: string;
  Currency?: CurrencyISO;
  /** The type of card. Defaults to "CB_VISA_MASTERCARD". */
  CardType?: CardType;
}

// Card

export interface Card extends BaseType {
  /** The expiry date of the card - must be in format MMYY */
  ExpirationDate: Date;
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


const registrationConverter: Converter<CardRegistration> = {
  date: ['CreationDate'],
  currency: ['Currency'],
}
const toRegistration = toMangoPay(registrationConverter);

const cardConverter: Converter<Card> = {
  date: ['ExpirationDate', 'CreationDate'],
  boolean: ['Active'],
  currency: ['Currency'],
  country: ['Country'],
}
const fromCard = fromMangoPay(cardConverter);

export const cardApi = ({ context, post, put, get }: Api) => ({
  registration: {
    create(registration: CreateCardRegistration): Promise<CardRegistration> {
      return post('cardregistrations', toRegistration(registration, context));
    },
    update(registrationId: string, registrationData: string): Promise<CardRegistration> {
      return put(`cardregistrations/${registrationId}`, { RegistrationData: registrationData });
    },
    async get(registrationId: string): Promise<CardRegistration> {
      const registration = await get(`cardregistrations/${registrationId}`);
      return toRegistration(registration, context);
    }
  },
  async get(cardId: string): Promise<Card> {
    const card = await get(`cards/${cardId}`);
    return fromCard(card);
  },
  async listByUser(userId: string): Promise<Card[]> {
    const cards = await get<Card[]>(`users/${userId}/cards`);
    return cards.map(fromCard);
  },
  async listByFingerprint(fingerprint: string): Promise<Card[]> {
    const cards = await get<Card[]>(`cards/fingerprints/${fingerprint}`);
    return cards.map(fromCard);
  },
  /** ⚠️ Note that once deactivated, a card can't be reactivated afterwards */
  deactivate(cardId: string) {
    return put(`cards/${cardId}`, { Active: false });
  }

});