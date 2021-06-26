import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
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
  form = new FormNaturalUser();
  incomeRanges = [1, 2, 3, 4, 5, 6];
  constructor(
    transloco: TranslocoService,
    dateAdapter: DateAdapter<any>,
  ) {
    dateAdapter.setLocale(transloco.getActiveLang());
  }
}
