import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {
  Account,
  Address,
  Api,
  AttachmentEncryptedMessage,
  SuggestedFees,
  Transaction,
  TransactionArbitrarySubtype,
  TransactionId,
  TransactionType,
} from '@signumjs/core';
import {AccountService} from 'app/setup/account/account.service';
import {decryptAES, hashSHA256} from '@signumjs/crypto';
import {NetworkService} from 'app/network/network.service';
import {Amount, ChainTime} from '@signumjs/util';
import {ApiService} from '../../api.service';

export interface ChatMessage {
  message: string;
  timestamp: number;
  contactId: string;
  encryptedMessage?: AttachmentEncryptedMessage;
}

export interface Messages {
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

  private api: Api;
  contacts: Account[] = [];
  messages: Messages[] = [];
  user: any;
  onMessageSelected: BehaviorSubject<any>;
  onOptionsSelected: BehaviorSubject<MessageOptions>;
  onMessagesUpdated: Subject<any>;
  onUserUpdated: Subject<any>;
  onLeftSidenavViewChanged: Subject<any>;
  onRightSidenavViewChanged: Subject<any>;

  constructor(private accountService: AccountService,
              private networkService: NetworkService,
              apiService: ApiService
  ) {
    this.api = apiService.api;
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

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.populateMessages();
  }

  public async populateMessages(): Promise<void> {
    try {
      this.user = await this.accountService.currentAccount$.getValue();
      const messages = await this.getMessages();
      this.messages = messages.reduce((acc, val) => {
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
    } catch (e) {
      console.warn(e);
      this.messages = [];
      this.contacts = [];
    }

    this.onMessagesUpdated.next(this.messages);
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

    const recipient = await this.accountService.getAccount(recipientId);
    const senderKeys = {
      agreementPrivateKey: decryptAES(this.user.keys.agreementPrivateKey, hashSHA256(pin)),
      signPrivateKey: decryptAES(this.user.keys.signPrivateKey, hashSHA256(pin)),
      publicKey: this.user.keys.publicKey
    };

    let transactionId;

    if (isEncrypted) {
      // @ts-ignore
      if (!recipient.publicKey) {
        // todo: figure out why notifier service isnt working!
        throw new ErrorEvent('error_recipient_no_public_key');
      }

      transactionId = await this.api.message.sendEncryptedMessage({
        recipientId,
        // @ts-ignore
        recipientPublicKey: recipient.publicKey,
        message: message.message,
        feePlanck: Amount.fromSigna(fee).getPlanck(),
        senderPrivateKey: senderKeys.signPrivateKey,
        senderAgreementKey: senderKeys.agreementPrivateKey,
        senderPublicKey: senderKeys.publicKey
      });
    } else {
      transactionId = await this.api.message.sendMessage({
        recipientId,
        message: message.message,
        feePlanck: Amount.fromSigna(fee).getPlanck(),
        senderPrivateKey: senderKeys.signPrivateKey,
        senderPublicKey: senderKeys.publicKey,
      });
    }

    // Check to see if existing chat session exists (ios-style), if so, merge it
    this.mergeWithExistingChatSession(message, recipientId);
    return transactionId;
  }

  /**
   * Get messages
   *
   * @returns {Promise<any>}
   */
  async getMessages(): Promise<any> {

    // TODO: in the future we should allow scrolling to older messages (if > maxNumberMessages)
    const maxNumberMessages = 100;
    const accountId = this.accountService.currentAccount$.getValue().account;

    const getConfirmedMessages = this.accountService.getAccountTransactions({
      accountId,
      firstIndex: 0,
      lastIndex: maxNumberMessages,
      type: TransactionType.Arbitrary,
      subtype: TransactionArbitrarySubtype.Message,
      includeIndirect: false,
    });
    const getUnconfirmedMessages = this.accountService.getUnconfirmedTransactions(accountId);

    const messages = await Promise.all([getConfirmedMessages, getUnconfirmedMessages]);
    const allMessages =
      messages[1].unconfirmedTransactions.filter((t: Transaction) =>
        t.type === TransactionType.Arbitrary &&
        t.subtype === TransactionArbitrarySubtype.Message
      )
        .concat(messages[0].transactions)
        .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1);

    return Promise.resolve(allMessages);
  }

  sendNewMessage(recipient): void {
    const message = {
      contactId: recipient ? Address.fromReedSolomonAddress(recipient).getNumericId() : 'new',
      dialog: [],
      senderRS: recipient,
      timestamp: ChainTime.fromDate(new Date()).getChainTimestamp()
    };
    if (recipient) {
      this.messages.push(message);
      this.onMessagesUpdated.next(this.messages);
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
    const existingMessage = this.messages.find(({contactId}) => contactId === recipientRS);
    if (!existingMessage) {
      return;
    }
    existingMessage.dialog.push(message);
    this.messages = this.messages.filter(({dialog}) => dialog[0] !== message);
    this.onMessagesUpdated.next(this.messages);
    this.getMessage(existingMessage);
  }
}
