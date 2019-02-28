import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Account, Api, ApiSettings, composeApi, SuggestedFees } from '@burstjs/core';
import { AccountService } from 'app/setup/account/account.service';
import { environment } from 'environments/environment';
import { decryptAES, hashSHA256, Converter } from '@burstjs/crypto/out/src';
import { NetworkService } from 'app/network/network.service';
import { convertAddressToNumericId } from '@burstjs/util/out';

export interface ChatMessage {
    message: string;
    timestamp: string;
    contactId: string;
}

export interface Messages {
    dialog: ChatMessage[];
    contactId: string;
    senderRS: string;
    timestamp: string;
}

export interface MessageOptions {
    fees: SuggestedFees;
    encrypt: boolean;
}

@Injectable()
export class MessagesService implements Resolve<any>
{

    private api: Api;
    contacts: Account[] = [];
    messages: Messages[];
    user: any;
    onMessageSelected: BehaviorSubject<any>;
    onOptionsSelected: BehaviorSubject<any>;
    onMessagesUpdated: Subject<any>;
    onUserUpdated: Subject<any>;
    onLeftSidenavViewChanged: Subject<any>;
    onRightSidenavViewChanged: Subject<any>;

    constructor(private accountService: AccountService, private networkService: NetworkService) {
        const apiSettings = new ApiSettings(environment.defaultNode, 'burst');
        this.api = composeApi(apiSettings);
        this.onMessageSelected = new BehaviorSubject({});
        this.onOptionsSelected = new BehaviorSubject({});
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

            const messages = await this.getMessages();

            this.user = await this.accountService.currentAccount.getValue();

            this.messages = messages.transactions.reduce((acc, val) => {
                const isSentMessage = this.user.id === val.sender;
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
            const fees = await this.networkService.suggestFee();
            this.selectOptions({
                fees: fees,
                encrypted: false
            })
            resolve();
        });
    }

    getMessage(message, isNewMessage?:boolean) {
        this.onMessageSelected.next({message, isNewMessage});
    }

    /**
     * Send message then update the dialog
     *
     * @param messageId
     * @param {ChatMessage} message the message to send
     * @param {string} pin the user's pin
     * @param {number} fee the fee to pay
     * @returns {ChatMessage}
     */
    public sendTextMessage(message: ChatMessage, pin: string, fee: number) {
        // Check to see if existing chat session exists (ios-style), if so, merge it
        this.mergeWithExistingChatSession(message);
        const senderPrivateKey = decryptAES(this.user.keys.signPrivateKey, hashSHA256(pin));
        return this.api.message.sendTextMessage(message.message, message.contactId, this.user.keys.publicKey, senderPrivateKey, fee)
            .catch((err) => {
                throw new Error(`There was a problem sending your message.`);
            });
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
            resolve(['1234']);
        });
    }

    /**
     * Get messages
     *
     * @returns {Promise<any>}
     */
    getMessages(): Promise<any> {
        return this.accountService.getAccountTransactions(this.accountService.currentAccount.getValue().id, 0, 74, 0, 1, 0);
    }

    sendNewMessage(recipient) {
        const message = {
            contactId: convertAddressToNumericId(recipient) || 'new',
            dialog: [],
            senderRS: recipient,
            timestamp: Converter.convertDateToTimestamp().toString()
        }
        this.messages.push(message);
        this.onMessagesUpdated.next(this.messages);
        return this.getMessage(message, true);
    }

    /**
     * iOS-style feature that merges an existing chat session.
     * Covers the unlikely edge case where user searches for an address, modifies it, and then sends the msg.
     * @param message unsigned, unverified message to be added to the screen for immediate user satisfaction
     */
    mergeWithExistingChatSession(message) {
        const existingMessage = this.messages.find((existingMessage) => {
            return (existingMessage.contactId === message.contactId);
        });
        if (existingMessage) {
            existingMessage.dialog.push(message);
            this.messages = this.messages.filter((msg) => {
                return msg.dialog[0] != message;
            })
            this.onMessagesUpdated.next(this.messages);
            return this.getMessage(existingMessage);
        }
    }
}
