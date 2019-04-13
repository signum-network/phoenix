import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, ViewEncapsulation, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';

import { MessagesService, Messages } from '../messages.service';
import { AccountService } from 'app/setup/account/account.service';
import { Account } from '@burstjs/core';
import { Router } from '@angular/router';
import {
  burstAddressPattern,
  convertAddressToNumericId,
  isValid,
  convertDateToBurstTime,
  convertBurstTimeToDate
} from '@burstjs/util';
import { NotifierService } from 'angular-notifier';
import { UtilService } from 'app/util.service';
import { I18nService } from 'app/layout/components/i18n/i18n.service';
import { decryptAES, hashSHA256, decryptMessage } from '@burstjs/crypto/out/src';

@Component({
    selector: 'message-view',
    templateUrl: './message-view.component.html',
    styleUrls: ['./message-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MessageViewComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input('feeNQT') feeNQT: number;
    @Input('encrypt') encrypt: boolean;

    @ViewChild('pin') pin: string;

    message: Messages;
    replyInput: any;
    pinInput: any;
    selectedUser: Account;
    selectedMessageQRCode: string;
    isNewMessage = false;
    burstAddressPatternRef = burstAddressPattern;

    @ViewChild(FusePerfectScrollbarDirective)
    directiveScroll: FusePerfectScrollbarDirective;

    @ViewChildren('replyInput')
    replyInputField;

    @ViewChild('replyForm')
    replyForm: NgForm;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private messageService: MessagesService,
        private accountService: AccountService,
        private router: Router,
        private notifierService: NotifierService,
        private utilService: UtilService,
        private i18nService: I18nService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {
        this.selectedUser = this.messageService.user;
        this.messageService.onMessageSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(async ({ message, isNewMessage }) => {
                if (message) {
                    this.message = message;
                    this.isNewMessage = isNewMessage;
                    // this.selectedMessageQRCode = await this.getQRCode(messageData.contactId);
                    this.readyToReply();
                }
            });
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        this.replyInput = this.replyInputField.first.nativeElement;
        this.readyToReply();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Decide whether to show or not the contact's avatar in the message row
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    shouldShowContactAvatar(message, i): boolean {
        return (
            message.contactId === this.message.contactId &&
            ((this.message.dialog[i + 1] && this.message.dialog[i + 1].contactId !== this.message.contactId) || !this.message.dialog[i + 1])
        );
    }

    /**
     * Check if the given message is the first message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    isFirstMessageOfGroup(message, i): boolean {
        return (i === 0 || this.message.dialog[i - 1] && this.message.dialog[i - 1].contactId !== message.contactId);
    }

    /**
     * Check if the given message is the last message of a group
     *
     * @param message
     * @param i
     * @returns {boolean}
     */
    isLastMessageOfGroup(message, i): boolean {
        return (i === this.message.dialog.length - 1 || this.message.dialog[i + 1] && this.message.dialog[i + 1].contactId !== message.contactId);
    }

    /**
     * Select contact
     */
    selectContact(): void {
        this.router.navigate(['/account', this.message.contactId]);
    }

    /**
     * Ready to reply
     */
    readyToReply(): void {
        setTimeout(() => {
            this.focusReplyInput();
            this.scrollToBottom();
        });
    }

    /**
     * Focus to the reply input
     */
    focusReplyInput(): void {
        setTimeout(() => {
            this.replyInput.focus();
        });
    }

    /**
     * Scroll to the bottom
     *
     * @param {number} speed
     */
    scrollToBottom(speed?: number): void {
        speed = speed || 400;
        if (this.directiveScroll) {
            this.directiveScroll.update();

            setTimeout(() => {
                this.directiveScroll.scrollToBottom(0, speed);
            });
        }
    }

    /**
     * sendMessage
     */
    async sendMessage(event) {
        event.preventDefault();

        if (!this.replyForm.form.value.message) {
            return;
        }

        if (this.isNewMessage) {
            if (!isValid(this.message.senderRS)) {
                return this.notifierService.notify('error', this.i18nService.getTranslation('error_invalid_account_id'));
            }
            this.message.senderRS = `BURST-${this.message.senderRS}`;
            this.message.contactId = convertAddressToNumericId(this.message.senderRS);
            this.isNewMessage = false;
        }

        // Message
        const message = {
            contactId: this.selectedUser.account,
            message: this.replyForm.form.value.message,
            timestamp: parseInt(convertDateToBurstTime(new Date()).toString())
        };

        try {
            await this.messageService.sendTextMessage(message, this.message.contactId, this.replyForm.form.value.pin, this.feeNQT);
        } catch (e) {
            return this.notifierService.notify('error', 
                this.i18nService.getTranslation(e.message) || 
                this.utilService.translateServerError(e.data || e));
        }

        this.replyForm.reset();
        this.readyToReply();

    }


    public async submitPinPrompt(event) {
        event.stopImmediatePropagation();
        const account = await this.accountService.currentAccount.getValue();
        const sender = await this.accountService.getAccount(this.message.contactId);
        const privateKey = decryptAES(account.keys.agreementPrivateKey, hashSHA256(this.pin));
        this.message.dialog = this.message.dialog.map((message) => {
            // @ts-ignore
            if (message.encryptedMessage) message.message = decryptMessage(message.encryptedMessage, sender.publicKey, privateKey);
            return message;
        })
    }


    getQRCode(id: string): Promise<string> {
        return this.accountService.generateSendTransactionQRCodeAddress(id);
    }

    convertTimestampToDate(timestamp) {
        return convertBurstTimeToDate(timestamp);
    }
}
