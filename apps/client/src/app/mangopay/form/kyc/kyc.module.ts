import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KycFormComponent } from './kyc.component';
import { TranslocoModule } from '@ngneat/transloco';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [KycFormComponent],
  exports: [KycFormComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ]
})
export class KycModule { }
