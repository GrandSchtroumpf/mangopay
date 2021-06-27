import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OnboardingComponent } from './onboarding.component';

import { NaturalUserModule } from '../natural-user/natural-user.module';
import { BankIbanModule } from '../bank-iban/bank-iban.module';
import { KycModule } from '../kyc/kyc.module';

import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [OnboardingComponent],
  exports: [OnboardingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NaturalUserModule,
    BankIbanModule,
    KycModule,
    MatStepperModule
  ]
})
export class OnboardingModule { }
