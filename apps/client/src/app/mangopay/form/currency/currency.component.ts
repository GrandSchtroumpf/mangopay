import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslocoService, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormCurrency, currencies } from './currency.form';

@Component({
  selector: 'currency-form',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: TRANSLOCO_SCOPE,
    useValue: 'mangopay'
  }]
})
export class CurrencyFormComponent {
  private value$ = new BehaviorSubject<string[]>(currencies);
  @Input() form: FormCurrency = new FormCurrency();
  options$ = this.value$.pipe(debounceTime(200));
  displayLabel = (key: string) => this.getLabel(key);

  constructor(
    private transloco: TranslocoService,
  ) {}

  private getLabel(key: string) {
    if (!key) return;
    return this.transloco.translate(`mangopay.country.${key}`);
  }

  filter(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    const rest = currencies.filter(key => this.getLabel(key).toLowerCase().includes(value));
    this.value$.next(rest);
  }
}
