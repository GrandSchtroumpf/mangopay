import { FormControl, FormGroup, Validators } from "@angular/forms";
import type { CreateIbanAccount } from "@mangopay/sdk";
import { FormAddress } from "../address/address.form";
import { FormCountry } from "../country/country.form";

export const ibanPattern = '^[a-zA-Z]{2}\\d{2}\\s*(\\w{4}\\s*){2,7}\\w{1,4}\\s*$';
export const bicPattern = '^[a-zA-Z]{2}\\d{2}\\s*(\\w{4}\\s*){2,7}\\w{1,4}\\s*$';

const controls = (bankAccount: Partial<CreateIbanAccount> = {}) => ({
  IBAN: new FormControl(bankAccount.IBAN, [Validators.required, Validators.pattern(ibanPattern)]),
  BIC: new FormCountry(bankAccount.BIC, Validators.pattern(bicPattern)),
  OwnerName: new FormControl(bankAccount.OwnerName, Validators.required),
  OwnerAddress: new FormAddress(bankAccount.OwnerAddress, Validators.required),
  Tag: new FormCountry(bankAccount.Tag),
});

type Controls = ReturnType<typeof controls>;

export class FormBankIban extends FormGroup {
  constructor(bankAccount: Partial<CreateIbanAccount> = {}) {
    super(controls(bankAccount));
  }

  get<K extends Extract<keyof Controls, string>>(key: K): Controls[K] {
    return super.get(key) as Controls[K]; 
  }
}