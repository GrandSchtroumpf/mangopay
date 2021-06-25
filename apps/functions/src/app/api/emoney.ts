import { Api } from '../mangopay';
import { CurrencyISO, Money } from '../type';

interface Emoney {
  UserId: string;
  CreditedEMoney: Money;
  DebitedEMoney: Money;
}

interface EmoneyParams {
  Year: number;
  Month?: number;
  Currency?: CurrencyISO;
}

export const emoneyApi = ({ get }: Api) => ({
  get(userId: string, params: EmoneyParams) {
    const { Year, Month, Currency } = params;
    const queryParams = Currency ? { Currency } : {};
    const urlParams = [Year, Month].filter(v => !!v).join('/');
    return get(`users/${userId}/emoney/${urlParams}`, queryParams);
  }
})