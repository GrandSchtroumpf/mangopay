import { getMangoPay } from './mango';
import * as functions from 'firebase-functions';
import type { IbanAccount, Transaction, User, Wallet } from '@mangopay/sdk';
import { getApp } from './admin';

interface DisplayUser {
  id: string;
  type: 'legal' | 'natural';
  name: string;
  email: string;
  wallets: Wallet[];
  bankAccounts: IbanAccount[];
  transactions: Transaction[];
}

function displayUser(
  user: User,
  wallets: Wallet[] = [],
  bankAccounts: IbanAccount[] = [],
  transactions: Transaction[] = [],
): DisplayUser {
  console.log(user.PersonType);
  if (user.PersonType === 'LEGAL') {
    return {
      id: user.Id,
      type: 'legal',
      name: `${user.LegalRepresentativeFirstName} ${user.LegalRepresentativeLastName}`,
      email: user.LegalRepresentativeEmail,
      wallets,
      bankAccounts, 
      transactions
    }
  } else {
    console.log(user)
    return {
      id: user.Id,
      type: 'natural',
      name: `${user.FirstName} ${user.LastName}`,
      email: user.Email,
      wallets,
      bankAccounts, 
      transactions
    }
  }
}


const europe = functions.region('europe-west1');

export const syncMangoPay = europe.https.onCall(async () => {
  const mangopay = await getMangoPay();

  const users = await mangopay.user.list({ Page: 1, Per_Page: 25 });
  console.log(users);
  return Promise.all(users.map(updateUser));
});

async function updateUser(userBase: User) {
  const userId = userBase.Id;
  const app = getApp();
  const mangopay = await getMangoPay();
  const [
    user,
    wallets,
    bankAccounts,
    transactions,
  ] = await Promise.all([
    mangopay.user.get(userId),
    mangopay.wallet.list(userId),
    mangopay.bankAccount.list(userId),
    mangopay.transaction.listByUser(userId),
  ]);

  const data = displayUser(user, wallets, bankAccounts, transactions);
  return app.db.collection('users').doc(user.Id).set(data);
}