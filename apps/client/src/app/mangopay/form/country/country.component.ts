import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TranslocoService, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormCountry, countries } from './country.form';
import { coerceBoolean } from 'coerce-property';
import { FormGroup, ControlContainer } from '@angular/forms';

@Component({
  selector: 'country-form',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
   // required else doesn't change on submit is unvalid
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [{
    provide: TRANSLOCO_SCOPE,
    useValue: 'mangopay'
  }]
})
export class CountryFormComponent {
  private value$ = new BehaviorSubject<string[]>(countries);
  options$ = this.value$.pipe(debounceTime(200));
  displayLabel = (key: string) => this.getLabel(key);

  @Input() name?: string;
  @Input() form?: FormCountry;
  @Input() @coerceBoolean required: boolean | '' = false;

  constructor(
    private parent: ControlContainer,
    private transloco: TranslocoService,
  ) {}

  ngOnInit() {
    if (this.name) {
      this.form = (this.parent.control as FormGroup).get(this.name) as FormCountry;
    }
  }

  private getLabel(key: string) {
    if (!key) return;
    return this.transloco.translate(`mangopay.country.${key}`);
  }

  filter(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    const rest = countries.filter(key => this.getLabel(key).toLowerCase().includes(value));
    this.value$.next(rest);
  }
}
