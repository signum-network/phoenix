import {Injectable} from '@angular/core';
import {
  TransactionId,
  AttachmentEncryptedMessage,
  AttachmentMessage,
  Attachment,
  Alias, AliasList, Ledger
} from '@signumjs/core';
import {Keys, encryptMessage, encryptData, EncryptedMessage, EncryptedData} from '@signumjs/crypto';
import {ApiService} from '../../api.service';
import {AccountService} from 'app/setup/account/account.service';
import {convertHexStringToByteArray} from '@signumjs/util';
import {StoreService} from 'app/store/store.service';
import {Settings} from 'app/settings';
import {getPrivateEncryptionKey} from 'app/util/security/getPrivateEncryptionKey';
import { getPrivateSigningKey } from 'app/util/security/getPrivateSigningKey';

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

@Injectable({
  providedIn: 'root'
})
export class AliasService {
  private api: Ledger;

  constructor(apiService: ApiService, private accountService: AccountService, private storeService: StoreService) {
    this.api = apiService.api;
    this.storeService.settings.subscribe((settings: Settings) => {
      this.api = apiService.api;
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

    let attachment: Attachment;
    if (message && shouldEncryptMessage) {
      const agreementPrivateKey = getPrivateEncryptionKey(pin, keys);
      let encryptedMessage: EncryptedMessage | EncryptedData;
      if (messageIsText) {
        encryptedMessage = encryptMessage(
          message,
          recipientPublicKey,
          agreementPrivateKey
        );
      } else {
        encryptedMessage = encryptData(
          new Uint8Array(convertHexStringToByteArray(message)),
          recipientPublicKey,
          agreementPrivateKey
        );
      }
      attachment = new AttachmentEncryptedMessage(encryptedMessage);
    } else if (message) {
      attachment = new AttachmentMessage({message, messageIsText});
    }

    return (await this.api.alias.sellAlias({
      aliasName,
      amountPlanck,
      feePlanck,
      recipientId,
      recipientPublicKey,
      senderPrivateKey: getPrivateSigningKey(pin, keys),
      senderPublicKey: keys.publicKey,
      attachment
    })) as TransactionId;

  }

}
