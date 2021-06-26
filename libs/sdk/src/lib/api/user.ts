import type { Api, CountryISO, WithId, Address, Money, CurrencyISO, Timestamp } from '../type';
import { Converter, fromMangoPay, toMangoPay } from '../utils';


export interface User {
  Id: string;
  /** Type of user */
  PersonType: 'NATURAL' | 'LEGAL';
  /** The person's email address (not more than 12 consecutive numbers) - must be a valid email */
  Email: string;
  /** @see https://docs.mangopay.com/guide/user-verification */
  KYCLevel: 'LIGHT' | 'REGULAR';
  /** Custom data that you can add to this item */
  Tag: null | string;
  /** When the item was created */
  CreationDate?: number;
}

export interface NaturalUser {
  Tag?: string;
  PersonType: "NATURAL";
  /** The name of the user  */
  FirstName: string;
  /**  last name of the user */
  LastName: string;
  /** The user address */
  Address?: string | Address;
  /** The date of birth of the user - be careful to set the right timezone (should be UTC) to avoid 00h becoming 23h (and hence interpreted as the day before) */
  Birthday: Date;
  /** The user’s nationality. ISO 3166-1 alpha-2 format is expected */
  Nationality: CountryISO;
  /** The user’s country of residence. ISO 3166-1 alpha-2 format is expected */
  CountryOfResidence: CountryISO;
  /**  User’s occupation, ie. Work */
  Occupation?: string;
  /** 
   * Could be only one of these values:
   * 1 - for incomes <18K€)
   * 2 - for incomes between 18 and 30K€
   * 3 - for incomes between 30 and 50K€
   * 4 - for incomes between 50 and 80K€
   * 5 - for incomes between 80 and 120K€
   * 6 - for incomes >120K€
   */
  IncomeRange?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Maximum length is 255 characters */
  ProofOfIdentity: string | null;
  /** Maximum length is 255 characters */
  ProofOfAddress: string | null;
  Email: string;
}

export interface LegalUser {
  Tag?: string;
  HeadquartersAddress: Address;
  LegalPersonType: 'BUSINESS' | 'ORGANIZATION' | 'SOLETRADER';
  Name: string;
  LegalRepresentativeAddress: Address;
  LegalRepresentativeBirthday: Date;
  LegalRepresentativeCountryOfResidence: CountryISO;
  LegalRepresentativeNationality: CountryISO;
  LegalRepresentativeEmail: string;
  LegalRepresentativeFirstName: string;
  LegalRepresentativeLastName: string;
  CompanyNumber?: string;
  Email: string;
  /** The business statute of the company */
  Statute: string;
  /** The shareholder declaration of the company */
  ShareholderDeclaration: string;
  /** A MANGOPAY reference to the validated document of the proof of registration of the company */
  ProofOfRegistration: string;
}

export interface Emoney {
  UserId: string;
  CreditedEMoney: Money;
  DebitedEMoney: Money;
}

export interface EmoneyParams {
  Year: number;
  Month?: number;
  Currency?: CurrencyISO;
}


type CreateNaturalUser = Omit<NaturalUser, 'PersonType' | 'ProofOfIdentity' | 'ProofOfAddress'>;
type UpdateNaturalUser = WithId<Partial<CreateNaturalUser & User>>;
type CreateLegalUser = Omit<LegalUser, 'PersonType' | 'ProofOfRegistration' | 'Statute' | 'ShareholderDeclaration'>;
type UpdateLegalUser = WithId<Partial<LegalUser & User>>;

///////////////
// CONVERTER //
///////////////

const convertNaturalUser: Converter<CreateNaturalUser | UpdateNaturalUser> = {
  date: ['Birthday'],
}
const convertLegalUser: Converter<CreateLegalUser | UpdateLegalUser> = {
  date: ['LegalRepresentativeBirthday'],
}

function isNatural(user: User): user is NaturalUser & User {
  return user.PersonType === 'NATURAL';
}
function isLegal(user: User): user is LegalUser & User {
  return user.PersonType === 'LEGAL';
}
const fromUser = (user: User & (NaturalUser | LegalUser)) => isLegal(user)
? fromMangoPay(user, convertLegalUser)
: fromMangoPay(user, convertNaturalUser);


/////////
// API //
/////////

const baseUrl = 'users';
export const userApi = ({ post, put, get }: Api) => ({
  natural: {
    create(user: CreateNaturalUser): Promise<NaturalUser & User> {
      return post(`${baseUrl}/natural`, toMangoPay(user, convertNaturalUser));
    },
    update(user: UpdateNaturalUser): Promise<NaturalUser> {
      return put(`${baseUrl}/natural/${user.Id}`, toMangoPay(user, convertNaturalUser));
    },
  },
  legal: {
    create(user: CreateLegalUser): Promise<CreateLegalUser & User> {
      return post(`${baseUrl}/legal`, toMangoPay(user, convertLegalUser));
    },
    update(user: UpdateLegalUser): Promise<CreateLegalUser & User> {
      return put(`${baseUrl}/legal/${user.Id}`, toMangoPay(user, convertLegalUser));
    },
  },
  async get(userId: string) {
    const user = await get<User & (NaturalUser | LegalUser)>(`${baseUrl}/${userId}`);
    return fromUser(user);
  },
  async list() {
    const users = await get<(User & (LegalUser | NaturalUser))[]>(baseUrl);
    return users.map(fromUser);
  },
  /** @see: https://docs.mangopay.com/endpoints/v2.01/user-emoney */
  emoney(userId: string, params: EmoneyParams): Promise<Emoney> {
    const { Year, Month, Currency } = params;
    const queryParams = Currency ? { Currency } : {};
    const urlParams = [Year, Month].filter(v => !!v).join('/');
    return get(`${baseUrl}/${userId}/emoney/${urlParams}`, queryParams);
  }
})


