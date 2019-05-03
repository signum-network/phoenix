import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {
  Api,
  Account,
  SuggestedFees,
  EncryptedMessage,
  Transaction,
  TransactionId,
  TransactionType,
  TransactionArbitrarySubtype,
} from '@burstjs/core';
import {AccountService} from 'app/setup/account/account.service';
import {decryptAES, hashSHA256} from '@burstjs/crypto';
import {NetworkService} from 'app/network/network.service';
import {convertDateToBurstTime, convertAddressToNumericId} from '@burstjs/util';
import {ApiService} from '../../api.service';

export interface ChatMessage {
  message: string;
  timestamp: number;
  contactId: string;
  encryptedMessage?: EncryptedMessage;
}

export interface Messages {
  dialog: ChatMessage[];
  contactId: string;
  senderRS: string;
  timestamp: string;
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
      encrypt: true,
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
    return new Promise(async (resolve, reject) => {
      try {
        this.user = await this.accountService.currentAccount.getValue();

        const fees = await this.networkService.suggestFee();
        this.selectOptions({
          fees: fees,
          encrypt: true
        });

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
      resolve();

    });
  }

  getMessage(message, isNewMessage?: boolean): void {
    this.onMessageSelected.next({message, isNewMessage});
  }

  /**
   * Send message then update the dialog
   *
   * @param messageId
   * @param {ChatMessage} message the message to send
   * @param {string} recipientId the recipient address
   * @param {string} pin the user's pin
   * @param {number} fee the fee to pay
   * @returns {ChatMessage}
   */
  public async sendTextMessage(message: ChatMessage, recipientId: string, pin: string, fee: number): Promise<TransactionId> {

    const recipient = await this.accountService.getAccount(recipientId);
    const senderKeys = {
      agreementPrivateKey: decryptAES(this.user.keys.agreementPrivateKey, hashSHA256(pin)),
      signPrivateKey: decryptAES(this.user.keys.signPrivateKey, hashSHA256(pin)),
      publicKey: this.user.keys.publicKey
    };

    let transactionId;
    if (this.onOptionsSelected.value.encrypt) {
      // @ts-ignore
      if (!recipient.publicKey) {
        // todo: figure out why notifier service isnt working!
        throw new ErrorEvent('error_recipient_no_public_key');
      }
      // @ts-ignore
      transactionId = await this.api.message.sendEncryptedTextMessage(message.message, recipientId, recipient.publicKey, senderKeys, 1440, fee);
    } else {
      transactionId = await this.api.message.sendTextMessage(message.message, recipientId, this.user.keys.publicKey, senderKeys.signPrivateKey, 1440, fee);
    }

    // Check to see if existing chat session exists (ios-style), if so, merge it
    this.mergeWithExistingChatSession(message, recipientId);
    return transactionId;
  }

  /**
   * Select options
   *
   * @param options
   */
  selectOptions(options): void {
    this.onOptionsSelected.next(options);
  }

  /**
   * Get contacts
   *
   * @returns {Promise<any>}
   */
  getContacts(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

  /**
   * Get messages
   *
   * @returns {Promise<any>}
   */
  async getMessages(): Promise<any> {

    // TODO: in the future we should allow scrolling to older messages (if > maxNumberMessages)
    const maxNumberMessages = 100;
    const accountId = this.accountService.currentAccount.getValue().account;

    const getConfirmedMessages = this.accountService.getAccountTransactions(
      accountId,
      0, maxNumberMessages,
      0,
      TransactionType.Arbitrary,
      TransactionArbitrarySubtype.Message);

    const getUnconfirmedMessages = this.accountService.getUnconfirmedTransactions(accountId);

    const messages = await Promise.all([getConfirmedMessages, getUnconfirmedMessages]);
    const allMessages =
      messages[1].unconfirmedTransactions.filter((t: Transaction) =>
        t.type === TransactionType.Arbitrary &&
        t.subtype === TransactionArbitrarySubtype.Message
      ).concat(messages[0].transactions);

    return Promise.resolve(allMessages);
  }

  sendNewMessage(recipient): void{
    const message = {
      contactId: convertAddressToNumericId(recipient) || 'new',
      dialog: [],
      senderRS: recipient,
      timestamp: convertDateToBurstTime(new Date()).toString()
    };
    this.messages.push(message);
    this.onMessagesUpdated.next(this.messages);
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
