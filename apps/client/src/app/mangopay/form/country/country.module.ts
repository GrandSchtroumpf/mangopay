import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { CountryFormComponent } from './country.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [CountryFormComponent],
  exports: [CountryFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule
  ]
})
export class CountryFormModule { }
