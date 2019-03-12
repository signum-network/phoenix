import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Account, Api, SuggestedFees } from '@burstjs/core';
import { AccountService } from 'app/setup/account/account.service';
import { decryptAES, hashSHA256} from '@burstjs/crypto';
import { NetworkService } from 'app/network/network.service';
import { convertDateToBurstTime, convertAddressToNumericId } from '@burstjs/util';
import {ApiService} from '../../api.service';

export interface ChatMessage {
    message: string;
    timestamp: number;
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

@Injectable({
    providedIn: 'root'
})
export class MessagesService implements Resolve<any>
{

    private api: Api;
    contacts: Account[] = [];
    messages: Messages[] = [];
    user: any;
    onMessageSelected: BehaviorSubject<any>;
    onOptionsSelected: BehaviorSubject<any>;
    onMessagesUpdated: Subject<any>;
    onUserUpdated: Subject<any>;
    onLeftSidenavViewChanged: Subject<any>;
    onRightSidenavViewChanged: Subject<any>;

    constructor(private accountService: AccountService,
                private networkService: NetworkService,
                apiService: ApiService,
                ) {
        this.api = apiService.api;
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
            try {
                this.user = await this.accountService.currentAccount.getValue();

                const fees = await this.networkService.suggestFee();
                this.selectOptions({
                    fees: fees,
                    encrypted: false
                })

                const messages = await this.getMessages();
                this.messages = messages.transactions && messages.transactions.reduce((acc, val) => {
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
            }
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
     * @param {string} recipientRS the recipient address
     * @param {string} pin the user's pin
     * @param {number} fee the fee to pay
     * @returns {ChatMessage}
     */
    public sendTextMessage(message: ChatMessage, recipientRS: string, pin: string, fee: number) {
        // Check to see if existing chat session exists (ios-style), if so, merge it
        this.mergeWithExistingChatSession(message, recipientRS);
        const senderPrivateKey = decryptAES(this.user.keys.signPrivateKey, hashSHA256(pin));
        return this.api.message.sendTextMessage(message.message, recipientRS, this.user.keys.publicKey, senderPrivateKey, fee);
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
    getMessages(): Promise<any> {
        return this.accountService.getAccountTransactions(this.accountService.currentAccount.getValue().account, 0, 74, 0, 1, 0);
    }

    sendNewMessage(recipient) {
        const message = {
            contactId: convertAddressToNumericId(recipient) || 'new',
            dialog: [],
            senderRS: recipient,
            timestamp: convertDateToBurstTime(new Date()).toString()
        }
        this.messages.push(message);
        this.onMessagesUpdated.next(this.messages);
        return this.getMessage(message, true);
    }

    /**
     * iOS-style feature that merges an existing chat session.
     * Covers the unlikely edge case where user searches for an address, modifies it, and then sends the msg.
     * @param message unsigned, unverified message to be added to the screen for immediate user satisfaction
     * @param recipientRS the recipient to scan for
     */
    mergeWithExistingChatSession(message: ChatMessage, recipientRS: string) {
        const existingMessage = this.messages.find((existingMessage) => {
            return (existingMessage.contactId === recipientRS);
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
