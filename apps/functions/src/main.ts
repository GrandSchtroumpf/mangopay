import * as functions from 'firebase-functions';
import type { CreateLegalUser } from '@mangopay/sdk';
import { getMangoPay } from './app/mango';

export * from './app/sync';

const europe = functions.region('europe-west1');

export const registerHook = europe.https.onCall(async () => {
  const mangopay = await getMangoPay();
  return mangopay.hook.create('PAYIN_NORMAL_CREATED', 'http://localhost:5001/veggiemarket-5237c/europe-west1/onHook)')
})

export const createSeller = europe.https.onCall(async (data: CreateLegalUser) => {
  const mangopay = await getMangoPay();
  const user = await mangopay.user.legal.create(data);
  // wallet
  await mangopay.wallet.create({
    Owners: [user.Id], 
    Description: 'Default'
  });
  return user;
});

export const getUser = europe.https.onCall(async (userId: string) => {
  const mangopay = await getMangoPay();
  return mangopay.user.get(userId);
})

export const createBankAccount = europe.https.onCall(async ({userId, bankAccount }) => {
  const mangopay = await getMangoPay();
  return mangopay.bankAccount.createIban(userId, bankAccount);
});


export const createKYC = europe.https.onCall(async (userId: string) => {
  const mangopay = await getMangoPay();
  const document = await mangopay.kyc.createDocument(userId, {
    Tag: 'Custom',
    Type: 'IDENTITY_PROOF'
  });
  // const {identityProof} = await import('./assets/identity-proof');
  const file = 'http://localhost:9199/v0/b/default-bucket/o/identity.pdf?alt=media&token=f15cc123-5cd6-4931-bc5f-f280e9244364';
  await mangopay.kyc.createPage(userId, document.Id, file);
  return mangopay.kyc.submit(userId, document.Id);
});

export const getKycDocuments = europe.https.onCall(async (userId: string) => {
  const mangopay = await getMangoPay();
  return mangopay.kyc.list(userId, { Status: 'CREATED' });
})


export const registerCard = europe.https.onCall(async (UserId: string) => {
  const mangopay = await getMangoPay();
  return mangopay.card.registration.create({ UserId });
});

interface PayWithCard {
  registrationId: string;
  data: string;
  userId: string;
}

export const payWithCard = europe.https.onCall(async ({data, userId, registrationId}: PayWithCard) => {
  const mangopay = await getMangoPay();
  const registration = await mangopay.card.registration.update(registrationId, data);
  const payin = await mangopay.payin.direct.create({
    AuthorId: userId,
    DebitedFunds: 1000, 
    CreditedWalletId: '111940438',
    SecureModeReturnURL: 'http://test.com/',
    SecureMode: 'DEFAULT',  
    CardId: registration.CardId,  
    StatementDescriptor: 'Payin'
  });
  return mangopay.transfer.create({
    AuthorId: userId,
    Fees: 100,
    DebitedFunds: 1000,
    DebitedWalletId: '111940438',
    CreditedUserId: '111891715',
    CreditedWalletId: '111891717',
  });

});


export const payout = europe.https.onCall(async ({userId, amount}: { userId: string, amount: number }) => {
  const mangopay = await getMangoPay();
  return mangopay.payout.create({
    AuthorId: userId,
    DebitedFunds: amount,
    DebitedWalletId: '111940438',
    BankAccountId: '111891751'
  });
});


export const onHook = europe.https.onRequest((req, res) => {
  console.log(req.params);
  console.log(req.body);
});