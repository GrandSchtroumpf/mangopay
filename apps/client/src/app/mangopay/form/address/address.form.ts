import type { Address } from '@mangopay/sdk';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormCountry } from '../country/country.form';

const controls = (address: Partial<Address> = {}) => ({
  AddressLine1: new FormControl(address.AddressLine1, Validators.required),
  AddressLine2: new FormControl(address.AddressLine2),
  City: new FormControl(address.City, Validators.required),
  Region: new FormControl(address.Region, Validators.required),
  PostalCode: new FormControl(address.PostalCode, Validators.required),
  Country: new FormCountry(address.Country),
});

type AddressControls = ReturnType<typeof controls>;

export class FormAddress extends FormGroup {
  constructor(address: Partial<Address> = {}) {
    super({
      AddressLine1: new FormControl(address.AddressLine1, Validators.required),
      AddressLine2: new FormControl(address.AddressLine2),
      City: new FormControl(address.City, Validators.required),
      Region: new FormControl(address.Region, Validators.required),
      PostalCode: new FormControl(address.PostalCode, Validators.required),
      Country: new FormCountry(address.Country),
    })
  }
  
  get<K extends Extract<keyof AddressControls, string>>(key: K): AddressControls[K] {
    return super.get(key) as AddressControls[K];
  }
}