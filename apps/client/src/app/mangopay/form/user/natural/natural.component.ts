import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import type { CreateNaturalUser } from '@mangopay/sdk';
import { TranslocoService, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { FormNaturalUser } from './natural.form';

@Component({
  selector: 'natural-user-form',
  templateUrl: './natural.component.html',
  styleUrls: ['./natural.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: TRANSLOCO_SCOPE,
    useValue: 'mangopay'
  }]
})
export class NaturalUserFormComponent {
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
}
