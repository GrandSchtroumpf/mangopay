import type { Api, CountryISO, WithId, Address, Money, CurrencyISO, BaseType } from '../type';
import { Converter, fromMangoPay, PaginationParams, toMangoPay, toPagination } from '../utils';

export type PersonType = 'NATURAL' | 'LEGAL';
export type LegalPersonType = 'BUSINESS' | 'ORGANIZATION' | 'SOLETRADER';
export type KYCLevel = 'LIGHT' | 'REGULAR';
export type User = NaturalUser | LegalUser;

export interface UserBase extends BaseType {
  PersonType: PersonType;
  Email: string;
  KYCLevel: KYCLevel;
}

export interface NaturalUser extends BaseType {
  PersonType: "NATURAL";
  /** @see https://docs.mangopay.com/guide/user-verification */
  KYCLevel: KYCLevel;
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
   * 1 - for incomes <18K€
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

export interface LegalUser extends BaseType {
  PersonType: 'LEGAL',
  /** @see https://docs.mangopay.com/guide/user-verification */
  KYCLevel: 'LIGHT' | 'REGULAR';
  HeadquartersAddress: Address;
  LegalPersonType: LegalPersonType;
  Name: string;
  LegalRepresentativeAddress?: Address;
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


export type CreateNaturalUser = Omit<NaturalUser, 'PersonType' | 'ProofOfIdentity' | 'ProofOfAddress'>;
export type UpdateNaturalUser = WithId<Partial<CreateNaturalUser & User>>;
export type UpdateLegalUser = WithId<Partial<LegalUser & User>>;


export interface CreateLegalUser {
  // Company Information
  HeadquartersAddress: Address;
  LegalPersonType: LegalPersonType,
  Name: string;
  Email: string;
  CompanyNumber: string;
  // Representative Information
  LegalRepresentativeAddress: Address;
  LegalRepresentativeBirthday: Date;
  LegalRepresentativeCountryOfResidence: CountryISO;
  LegalRepresentativeNationality: CountryISO;
  LegalRepresentativeEmail: string;
  LegalRepresentativeFirstName: string;
  LegalRepresentativeLastName: string;
  Tag?: string;
}

///////////////
// CONVERTER //
///////////////
const convertLegal: Converter<LegalUser> = {
  date: ['LegalRepresentativeBirthday', 'CreationDate'],
  country: ['LegalRepresentativeCountryOfResidence', 'LegalRepresentativeNationality']
}
const convertNatural: Converter<NaturalUser> = {
  date: ['Birthday', 'CreationDate'],
  country: ['CountryOfResidence']
}

const fromLegal = fromMangoPay(convertLegal);
const toLegal = toMangoPay(convertLegal);
const fromNatural = fromMangoPay(convertNatural);
const toNatural = toMangoPay(convertNatural);

const fromUser = (user: User | UserBase) => user.PersonType === 'LEGAL'
    ? fromLegal(user)
    : fromNatural(user);

/////////
// API //
/////////

const baseUrl = 'users';
export const userApi = ({ post, put, get }: Api) => ({
  natural: {
    create(user: CreateNaturalUser): Promise<NaturalUser> {
      return post(`${baseUrl}/natural`, toLegal(user));
    },
    update(user: UpdateNaturalUser): Promise<NaturalUser> {
      return put(`${baseUrl}/natural/${user.Id}`, toNatural(user));
    },
  },
  legal: {
    create(user: CreateLegalUser): Promise<LegalUser> {
      return post(`${baseUrl}/legal`, toLegal(user));
    },
    update(user: UpdateLegalUser): Promise<LegalUser> {
      return put(`${baseUrl}/legal/${user.Id}`, toNatural(user));
    },
  },
  async get(userId: string) {
    const user = await get<User>(`${baseUrl}/${userId}`);
    return fromUser(user);
  },
  async list(queryParams: PaginationParams = {}) {
    const users = await get<UserBase[]>(baseUrl, toPagination(queryParams));
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


