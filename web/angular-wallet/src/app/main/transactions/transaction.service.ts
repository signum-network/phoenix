import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {TransactionApi, TransactionId, EncryptedMessage, Message} from '@burstjs/core';
import {Keys, decryptAES, hashSHA256, encryptMessage} from '@burstjs/crypto';
import {ApiService} from '../../api.service';
import {AccountService} from 'app/setup/account/account.service';
import {convertAddressToNumericId} from '@burstjs/util/out';
import {StoreService} from 'app/store/store.service';
import {Settings} from 'app/settings';

interface SendMoneyRequest {
  transaction: {
    amountNQT: string;
    feeNQT: string;
    attachment: EncryptedMessage | Message;
    deadline: number;
    fullHash: string;
    type: number;
  };
  pin: string;
  keys: Keys;
  recipientAddress: string;
}


interface SendMoneyMultiOutRequest {
  transaction: {
    feeNQT: string;
    recipients: string;
    deadline: number;
    amountNQT?: string;
    fullHash?: string;
  };
  pin: string;
  sameAmount: boolean;
  keys: Keys;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionApi: TransactionApi;

  public currentAccount: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor(apiService: ApiService, private accountService: AccountService, private storeService: StoreService) {
    this.transactionApi = apiService.api.transaction;
    this.storeService.settings.subscribe((settings: Settings) => {
      this.transactionApi = apiService.api.transaction;
    });
  }

  public getTransaction(id: string) {
    return this.transactionApi.getTransaction(id);
  }

  public async sendMoney({transaction, pin, keys, recipientAddress}: SendMoneyRequest) {
    if (transaction.attachment && (<EncryptedMessage>transaction.attachment).data) {

      const recipientAccountId = convertAddressToNumericId(recipientAddress);
      const recipient = await this.accountService.getAccount(recipientAccountId);
      const agreementPrivateKey = decryptAES(keys.agreementPrivateKey, hashSHA256(pin));
      const encryptedMessage = encryptMessage(
        (<EncryptedMessage>transaction.attachment).data,
        // @ts-ignore
        recipient.publicKey,
        agreementPrivateKey
      );
      // @ts-ignore
      transaction.attachment = encryptedMessage;
      transaction.attachment.type = 'encrypted_message';
    }
    const senderPrivateKey = decryptAES(keys.signPrivateKey, hashSHA256(pin));
    return this.transactionApi.sendMoney(transaction, keys.publicKey, senderPrivateKey, recipientAddress);
  }

  public async sendMoneyMultiOut({transaction, pin, keys, sameAmount}: SendMoneyMultiOutRequest): Promise<TransactionId> {
    const senderPrivateKey = decryptAES(keys.signPrivateKey, hashSHA256(pin));
    return this.transactionApi.sendMoneyMultiOut(transaction, keys.publicKey, senderPrivateKey, transaction.recipients, sameAmount);
  }
}
