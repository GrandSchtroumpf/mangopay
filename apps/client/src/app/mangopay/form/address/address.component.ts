import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { FormAddress } from './address.form';

@Component({
  selector: 'address-form',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: TRANSLOCO_SCOPE,
    useValue: 'mangopay'
  }]
})
export class AddressFormComponent {

  @Input() scope: string = 'address';
  @Input() form: FormAddress = new FormAddress();

  constructor() { }

}
