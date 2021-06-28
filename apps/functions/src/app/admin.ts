import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';

let app: AdminApp;

export function assertCdt(condition: boolean, message: string, details?: unknown): asserts condition {
  if (!condition) {
    throw new https.HttpsError('failed-precondition', message, details);
  }
}


export function getApp(): AdminApp {
  if (!app) {
    app = new AdminApp();
  }
  return app;
}

export class AdminApp {
  app: admin.app.App;
  constructor(options?: admin.AppOptions | undefined, name?: string | undefined) {
    this.app = admin.initializeApp(options, name);
    this.db.settings({ ignoreUndefinedProperties: true })
  }

  get db() {
    return this.app.firestore();
  }

  get auth() {
    return this.app.auth();
  }
}
