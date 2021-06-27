import { Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FormControl } from '@angular/forms';
import type { CreateIbanAccount, CreateNaturalUser } from '@mangopay/sdk';
import { FormBankIban } from './mangopay/form/bank-iban/bank-iban.form';
import { FormNaturalUser } from './mangopay/form/natural-user/natural-user.form';

@Component({
  selector: 'mangopay-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  userId = '112097770';
  userForm = new FormNaturalUser();
  bankForm = new FormBankIban();
  amountForm = new FormControl();
  constructor(private functions: AngularFireFunctions) {}

  private runCall(name: string, params?: any) {
    const call = this.functions.httpsCallable(name);
    return call(params).toPromise();
  }

  async createUser(user: CreateNaturalUser) {
    try {
      console.log(user);
      const res = await this.runCall('createSeller', user);
      console.log(res);
      if (res.user.Id) {
        this.userId = res.user.Id;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async createBank(bankAccount: CreateIbanAccount) {
    const res = await this.runCall('addBank', { userId: this.userId, bankAccount });
    console.log(res);
  }

  async createKYC() {
    const uid = this.userForm.value.trim();
    if (!uid) return;
    const page = await this.runCall('createKYC', parseInt(uid));
    console.log(page);
  }

  async getKycDocuments() {
    const uid = this.userForm.value.trim();
    if (!uid) return;
    const documents = await this.runCall('getKycDocuments', parseInt(uid));
    console.log(documents);
  }

  async pay() {
    const uid = this.userForm.value.trim();
    if (!uid) return;
    const registration = await this.runCall('registerCard', parseInt(uid));
    try {
      const body = Object.entries({
        accessKeyRef: registration.AccessKey,
        data: registration.PreregistrationData,
        cardNumber: '4972485830400049',
        cardExpirationDate: '0131',
        cardCvx: '123'
      })
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
      const res = await fetch(registration.CardRegistrationURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body
      });
      const data = await res.text();
      const transfer = await this.runCall('payWithCard', { registrationId: registration.Id, data, userId: uid});
      console.log(transfer);
    } catch (err) {
      console.error(err);
    }
  }

  async payout() {
    const userId = this.userForm.value.trim();
    const amount = this.amountForm.value;
    if (!userId || !amount) return;
    const payout = await this.runCall('payout', {userId, amount});
    console.log(payout);
  }
}
