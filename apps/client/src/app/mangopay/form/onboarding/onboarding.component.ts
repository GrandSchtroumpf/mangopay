import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import type { CreateIbanAccount, CreateNaturalUser } from '@mangopay/sdk';
import { FormBankIban } from '../bank-iban/bank-iban.form';
import { FormNaturalUser } from '../natural-user/natural-user.form';

@Component({
  selector: 'mango-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingComponent {
  userId = '112097770';
  userForm = new FormNaturalUser();
  bankForm = new FormBankIban();

  constructor(private functions: AngularFireFunctions) {}

  async ngOnInit() {
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

  async createUser(user: CreateNaturalUser) {
    const res = await this.runCall('createSeller', user);
    if (res.user.Id) {
      this.userId = res.user.Id;
    }
  }

  async createBank(bankAccount: CreateIbanAccount) {
    const res = await this.runCall('addBank', { userId: this.userId, bankAccount });
    console.log(res);
  }
}
