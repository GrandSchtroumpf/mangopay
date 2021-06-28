import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule, TranslocoService, TRANSLOCO_LANG } from '@ngneat/transloco';
import { LegalUserFormComponent } from './legal.component';

import { AddressFormModule } from '../../address/address.module';
import { CountryFormModule } from '../../country/country.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [LegalUserFormComponent],
  exports: [LegalUserFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
    AddressFormModule,
    CountryFormModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSlideToggleModule,
  ],
  providers: [{
    provide: MAT_DATE_LOCALE,
    deps: [TranslocoService],
    useFactory: (transloco: TranslocoService) => transloco.getActiveLang(),
  }]
})
export class LegalUserFormModule { }
