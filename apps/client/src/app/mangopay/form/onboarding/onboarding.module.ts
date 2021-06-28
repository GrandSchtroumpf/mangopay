import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { OnboardingComponent } from './onboarding.component';

import { LegalUserFormModule } from '../user/legal/legal.module';
import { BankIbanModule } from '../bank-iban/bank-iban.module';
import { KycModule } from '../kyc/kyc.module';

import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MangoPayFire, MangoPayService } from '../service';

@NgModule({
  declarations: [OnboardingComponent],
  exports: [OnboardingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
    LegalUserFormModule,
    BankIbanModule,
    KycModule,
    MatStepperModule,
    MatButtonModule,
  ],
  providers: [{
    provide: MangoPayService,
    useClass: MangoPayFire
  }]
})
export class OnboardingModule { }
