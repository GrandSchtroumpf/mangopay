import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankIbanFormComponent } from './bank-iban.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';

import { AddressFormModule } from '../address/address.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [BankIbanFormComponent],
  exports: [BankIbanFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
    AddressFormModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class BankIbanModule { }
