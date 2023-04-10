import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {
  Account,
  Address,
  AttachmentEncryptedMessage,
  SuggestedFees, Transaction,
  TransactionArbitrarySubtype,
  TransactionId,
  TransactionType
} from '@signumjs/core';
import {NetworkService} from 'app/network/network.service';
import {Amount, ChainTime} from '@signumjs/util';
import { StoreService } from '../../store/store.service';
import { AccountManagementService } from 'app/shared/services/account-management.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { getPrivateEncryptionKey } from 'app/util/security/getPrivateEncryptionKey';
import { getPrivateSigningKey } from 'app/util/security/getPrivateSigningKey';
import { LedgerService } from 'app/ledger.service';

export interface ChatMessage {
  message: string;
  timestamp: number;
  contactId: string;
  encryptedMessage?: AttachmentEncryptedMessage;
}

export interface Chat {
  dialog: ChatMessage[];
  contactId: string;
  senderRS: string;
  timestamp: number;
}

export interface MessageOptions {
  encrypt: boolean;
  feeNQT: string;
  fees?: SuggestedFees;
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService implements Resolve<any> {

  contacts: Account[] = [];
  chats: Chat[] = [];
  user: WalletAccount;
  onMessageSelected: BehaviorSubject<any>;
  onOptionsSelected: BehaviorSubject<MessageOptions>;
  onMessagesUpdated: Subject<any>;
  onUserUpdated: Subject<any>;
  onLeftSidenavViewChanged: Subject<any>;
  onRightSidenavViewChanged: Subject<any>;

  constructor(private accountManagementService: AccountManagementService,
              private networkService: NetworkService,
              private storeService: StoreService,
              private ledgerService: LedgerService
  ) {
    this.onMessageSelected = new BehaviorSubject({});
    this.onOptionsSelected = new BehaviorSubject({
      encrypt: false,
      feeNQT: ''
    });
    this.onMessagesUpdated = new Subject();
    this.onLeftSidenavViewChanged = new Subject();
    this.onRightSidenavViewChanged = new Subject();
    this.mergeWithExistingChatSession = this.mergeWithExistingChatSession.bind(this);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.populateMessages();
  }

  public async populateMessages(): Promise<void> {
    try {
      this.user = this.accountManagementService.getSelectedAccount();
      this.chats = await this.loadChats();
    } catch (e) {
      console.warn(e);
      this.chats = [];
      this.contacts = [];
    }

    this.onMessagesUpdated.next(this.chats);
  }

  getMessage(message, isNewMessage?: boolean): void {
    this.onMessageSelected.next({message, isNewMessage});
  }

  public async sendTextMessage(
    message: ChatMessage,
    isEncrypted: boolean,
    recipientId: string,
    pin: string,
    fee: number): Promise<TransactionId> {

    const ledger = this.ledgerService.ledger;
    const recipient = await ledger.account.getAccount({accountId: recipientId});
    const senderKeys = {
      agreementPrivateKey: getPrivateEncryptionKey(pin, this.user.keys),
      signPrivateKey: getPrivateSigningKey(pin, this.user.keys),
      publicKey: this.user.keys.publicKey
    };

    let transactionId;
    if (isEncrypted) {
      // @ts-ignore
      if (!recipient.publicKey) {
        // todo: figure out why notifier service isnt working!
        throw new ErrorEvent('error_recipient_no_public_key');
      }

      transactionId = await ledger.message.sendEncryptedMessage({
        recipientId,
        recipientPublicKey: recipient.publicKey,
        message: message.message,
        feePlanck: Amount.fromSigna(fee).getPlanck(),
        senderPrivateKey: senderKeys.signPrivateKey,
        senderAgreementKey: senderKeys.agreementPrivateKey,
        senderPublicKey: senderKeys.publicKey
      });
    } else {
      transactionId = await ledger.message.sendMessage({
        recipientId,
        message: message.message,
        feePlanck: Amount.fromSigna(fee).getPlanck(),
        senderPrivateKey: senderKeys.signPrivateKey,
        senderPublicKey: senderKeys.publicKey,
      });
    }

    this.mergeWithExistingChatSession(message, recipientId);
    return transactionId;
  }

  private async fetchMessagesPerAccount(): Promise<Transaction[]> {
      const accountId = this.user.account;

      const fetchConfirmedMessages = this.ledgerService.ledger.account.getAccountTransactions({
        accountId,
        type: TransactionType.Arbitrary,
        subtype: TransactionArbitrarySubtype.Message,
        includeIndirect: false,
      });
      const fetchUnconfirmedMessages = this.ledgerService.ledger.account.getUnconfirmedAccountTransactions(accountId, false);

      const [confirmed, pending] = await Promise.all([fetchConfirmedMessages, fetchUnconfirmedMessages]);

      const allMessages =
        pending.unconfirmedTransactions.filter((t: Transaction) =>
          t.type === TransactionType.Arbitrary &&
          t.subtype === TransactionArbitrarySubtype.Message &&
          t.attachment !== undefined
        ).concat(confirmed.transactions);

      allMessages.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1);
      return allMessages;
  }

  async loadChats(): Promise<Chat[]> {
    const messageTransactions = await this.fetchMessagesPerAccount();

    return messageTransactions.reduce((acc, val) => {
      const isSentMessage = this.user.account === val.sender;
      val.attachment.timestamp = val.timestamp;
      val.attachment.contactId = val.sender;
      const existingMessage = acc.find((item) => {
        return isSentMessage ? item.contactId === val.recipient :
          item.contactId === val.sender;
      });
      if (existingMessage) {
        existingMessage.dialog.unshift(val.attachment);
        return acc;
      }
      return acc.concat({
        contactId: isSentMessage ? val.recipient : val.sender,
        dialog: [val.attachment],
        senderRS: isSentMessage ? val.recipientRS : val.senderRS,
        timestamp: val.timestamp // relies on default order being reverse chrono
      });
    }, []);
  }

  sendNewMessage(recipient): void {
    const message = {
      contactId: recipient ? Address.fromReedSolomonAddress(recipient).getNumericId() : 'new',
      dialog: [],
      senderRS: recipient,
      timestamp: ChainTime.fromDate(new Date()).getChainTimestamp()
    };
    if (recipient) {
      this.chats.push(message);
      this.onMessagesUpdated.next(this.chats);
    }
    this.getMessage(message, true);
  }

  /**
   * iOS-style feature that merges an existing chat session.
   * Covers the unlikely edge case where user searches for an address, modifies it, and then sends the msg.
   * @param message unsigned, unverified message to be added to the screen for immediate user satisfaction
   * @param recipientRS the recipient to scan for
   */
  mergeWithExistingChatSession(message: ChatMessage, recipientRS: string): void {
    const existingMessage = this.chats.find(({contactId}) => contactId === recipientRS);
    if (!existingMessage) {
      return;
    }
    existingMessage.dialog.push(message);
    this.chats = this.chats.filter(({dialog}) => dialog[0] !== message);
    this.onMessagesUpdated.next(this.chats);
    this.getMessage(existingMessage);
  }
}
