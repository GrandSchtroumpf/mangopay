import { Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'mangopay-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  userForm = new FormControl();
  constructor(private functions: AngularFireFunctions) {}

  private runCall(name: string, params?: any) {
    const call = this.functions.httpsCallable(name);
    return call(params).pipe(take(1)).toPromise();
  }

  async createSeller() {
    const { user, wallet } = await this.runCall('createSeller');
    console.log({user, wallet});
    this.userForm.setValue(user.Id);
  }

  async addBank() {
    const uid = this.userForm.value.trim();
    if (!uid) return;
    this.runCall('addBank', parseInt(uid));
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
      await this.runCall('payWithCard', { registrationId: registration.Id, data, userId: uid});
    } catch (err) {
      console.error(err);
    }
  }
}
