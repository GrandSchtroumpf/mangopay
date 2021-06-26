import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { CurrencyFormComponent } from './currency.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [CurrencyFormComponent],
  exports: [CurrencyFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule
  ]
})
export class StaticFieldModule { }
