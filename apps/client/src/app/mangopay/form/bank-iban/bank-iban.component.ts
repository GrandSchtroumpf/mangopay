import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { FormBankIban } from './bank-iban.form';

@Component({
  selector: 'bank-iban-form',
  templateUrl: './bank-iban.component.html',
  styleUrls: ['./bank-iban.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: TRANSLOCO_SCOPE,
    useValue: 'mangopay'
  }]
})
export class BankIbanFormComponent {
  form: FormBankIban = new FormBankIban();
  useUserAddress = new FormControl(true);
}
