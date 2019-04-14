import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
  Input
} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {FusePerfectScrollbarDirective} from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';

import {MessagesService, Messages} from '../messages.service';
import {AccountService} from 'app/setup/account/account.service';
import {Account} from '@burstjs/core';
import {Router} from '@angular/router';
import {
  burstAddressPattern,
  convertAddressToNumericId,
  isValid,
  convertDateToBurstTime,
  convertBurstTimeToDate
} from '@burstjs/util';
import {NotifierService} from 'angular-notifier';
import {UtilService} from 'app/util.service';
import {I18nService} from 'app/layout/components/i18n/i18n.service';
import {decryptAES, hashSHA256, decryptMessage} from '@burstjs/crypto/out/src';

@Component({
  selector: 'message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessageViewComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input('feeNQT') feeNQT: number;
  @Input('encrypt') encrypt: boolean;

  @ViewChild('pin')
  pin: string;
  @ViewChild(FusePerfectScrollbarDirective)
  directiveScroll: FusePerfectScrollbarDirective;
  @ViewChildren('replyInput')
  replyInputField;
  @ViewChild('replyForm')
  replyForm: NgForm;

  message: Messages;
  replyInput: any;
  pinInput: any;
  selectedUser: Account;
  isNewMessage = false;
  burstAddressPatternRef = burstAddressPattern;
  isSending: boolean = false;


  private _unsubscribeAll: Subject<any>;

  constructor(
    private messageService: MessagesService,
    private accountService: AccountService,
    private router: Router,
    private notifierService: NotifierService,
    private utilService: UtilService,
    private i18nService: I18nService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.selectedUser = this.messageService.user;
    this.messageService.onMessageSelected
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async ({message, isNewMessage}) => {
        if (!message) {
          return;
        }
        this.message = message;
        this.isNewMessage = isNewMessage;
        this.readyToReply();
      });
  }

  ngAfterViewInit(): void {
    this.replyInput = this.replyInputField.first.nativeElement;
    this.readyToReply();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  shouldShowContactAvatar(message, i): boolean {
    return (
      message.contactId === this.message.contactId &&
      ((this.message.dialog[i + 1] && this.message.dialog[i + 1].contactId !== this.message.contactId) || !this.message.dialog[i + 1])
    );
  }

  isFirstMessageOfGroup(message, i): boolean {
    return (i === 0 || this.message.dialog[i - 1] && this.message.dialog[i - 1].contactId !== message.contactId);
  }

  isLastMessageOfGroup(message, i): boolean {
    return (i === this.message.dialog.length - 1 || this.message.dialog[i + 1] && this.message.dialog[i + 1].contactId !== message.contactId);
  }

  selectContact(): void {
    this.router.navigate(['/account', this.message.contactId]);
  }

  readyToReply(): void {
    setTimeout(() => {
      this.focusReplyInput();
      this.scrollToBottom();
    });
  }

  focusReplyInput(): void {
    setTimeout(() => {
      this.replyInput.focus();
    });
  }

  scrollToBottom(speed?: number): void {
    if (!this.directiveScroll) {
      return;
    }

    speed = speed || 400;
    this.directiveScroll.update();
    setTimeout(() => {
      this.directiveScroll.scrollToBottom(0, speed);
    });
  }

  async sendMessage(event): Promise<void> {
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

    const message = {
      contactId: this.selectedUser.account,
      message: this.replyForm.form.value.message,
      timestamp: parseInt(convertDateToBurstTime(new Date()).toString(), 10)
    };

    try {
      this.isSending = true;
      await this.messageService.sendTextMessage(message, this.message.contactId, this.replyForm.form.value.pin, this.feeNQT);
      this.replyForm.reset();
      this.readyToReply();
    } catch (e) {
      this.notifierService.notify('error', this.utilService.translateServerError(e.data || e));
    }
    this.isSending = false;
  }


  public async submitPinPrompt(event): Promise<void> {
    event.stopImmediatePropagation();
    const account = await this.accountService.currentAccount.getValue();
    const sender = await this.accountService.getAccount(this.message.contactId);
    const privateKey = decryptAES(account.keys.agreementPrivateKey, hashSHA256(this.pin));
    this.message.dialog = this.message.dialog.map((message) => {
      if (message.encryptedMessage) {
        // @ts-ignore
        message.message = decryptMessage(message.encryptedMessage, sender.publicKey, privateKey);
      }
      return message;
    });
  }


  getQRCode(id: string): Promise<string> {
    return this.accountService.generateSendTransactionQRCodeAddress(id);
  }

  convertTimestampToDate(timestamp): Date {
    return convertBurstTimeToDate(timestamp);
  }

  canSubmitReply(): boolean {
    if (!this.replyForm) {
      return false;
    }
    const {pin, message} = this.replyForm.form.value;
    return (pin && pin.length > 0) &&
      (message && message.length) > 0;
  }
}
