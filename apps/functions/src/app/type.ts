export type WithId<T> = { Id: string } & Partial<T>;
export type ClientFundsType = "FEES" | "CREDIT";
export type FundsType = "DEFAULT" | ClientFundsType;
export interface Money {
  /** The currency - should be ISO_4217 format */
  Currency: CurrencyISO;
  /** An amount of money in the smallest sub-division of the currency, e.g. 12.60 EUR would be represented as 1260 whereas 12 JPY would be represented as just 12) */
  Amount: number;
}
export type CardType = 'CB_VISA_MASTERCARD' | 'DINERS' | 'MASTERPASS' | 'AMEX'  | 'MAESTRO' | 'P24' | 'IDEAL' | 'BCMC' | 'PAYLIB';

export interface HooksParams {
  EventType: EventType;
  RessourceId: string;
  Timestamp: number;
}

export interface Address {
  AddressLine1: string;
  AddressLine2?: string;
  City: string;
  Region: string;
  PostalCode: string;
  Country: CountryISO
}

export interface BrowserInfo {
  AcceptHeader: string,
  JavaEnabled: boolean,
  Language: string,
  ColorDepth: number,
  ScreenHeight: number,
  ScreenWidth: number,
  TimeZoneOffset: string,
  UserAgent: string,
  JavascriptEnabled: boolean
}

export type Language = 'DE' | 'EN' | 'DA' | 'ES' | 'ET' | 'FI' | 'FR' | 'EL' | 'HU' | 'IT' | 'NL' | 'NO' | 'PL' | 'PT' | 'SK' | 'SV' | 'CS';

export type EventType = 'PAYIN_NORMAL_CREATED' | 'PAYIN_NORMAL_SUCCEEDED' | 'PAYIN_NORMAL_FAILED' | 'PAYOUT_NORMAL_CREATED' | 'PAYOUT_NORMAL_SUCCEEDED' | 'PAYOUT_NORMAL_FAILED' | 'TRANSFER_NORMAL_CREATED' | 'TRANSFER_NORMAL_SUCCEEDED' | 'TRANSFER_NORMAL_FAILED' | 'PAYIN_REFUND_CREATED' | 'PAYIN_REFUND_SUCCEEDED' | 'PAYIN_REFUND_FAILED' | 'PAYOUT_REFUND_CREATED' | 'PAYOUT_REFUND_SUCCEEDED' | 'PAYOUT_REFUND_FAILED' | 'TRANSFER_REFUND_CREATED' | 'TRANSFER_REFUND_SUCCEEDED' | 'TRANSFER_REFUND_FAILED' | 'KYC_CREATED' | 'KYC_VALIDATION_ASKED' | 'KYC_SUCCEEDED' | 'KYC_FAILED' | 'KYC_OUTDATED' | 'PAYIN_REPUDIATION_CREATED' | 'PAYIN_REPUDIATION_SUCCEEDED' | 'PAYIN_REPUDIATION_FAILED' | 'DISPUTE_DOCUMENT_CREATED' | 'DISPUTE_DOCUMENT_VALIDATION_ASKED' | 'DISPUTE_DOCUMENT_SUCCEEDED' | 'DISPUTE_DOCUMENT_FAILED' | 'DISPUTE_CREATED' | 'DISPUTE_SUBMITTED' | 'DISPUTE_ACTION_REQUIRED' | 'DISPUTE_FURTHER_ACTION_REQUIRED' | 'DISPUTE_CLOSED' | 'DISPUTE_SENT_TO_BANK' | 'TRANSFER_SETTLEMENT_CREATED' | 'TRANSFER_SETTLEMENT_SUCCEEDED' | 'TRANSFER_SETTLEMENT_FAILED' | 'MANDATE_CREATED' | 'MANDATE_FAILED' | 'MANDATE_ACTIVATED' | 'MANDATE_SUBMITTED,MANDATE_EXPIRED' | 'PREAUTHORIZATION_CREATED' | 'PREAUTHORIZATION_FAILED' | 'PREAUTHORIZATION_SUCCEEDED' | 'PREAUTHORIZATION_PAYMENT_WAITING' | 'PREAUTHORIZATION_PAYMENT_EXPIRED' | 'PREAUTHORIZATION_PAYMENT_CANCELED' | 'PREAUTHORIZATION_PAYMENT_VALIDATED' | 'UBO_DECLARATION_CREATED' | 'UBO_DECLARATION_VALIDATION_ASKED' | 'UBO_DECLARATION_REFUSED' | 'UBO_DECLARATION_VALIDATED' | 'UBO_DECLARATION_INCOMPLETE' | 'USER_KYC_REGULAR' | 'USER_KYC_LIGHT' | 'USER_INFLOWS_BLOCKED' | 'USER_INFLOWS_UNBLOCKED' | 'USER_OUTFLOWS_BLOCKED' | 'USER_OUTFLOWS_UNBLOCKED';

export type CountryISO =
  | "AD"
  | "AE"
  | "AF"
  | "AG"
  | "AI"
  | "AL"
  | "AM"
  | "AO"
  | "AQ"
  | "AR"
  | "AS"
  | "AT"
  | "AU"
  | "AW"
  | "AX"
  | "AZ"
  | "BA"
  | "BB"
  | "BD"
  | "BE"
  | "BF"
  | "BG"
  | "BH"
  | "BI"
  | "BJ"
  | "BL"
  | "BM"
  | "BN"
  | "BO"
  | "BQ"
  | "BR"
  | "BS"
  | "BT"
  | "BV"
  | "BW"
  | "BY"
  | "BZ"
  | "CA"
  | "CC"
  | "CD"
  | "CF"
  | "CG"
  | "CH"
  | "CI"
  | "CK"
  | "CL"
  | "CM"
  | "CN"
  | "CO"
  | "CR"
  | "CU"
  | "CV"
  | "CW"
  | "CX"
  | "CY"
  | "CZ"
  | "DE"
  | "DJ"
  | "DK"
  | "DM"
  | "DO"
  | "DZ"
  | "EC"
  | "EE"
  | "EG"
  | "EH"
  | "ER"
  | "ES"
  | "ET"
  | "FI"
  | "FJ"
  | "FK"
  | "FM"
  | "FO"
  | "FR"
  | "GA"
  | "GB"
  | "GD"
  | "GE"
  | "GF"
  | "GG"
  | "GH"
  | "GI"
  | "GL"
  | "GM"
  | "GN"
  | "GP"
  | "GQ"
  | "GR"
  | "GS"
  | "GT"
  | "GU"
  | "GW"
  | "GY"
  | "HK"
  | "HM"
  | "HN"
  | "HR"
  | "HT"
  | "HU"
  | "ID"
  | "IE"
  | "IL"
  | "IM"
  | "IN"
  | "IO"
  | "IQ"
  | "IR"
  | "IS"
  | "IT"
  | "JE"
  | "JM"
  | "JO"
  | "JP"
  | "KE"
  | "KG"
  | "KH"
  | "KI"
  | "KM"
  | "KN"
  | "KP"
  | "KR"
  | "KW"
  | "KY"
  | "KZ"
  | "LA"
  | "LB"
  | "LC"
  | "LI"
  | "LK"
  | "LR"
  | "LS"
  | "LT"
  | "LU"
  | "LV"
  | "LY"
  | "MA"
  | "MC"
  | "MD"
  | "ME"
  | "MF"
  | "MG"
  | "MH"
  | "MK"
  | "ML"
  | "MM"
  | "MN"
  | "MO"
  | "MP"
  | "MQ"
  | "MR"
  | "MS"
  | "MT"
  | "MU"
  | "MV"
  | "MW"
  | "MX"
  | "MY"
  | "MZ"
  | "NA"
  | "NC"
  | "NE"
  | "NF"
  | "NG"
  | "NI"
  | "NL"
  | "NO"
  | "NP"
  | "NR"
  | "NU"
  | "NZ"
  | "OM"
  | "PA"
  | "PE"
  | "PF"
  | "PG"
  | "PH"
  | "PK"
  | "PL"
  | "PM"
  | "PN"
  | "PR"
  | "PS"
  | "PT"
  | "PW"
  | "PY"
  | "QA"
  | "RE"
  | "RO"
  | "RS"
  | "RU"
  | "RW"
  | "SA"
  | "SB"
  | "SC"
  | "SD"
  | "SE"
  | "SG"
  | "SH"
  | "SI"
  | "SJ"
  | "SK"
  | "SL"
  | "SM"
  | "SN"
  | "SO"
  | "SR"
  | "SS"
  | "ST"
  | "SV"
  | "SX"
  | "SY"
  | "SZ"
  | "TC"
  | "TD"
  | "TF"
  | "TG"
  | "TH"
  | "TJ"
  | "TK"
  | "TL"
  | "TM"
  | "TN"
  | "TO"
  | "TR"
  | "TT"
  | "TV"
  | "TW"
  | "TZ"
  | "UA"
  | "UG"
  | "UM"
  | "US"
  | "UY"
  | "UZ"
  | "VA"
  | "VC"
  | "VE"
  | "VG"
  | "VI"
  | "VN"
  | "VU"
  | "WF"
  | "WS"
  | "YE"
  | "YT"
  | "ZA"
  | "ZM"
  | "ZW";

export type CurrencyISO =
  | "AED"
  | "AFN"
  | "ALL"
  | "AMD"
  | "ANG"
  | "AOA"
  | "ARS"
  | "AUD"
  | "AWG"
  | "AZN"
  | "BAM"
  | "BBD"
  | "BDT"
  | "BGN"
  | "BHD"
  | "BIF"
  | "BMD"
  | "BND"
  | "BOB"
  | "BRL"
  | "BSD"
  | "BTN"
  | "BWP"
  | "BYN"
  | "BZD"
  | "CAD"
  | "CDF"
  | "CHF"
  | "CLP"
  | "CNY"
  | "COP"
  | "CRC"
  | "CUC"
  | "CUP"
  | "CVE"
  | "CZK"
  | "DJF"
  | "DKK"
  | "DOP"
  | "DZD"
  | "EGP"
  | "ERN"
  | "ETB"
  | "EUR"
  | "FJD"
  | "FKP"
  | "GBP"
  | "GEL"
  | "GGP"
  | "GHS"
  | "GIP"
  | "GMD"
  | "GNF"
  | "GTQ"
  | "GYD"
  | "HKD"
  | "HNL"
  | "HRK"
  | "HTG"
  | "HUF"
  | "IDR"
  | "ILS"
  | "IMP"
  | "INR"
  | "IQD"
  | "IRR"
  | "ISK"
  | "JEP"
  | "JMD"
  | "JOD"
  | "JPY"
  | "KES"
  | "KGS"
  | "KHR"
  | "KMF"
  | "KPW"
  | "KRW"
  | "KWD"
  | "KYD"
  | "KZT"
  | "LAK"
  | "LBP"
  | "LKR"
  | "LRD"
  | "LSL"
  | "LYD"
  | "MAD"
  | "MDL"
  | "MGA"
  | "MKD"
  | "MMK"
  | "MNT"
  | "MOP"
  | "MRU"
  | "MUR"
  | "MVR"
  | "MWK"
  | "MXN"
  | "MYR"
  | "MZN"
  | "NAD"
  | "NGN"
  | "NIO"
  | "NOK"
  | "NPR"
  | "NZD"
  | "OMR"
  | "PAB"
  | "PEN"
  | "PGK"
  | "PHP"
  | "PKR"
  | "PLN"
  | "PYG"
  | "QAR"
  | "RON"
  | "RSD"
  | "RUB"
  | "RWF"
  | "SAR"
  | "SBD"
  | "SCR"
  | "SDG"
  | "SEK"
  | "SGD"
  | "SHP"
  | "SLL"
  | "SOS"
  | "SPL"
  | "SRD"
  | "STN"
  | "SVC"
  | "SYP"
  | "SZL"
  | "THB"
  | "TJS"
  | "TMT"
  | "TND"
  | "TOP"
  | "TRY"
  | "TTD"
  | "TVD"
  | "TWD"
  | "TZS"
  | "UAH"
  | "UGX"
  | "USD"
  | "UYU"
  | "UZS"
  | "VEF"
  | "VND"
  | "VUV"
  | "WST"
  | "XAF"
  | "XCD"
  | "XDR"
  | "XOF"
  | "XPF"
  | "YER"
  | "ZAR"
  | "ZMW"
  | "ZWD";