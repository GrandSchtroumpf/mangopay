import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CreateNaturalUser } from "@mangopay/sdk";
import type { Address } from '@mangopay/sdk';
import { FormAddress } from "../address/address.form";
import { FormCountry } from "../country/country.form";

const controls = (user: Partial<CreateNaturalUser> = {}) => ({
  FirstName: new FormControl(user.Birthday, Validators.required),
  LastName: new FormControl(user.Birthday, Validators.required),
  Email: new FormControl(user.Email, [Validators.required, Validators.email]),
  Birthday: new FormControl(user.Birthday, Validators.required),
  Nationality: new FormCountry(user.Nationality, Validators.required),
  CountryOfResidence: new FormCountry(user.CountryOfResidence, Validators.required),
  Address: new FormAddress(user.Address as Address),
  Occupation: new FormControl(user.Occupation),
  IncomeRange: new FormControl(user.IncomeRange),
});

type Controls = ReturnType<typeof controls>;

export class FormNaturalUser extends FormGroup {
  constructor(user: Partial<CreateNaturalUser> = {}) {
    super(controls(user));
  }

  get<K extends Extract<keyof Controls, string>>(key: K): Controls[K] {
    return super.get(key) as Controls[K]; 
  }
}