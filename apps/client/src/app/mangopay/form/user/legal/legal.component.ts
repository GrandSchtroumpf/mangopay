import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import type { Address, CountryISO, LegalPersonType } from '@mangopay/sdk';
import { TranslocoService, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { FormAddress } from '../../address/address.form';
import { FormLegalUser } from './legal.form';

@Component({
  selector: 'legal-user-form',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [{
    provide: TRANSLOCO_SCOPE,
    useValue: 'mangopay'
  }]
})
export class LegalUserFormComponent {
  private previousAddress: Partial<Address> = {};
  useSameAddress = false;

  @Input() form: FormLegalUser = new FormLegalUser('SOLETRADER');
  @Input() type: LegalPersonType = this.form.value.LegalPersonType;

  constructor(
    private transloco: TranslocoService
  ) {}

  ngOnInit() {
    const lang = this.transloco.getActiveLang();
    const countryIso = lang.toUpperCase() as CountryISO;
    this.form.patchValue({
      LegalRepresentativeNationality: countryIso,
      LegalRepresentativeCountryOfResidence: countryIso,
      LegalRepresentativeAddress: {
        Country: countryIso,
      },
      HeadquartersAddress: {
        Country: countryIso,
      },
    });
    this.toggleSameAddress(true);
  }

  setDefaultEmail() {
    const email = this.form.get('LegalRepresentativeEmail').value;
    if (!this.form.get('Email').value) {
      this.form.get('Email').setValue(email);
    }
  }

  toggleSameAddress(checked: boolean) {
    if (checked) {
      this.previousAddress = this.form.get('HeadquartersAddress').value;
      this.form.setControl('HeadquartersAddress', this.form.get('LegalRepresentativeAddress'));
      this.useSameAddress = true;
    } else {
      this.form.setControl('HeadquartersAddress', new FormAddress(this.previousAddress));
      this.useSameAddress = false;
    }
  }
}
