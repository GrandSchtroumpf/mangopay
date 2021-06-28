import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import type { LegalUser } from '@mangopay/sdk';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { FormBankIban } from '../bank-iban/bank-iban.form';
import { MangoPayService } from '../service';
import { FormLegalUser } from '../user/legal/legal.form';

@Component({
  selector: 'mango-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: TRANSLOCO_SCOPE,
    useValue: 'mangopay'
  }]
})
export class OnboardingComponent {
  userId = '112097770';
  userForm = new FormLegalUser('SOLETRADER');
  bankForm = new FormBankIban();

  @ViewChild(MatStepper) stepper!: MatStepper;

  constructor(
    private service: MangoPayService
  ) {}

  async ngOnInit() {
    await this.prepareBankAccount();
  }

  private async prepareBankAccount(user?: LegalUser) {
    user = user || await this.service.user.get<LegalUser>(this.userId);
    this.bankForm.patchValue({
      OwnerName: `${user.LegalRepresentativeFirstName} ${user.LegalRepresentativeLastName}`,
      OwnerAddress: user.HeadquartersAddress
    });
  }

  async createUser() {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      const value = this.userForm.value;
      const user = await this.service.user.legal.create(value);
      console.log(user);
      if (user.Id) {
        this.userId = user.Id;
        await this.prepareBankAccount(user);
        this.stepper.next();
      }
    }
  }

  async createBank() {
    this.bankForm.markAllAsTouched();
    if (this.bankForm.valid) {
      const bankAccount = this.bankForm.value;
      const res = await this.service.bankAccount.createIban(this.userId, bankAccount);
      console.log(res);
    }
  }
}
