import { ChangeDetectionStrategy, Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import type { CreateIbanAccount } from '@mangopay/sdk';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { bicPattern, FormBankIban, ibanPattern } from './bank-iban.form';

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
  @Input() form: FormBankIban = new FormBankIban();
  useUserAddress = new FormControl(true);
  ibanPattern = ibanPattern;
  bicPattern = bicPattern;

  @Output() save = new EventEmitter<CreateIbanAccount>();
  @Output() reset = new EventEmitter<CreateIbanAccount>();


  submit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }
}
