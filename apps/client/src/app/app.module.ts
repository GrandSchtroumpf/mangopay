import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/auth';
import { AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/firestore';
import {
  AngularFireFunctionsModule,
  USE_EMULATOR as USE_FUNCTIONS_EMULATOR,
  REGION,
} from '@angular/fire/functions';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { NaturalUserModule } from './mangopay/form/natural-user/natural-user.module';
import { BankIbanModule } from './mangopay/form/bank-iban/bank-iban.module';

// Specific config for emulators
const FIREBASE_EMUTLATORS = environment.useEmulators
  ? [
      { provide: USE_AUTH_EMULATOR, useValue: ['localhost', 9099] },
      { provide: USE_FIRESTORE_EMULATOR, useValue: ['localhost', 8000] },
      { provide: USE_FUNCTIONS_EMULATOR, useValue: ['localhost', 5001] },
    ]
  : [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslocoRootModule,
    NaturalUserModule,
    BankIbanModule,
  ],
  providers: [
    { provide: REGION, useValue: 'europe-west1' },
    ...FIREBASE_EMUTLATORS
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
