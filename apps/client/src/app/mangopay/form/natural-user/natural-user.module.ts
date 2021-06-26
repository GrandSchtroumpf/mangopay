import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { NaturalUserComponent } from './natural-user.component';

import { AddressFormModule } from '../address/address.module';
import { CountryFormModule } from '../country/country.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [NaturalUserComponent],
  exports: [NaturalUserComponent],
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
  ]
})
export class NaturalUserModule { }
