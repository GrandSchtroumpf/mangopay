import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import type { CreateNaturalUser } from '@mangopay/sdk';
import { TranslocoService, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { FormNaturalUser } from './natural-user.form';

@Component({
  selector: 'natural-user-form',
  templateUrl: './natural-user.component.html',
  styleUrls: ['./natural-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: TRANSLOCO_SCOPE,
    useValue: 'mangopay'
  }]
})
export class NaturalUserComponent {
  incomeRanges = [1, 2, 3, 4, 5, 6];
  @Input() form: FormNaturalUser = new FormNaturalUser();
  @Output() save = new EventEmitter<CreateNaturalUser>();
  @Output() reset = new EventEmitter<CreateNaturalUser>();

  constructor(
    private transloco: TranslocoService,
    private dateAdapter: DateAdapter<any>,
  ) {}

  ngOnInit() {
    const lang = this.transloco.getActiveLang();
    this.dateAdapter.setLocale(lang);
    this.form.patchValue({
      Nationality: lang.toUpperCase(),
      CountryOfResidence: lang.toUpperCase(),
      Address: {
        Country: lang.toUpperCase()
      }
    });
  }

  submit() {
    const value = this.form.value;
    if (this.form.get('Address').pristine) {
      delete value.Address;
    }
    this.save.emit(value);
    if (this.form.valid) {
    }
  }
}
