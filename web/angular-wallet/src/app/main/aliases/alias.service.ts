import {Injectable} from '@angular/core';
import {
  TransactionId,
  Alias, AliasList, Ledger
} from '@signumjs/core';
import {Keys} from '@signumjs/crypto';
import {ApiService} from '../../api.service';
import {AccountService} from 'app/setup/account/account.service';
import {StoreService} from 'app/store/store.service';
import {Settings} from 'app/store/settings';
import {getPrivateEncryptionKey} from 'app/util/security/getPrivateEncryptionKey';
import { getPrivateSigningKey } from 'app/util/security/getPrivateSigningKey';
import { createMessageAttachment } from 'app/util/transaction/createMessageAttachment';

interface SetAliasRequest {
  aliasName: string;
  aliasURI: string;
  feeNQT: string;
  pin: string;
  keys: Keys;
}

interface SetAliasOnSaleRequest {
  aliasName: string;
  amountPlanck: string;
  feePlanck: string;
  keys: Keys;
  message?: string;
  pin: string;
  recipientId: string;
  recipientPublicKey: string;
  messageIsText: boolean;
  shouldEncryptMessage?: boolean;
}

interface BuyAliasRequest {
  aliasName: string;
  amountPlanck: string;
  feePlanck: string;
  keys: Keys;
  message?: string;
  pin: string;
  recipientPublicKey: string;
  messageIsText: boolean;
  shouldEncryptMessage?: boolean;
}

interface CancelAliasSaleRequest {
  aliasName: string;
  feePlanck: string;
  keys: Keys;
  pin: string;
  recipientId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AliasService {
  private api: Ledger;

  constructor(apiService: ApiService, private accountService: AccountService, private storeService: StoreService) {
    this.api = apiService.ledger;
    this.storeService.settingsUpdated$.subscribe((settings: Settings) => {
      this.api = apiService.ledger;
    });
  }

  public getAliasById(id: string): Promise<Alias> {
    return this.api.alias.getAliasById(id);
  }

  public getAliasByName(name: string): Promise<Alias> {
    return this.api.alias.getAliasByName(name);
  }

  public getAliases(accountId: string): Promise<AliasList> {
      return this.api.account.getAliases({ accountId });
  }

  public getAliasesDirectOffers(accountId: string): Promise<AliasList> {
      return this.api.alias.getAliasesOnSale({ buyerId: accountId });
  }


  public setAlias({ aliasName, aliasURI, feeNQT, pin, keys }: SetAliasRequest): Promise<TransactionId> {
    const senderPrivateKey = getPrivateSigningKey(pin, keys);
    return this.api.account.setAlias({
      aliasName,
      aliasURI,
      feePlanck: feeNQT,
      senderPublicKey: keys.publicKey,
      senderPrivateKey: senderPrivateKey,
    }) as Promise<TransactionId>;
  }
  public async setAliasOnSale(request: SetAliasOnSaleRequest): Promise<TransactionId> {

    const {aliasName, pin, amountPlanck, feePlanck, recipientId, message, messageIsText, shouldEncryptMessage, keys, recipientPublicKey} = request;

    const attachment = message ? createMessageAttachment({
      isEncrypted: shouldEncryptMessage,
      isText: messageIsText,
      encryptionKey: getPrivateEncryptionKey(pin, keys),
      recipientPublicKey,
      message
    }) : undefined;

    return (await this.api.alias.sellAlias({
      aliasName,
      amountPlanck,
      feePlanck,
      recipientId,
      // FIXME: this is only temporary
      // recipientPublicKey,
      senderPrivateKey: getPrivateSigningKey(pin, keys),
      senderPublicKey: keys.publicKey,
      attachment
    })) as TransactionId;

  }

  public async buyAlias(request: BuyAliasRequest): Promise<TransactionId> {

    const {aliasName, pin, amountPlanck, feePlanck, message, messageIsText, shouldEncryptMessage, keys, recipientPublicKey} = request;

    const attachment = message ? createMessageAttachment({
      isEncrypted: shouldEncryptMessage,
      isText: messageIsText,
      encryptionKey: getPrivateEncryptionKey(pin, keys),
      recipientPublicKey,
      message
    }) : undefined;

    return (await this.api.alias.buyAlias({
      aliasName,
      aliasId: undefined,
      feePlanck,
      amountPlanck,
      senderPrivateKey: getPrivateSigningKey(pin, keys),
      senderPublicKey: keys.publicKey,
      attachment
    })) as TransactionId;

  }

  public async cancelAliasSale(request: CancelAliasSaleRequest): Promise<TransactionId> {
    const {aliasName, pin, feePlanck, recipientId, keys} = request;
    return (await this.api.alias.sellAlias({
      aliasName,
      amountPlanck: '0',
      feePlanck,
      recipientId,
      senderPrivateKey: getPrivateSigningKey(pin, keys),
      senderPublicKey: keys.publicKey,
    })) as TransactionId;
  }

}
