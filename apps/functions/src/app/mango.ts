import type { ErrorHandler, MangoPay } from '@mangopay/sdk';
import * as functions from 'firebase-functions';

const errorHandler: ErrorHandler = (err) => {
  console.log('ErrorHandler', err);
  throw new functions.https.HttpsError('invalid-argument', err.Message, err.errors);
}

let mango: MangoPay;
export async function getMangoPay() {
  if (!mango) {
    const { initialize } = await import('@mangopay/sdk');
    const { clientId, key } = functions.config().mangopay;
    mango = initialize({
      clientId,
      apiKey: key,
      sandbox: true,
      version: '2.01',
      context: {
        currency: 'EUR',
        lang: 'FR',
      },
      errorHandler
    });
  }
  return mango;
}