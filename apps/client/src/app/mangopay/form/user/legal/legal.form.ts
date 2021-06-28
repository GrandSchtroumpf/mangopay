import { FormControl, Validators } from "@angular/forms";
import type { CreateLegalUser, LegalPersonType } from "@mangopay/sdk";
import { FormAddress } from "../../address/address.form";
import { FormCountry } from "../../country/country.form";
import { TypedFormGroup } from "../../utils";

const controls = (type: LegalPersonType, user: Partial<CreateLegalUser> = {}) => ({
  LegalPersonType: new FormControl(type, Validators.required),
  Name: new FormControl(user.Name, Validators.required),
  Email: new FormControl(user.Email, [Validators.required, Validators.email]),
  CompanyNumber: new FormControl(user.CompanyNumber, type === 'BUSINESS' ? [Validators.required] : []),
  
  HeadquartersAddress: new FormAddress(user.HeadquartersAddress, Validators.required),
  LegalRepresentativeFirstName: new FormControl(user.LegalRepresentativeFirstName, Validators.required),
  LegalRepresentativeLastName: new FormControl(user.LegalRepresentativeLastName, Validators.required),
  LegalRepresentativeBirthday: new FormControl(user.LegalRepresentativeBirthday, Validators.required),
  LegalRepresentativeNationality: new FormCountry(user.LegalRepresentativeNationality, Validators.required),
  LegalRepresentativeCountryOfResidence: new FormCountry(user.LegalRepresentativeCountryOfResidence, Validators.required),
  LegalRepresentativeEmail: new FormControl(user.LegalRepresentativeEmail, [Validators.required, Validators.email]),
  LegalRepresentativeAddress: new FormAddress(user.LegalRepresentativeAddress, Validators.required),
  Tag: new FormControl(user.Tag),
});

type Controls = ReturnType<typeof controls>;

export class FormLegalUser extends TypedFormGroup<CreateLegalUser, Controls> {
  constructor(type: LegalPersonType, user: Partial<CreateLegalUser> = {}) {
    super(controls(type, user));
  }

  get<K extends Extract<keyof Controls, string>>(key: K): Controls[K] {
    return super.get(key) as Controls[K]; 
  }
}