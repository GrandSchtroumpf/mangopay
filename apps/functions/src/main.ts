import * as functions from 'firebase-functions';
import type { MangoPay } from './app/mangopay';

const europe = functions.region('europe-west1');

let mango: MangoPay;
async function getMangoPay() {
  if (!mango) {
    const { initialize } = await import('./app/mangopay');
    const { clientId, key } = functions.config().mangopay;
    mango = initialize({
      clientId,
      apiKey: key,
      sandbox: true,
      context: {
        currency: 'EUR',
        lang: 'FR',
      }
    });
  }
  return mango;
}

export const createSeller = europe.https.onCall(async () => {
  const mangopay = await getMangoPay();

  const user = await mangopay.user.natural.create({
    FirstName: "Joe",
    LastName: "Blogs",
    Address: {
      AddressLine1: "1 Mangopay Street",
      AddressLine2: "The Loop",
      City: "Paris",
      Region: "Ile de France",
      PostalCode: "75001",
      Country: "FR"
    },
    Birthday: 1463496101,
    Nationality: "GB",
    CountryOfResidence: "FR",
    Occupation: "Carpenter",
    IncomeRange: 2,
    Email: "test@mangopay.com"
  });

  // wallet
  const wallet = await mangopay.wallet.create({
    Owners: [user.Id], 
    Description: 'A very cool wallet',
    Tag: 'Postman create a wallet'
  });
  return { user, wallet };
});

export const addBank = europe.https.onCall(async (userId: string) => {
  const mangopay = await getMangoPay();

  // Bank account
  return mangopay.bankAccount.createIban(userId, {
    Type: 'IBAN',
    OwnerName: 'Cyrano de Bergerac',
    OwnerAddress: {
      AddressLine1:'Street 7',
      AddressLine2: '',
      City: 'Paris',  
      Region: 'Ile de Frog',
      PostalCode:'75010',
      Country:'FR'
    },
    IBAN: 'FR7630004000031234567890143',
    BIC: 'BNPAFRPP',
    Tag: 'Postman create a bank account'
  });
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