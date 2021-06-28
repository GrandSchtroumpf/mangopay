import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import type { CreateIbanAccount, CreateLegalUser, CreateNaturalUser, IbanAccount, LegalUser, NaturalUser } from '@mangopay/sdk';

export abstract class MangoPayService {
  abstract user: {
    legal: {
      create(user: CreateLegalUser): Promise<LegalUser>;
    },
    natural: {
      create(user: CreateNaturalUser): Promise<NaturalUser>;
    },
    get<User extends NaturalUser | LegalUser = NaturalUser | LegalUser>(id: string): Promise<User>
  }
  abstract bankAccount: {
    createIban: (userId: string, bankAccount: CreateIbanAccount) => Promise<IbanAccount>;
  }
  abstract uploadKycDocument(file: File): Promise<unknown>;
}


@Injectable({ providedIn: 'root' })
export class MangoPayFire extends MangoPayService {

  user = {
    natural: {
      create: (user: CreateNaturalUser) => this.runCall<NaturalUser>('createBuyer', user),
    },
    legal: {
      create: (user: CreateLegalUser) => this.runCall<LegalUser>('createSeller', user),
    },
    get: <User extends NaturalUser | LegalUser = NaturalUser | LegalUser>(id: string) => {
      return this.runCall<User>('getUser', id)
    }
  };

  bankAccount = {
    createIban: (userId: string, bankAccount: CreateIbanAccount) => {
      return this.runCall<IbanAccount>('createBankAccount', { userId, bankAccount });
    }
  }

  constructor(private functions: AngularFireFunctions) {
    super();
  }

  private async runCall<O>(name: string, params?: any): Promise<O> {
    try {
      const call = this.functions.httpsCallable(name);
      const res = await call(params).toPromise();
      return res; // Require for runCall to catch
    } catch(err) {
      console.log(err.details);
      throw err;
    }
  }

  async uploadKycDocument(file: File) {
    return;
  }
}