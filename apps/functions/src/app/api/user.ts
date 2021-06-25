import type { Api } from '../mangopay';
import type { CountryISO, WithId, Address } from '../type';


interface User {
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
  Birthday: number;
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
  LegalRepresentativeBirthday: number;
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


type CreateNaturalUser = Omit<NaturalUser, 'PersonType' | 'ProofOfIdentity' | 'ProofOfAddress'>;
type UpdateNaturalUser = WithId<Partial<CreateNaturalUser & User>>;
type CreateLegalUser = Omit<LegalUser, 'PersonType' | 'ProofOfRegistration' | 'Statute' | 'ShareholderDeclaration'>;
type UpdateLegalUser = WithId<Partial<LegalUser & User>>;

export const userApi = ({ post, put, get }: Api) => ({
  natural: {
    create(user: CreateNaturalUser): Promise<NaturalUser & User> {
      return post('users/natural', user);
    },
    update(user: UpdateNaturalUser): Promise<NaturalUser> {
      return put(`users/natural/${user.Id}`, user);
    },
  },
  legal: {
    create(user: CreateLegalUser): Promise<CreateLegalUser & User> {
      return post('users/legal', user);
    },
    update(user: UpdateLegalUser): Promise<CreateLegalUser & User> {
      return put(`users/legal/${user.Id}`, user);
    },
  },
  get(userId: string) {
    return get<((LegalUser | NaturalUser) & User) | undefined>(`users/${userId}`);
  },
  list() {
    return get<((LegalUser | NaturalUser) & User)[]>('users');
  }
})


