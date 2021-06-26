import { FormControl, FormGroup, Validators } from "@angular/forms";
import type { CreateIbanAccount } from "@mangopay/sdk";
import { FormAddress } from "../address/address.form";
import { FormCountry } from "../country/country.form";

const controls = (bankAccount: Partial<CreateIbanAccount> = {}) => ({
  IBAN: new FormControl(bankAccount.IBAN, Validators.required),
  BIC: new FormCountry(bankAccount.BIC),
  OwnerName: new FormControl(bankAccount.OwnerName, Validators.required),
  OwnerAddress: new FormAddress(bankAccount.OwnerAddress),
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