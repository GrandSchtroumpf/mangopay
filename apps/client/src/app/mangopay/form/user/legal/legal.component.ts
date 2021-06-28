import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import type { CountryISO, CreateLegalUser, LegalPersonType } from '@mangopay/sdk';
import { TranslocoService, TRANSLOCO_SCOPE } from '@ngneat/transloco';
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
  @Input() form: FormLegalUser = new FormLegalUser('SOLETRADER');
  @Input() type: LegalPersonType = this.form.value.LegalPersonType;

  @Output() save = new EventEmitter<CreateLegalUser>();
  @Output() reset = new EventEmitter<CreateLegalUser>();

  constructor(
    private transloco: TranslocoService,
    private dateAdapter: DateAdapter<any>,
  ) {}

  ngOnInit() {
    const lang = this.transloco.getActiveLang();
    const countryIso = lang.toUpperCase() as CountryISO;
    this.dateAdapter.setLocale(lang);
    this.form.patchValue({
      HeadquartersAddress: {
        Country: countryIso,
      },
      LegalRepresentativeNationality: countryIso,
      LegalRepresentativeCountryOfResidence: countryIso,
      LegalRepresentativeAddress: {
        Country: countryIso,
      },
    });
  }
}
