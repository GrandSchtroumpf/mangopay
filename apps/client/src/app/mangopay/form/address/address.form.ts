import type { Address } from '@mangopay/sdk';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormCountry } from '../country/country.form';

const controls = (address: Partial<Address> = {}, required?: ValidatorFn) => ({
  AddressLine1: new FormControl(address.AddressLine1, required),
  AddressLine2: new FormControl(address.AddressLine2),
  City: new FormControl(address.City, required),
  Region: new FormControl(address.Region),
  PostalCode: new FormControl(address.PostalCode),
  Country: new FormCountry(address.Country, required),
});

type AddressControls = ReturnType<typeof controls>;

export class FormAddress extends FormGroup {
  constructor(address: Partial<Address> = {}, required?: ValidatorFn) {
    super(controls(address, required))
  }
  
  get<K extends Extract<keyof AddressControls, string>>(key: K): AddressControls[K] {
    return super.get(key) as AddressControls[K];
  }
}