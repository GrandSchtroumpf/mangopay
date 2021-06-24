// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: true,
  firebase: {
    apiKey: "AIzaSyAOkHPIlszN_LLyixr0Ez4UlXneVHQhfBY",
    authDomain: "veggiemarket-5237c.firebaseapp.com",
    databaseURL: "https://veggiemarket-5237c.firebaseio.com",
    projectId: "veggiemarket-5237c",
    storageBucket: "veggiemarket-5237c.appspot.com",
    messagingSenderId: "992856431901",
    appId: "1:992856431901:web:b69f53fa68adc180e295f4",
    measurementId: "G-STGW946JTW"
  }
};

// Work around for https://github.com/firebase/firebase-js-sdk/issues/4110
import firebase from 'firebase/app';
import 'firebase/auth';

if (environment.useEmulators) {
  const app = firebase.initializeApp(environment.firebase);
  (app.auth() as any).useEmulator('http://localhost:9099', {
    disableWarnings: true,
  });
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
