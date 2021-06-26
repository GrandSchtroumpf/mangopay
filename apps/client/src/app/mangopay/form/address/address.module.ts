import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { AddressFormComponent } from './address.component';
import { CountryFormModule } from '../country/country.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [AddressFormComponent],
  exports: [AddressFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
    CountryFormModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class AddressFormModule { }
