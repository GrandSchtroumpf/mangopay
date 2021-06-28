import { AbstractControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith } from "rxjs/operators";

type Controls<T> = Record<Extract<keyof T, string>, AbstractControl>

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export class TypedFormGroup<T, C extends Controls<T>> extends FormGroup {
  value!: T;
  valueChanges!: Observable<T>
  value$ = this.valueChanges.pipe(startWith(this.value));
  
  get<K extends Extract<keyof C, string>>(key: K): C[K] {
    return super.get(key) as C[K];
  }

  patchValue(value: DeepPartial<T>) {
    super.patchValue(value);
  }

  setValue(value: Partial<T>) {
    super.patchValue(value);
  }
}