import { Api, Address, CurrencyISO, FundsType, Money } from '../type';

export type BusinessType = 'MARKETPLACE' | 'CROWDFUNDING' | 'FRANCHISE' | 'OTHER';
export type Sector = 'RENTALS' | 'STORES_FASHION_ACCESSORIES_OBJECTS' | 'BEAUTY_COSMETICS_HEALTH' | 'FOOD_WINE_RESTAURANTS' | 'HOSPITALITY_TRAVEL_CORIDING' | 'ART_MUSIC_ENTERTAINMENT' | 'FURNITURE_GARDEN' | 'SERVICES_JOBBING_EDUCATION' | 'SPORT_RECREATION_ACTIVITIES' | 'TICKETING' | 'LOAN' | 'EQUITY' | 'PROPERTY_EQUITY' | 'REWARDS_CHARITY' | 'POOL_GROUP_PAYMENT' | 'FRANCHISE' | 'OTHER';

export interface ClientDetails {
  PlatformType: BusinessType;
  ClientId: string;
  Name: string;
  RegisteredName: string;
  TechEmails: string[];
  AdminEmails: string[];
  BillingEmails: string[];
  FraudEmails: string[];
  HeadquartersAddress: Address;
  HeadquartersPhoneNumber:string;
  TaxNumber: string;
  PlatformCategorization: {
    BusinessType: BusinessType;
    Sector: Sector;
  },
  PlatformURL: string;
  PlatformDescription: string;
  CompanyReference: string;
  PrimaryThemeColour: string;
  PrimaryButtonColour: string;
  Logo: string;
  CompanyNumber: string;
  MCC: string;
}

export interface UpdateClient {
  AdminEmails?: string[];
  TechEmails?: string[];
  BillingEmails?: string[];
  FraudEmails?: string[];
  HeadquartersAddress?: Address;
  TaxNumber?: string;
  PlatformDescription?: string;
  PlatformURL?: string;
  PrimaryThemeColour?: string;
  PrimaryButtonColour?: string;
}

export interface ClientWallet {
  Id: string;
  Tag: string;
  Balance: Money;
  Currency: CurrencyISO;
  FundsType: FundsType;
  CreationDate: number;
}

const baseUrl = 'clients';
export const clientApi = ({ get, put, download }: Api) => ({
  update(update: UpdateClient): Promise<ClientDetails> {
    return put(baseUrl, update);
  },
  async uploadLogo(file: string): Promise<ClientDetails> {
    const File = await download(file);
    return put(`${baseUrl}/logo`, { File });
  },
  get(): Promise<ClientDetails> {
    return get(baseUrl);
  },
  wallet: {
    get(fundstype: FundsType, currency: CurrencyISO): Promise<ClientWallet> {
      return get(`${baseUrl}/wallets/${fundstype}/${currency}`);
    },
    list(fundstype?: FundsType): Promise<ClientWallet> {
      const url = [baseUrl, 'wallets', fundstype].filter(v => !!v).join('/');
      return get(url);
    }
  }
})