import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { FormAddress } from './address.form';
import { coerceBoolean } from 'coerce-property';
import { ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'address-form',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [{
    provide: TRANSLOCO_SCOPE,
    useValue: 'mangopay'
  }]
})
export class AddressFormComponent {
  
  @Input() form?: FormAddress;
  @Input() name?: string;
  @Input() @coerceBoolean required: boolean | '' = false;

  constructor(private parent: ControlContainer) {}

  ngOnInit() {
    if (this.name) {
      this.form = (this.parent.control as FormGroup).get(this.name) as FormAddress;
    }
  }
}
