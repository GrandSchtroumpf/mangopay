import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatStepper } from '@angular/material/stepper';
import type { CreateIbanAccount, CreateLegalUser } from '@mangopay/sdk';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { FormBankIban } from '../bank-iban/bank-iban.form';
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

  constructor(private functions: AngularFireFunctions) {}

  async ngOnInit() {
    await this.prepareBankAccount();
  }

  private async prepareBankAccount() {
    const user = await this.runCall('getUser', this.userId);
    this.bankForm.patchValue({
      OwnerName: `${user.FirstName} ${user.LastName}`,
      OwnerAddress: user.Address
    });
  }

  private async runCall(name: string, params?: any) {
    try {
      const call = this.functions.httpsCallable(name);
      const res = await call(params).toPromise();
      return res; // Require for runCall to catch
    } catch(err) {
      console.log(err.details);
      throw err;
    }
  }

  async createUser() {
    console.log(this.userForm.get('LegalRepresentativeBirthday'));
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      const user = this.userForm.value;
      const res = await this.runCall('createSeller', user);
      if (res.user.Id) {
        this.userId = res.user.Id;
        await this.prepareBankAccount();
        this.stepper.next();
      }
    }
  }

  async createBank() {
    this.bankForm.markAllAsTouched();
    if (this.bankForm.valid) {
      const bankAccount = this.bankForm.value;
      const res = await this.runCall('addBank', { userId: this.userId, bankAccount });
      console.log(res);
    }
  }
}
