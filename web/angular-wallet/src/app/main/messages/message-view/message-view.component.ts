import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
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

@Component({
    selector: 'message-view',
    templateUrl: './message-view.component.html',
    styleUrls: ['./message-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MessageViewComponent implements OnInit, OnDestroy, AfterViewInit {
    message: Messages;
    replyInput: any;
    pinInput: any;
    fee = 0.01; // todo: allow user to configure
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
        private router: Router
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
    sendMessage(event): void {
        event.preventDefault();

        if (!this.replyForm.form.value.message) {
            return;
        }

        if (this.isNewMessage) {
            if (!isValid(this.message.senderRS)) {
                return; // todo: show user invalid address warning
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

        // Update the server
        this.messageService.sendTextMessage(message, this.message.contactId, this.replyForm.form.value.pin, this.fee).then(response => {

            // Reset the reply form
            this.replyForm.reset();

            this.readyToReply();
        });
    }

    getQRCode(id: string): Promise<string> {
        return this.accountService.generateSendTransactionQRCodeAddress(id);
    }

    convertTimestampToDate(timestamp) {
        return convertBurstTimeToDate(timestamp);
    }
}
