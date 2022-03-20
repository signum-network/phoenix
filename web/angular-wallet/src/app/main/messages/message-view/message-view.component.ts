import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { Account, Address, AddressPrefix, TransactionArbitrarySubtype, TransactionType } from "@signumjs/core";
import {ChainTime} from '@signumjs/util';
import {decryptAES, decryptMessage, hashSHA256} from '@signumjs/crypto';
import {Router} from '@angular/router';
import {FusePerfectScrollbarDirective} from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import {Messages, MessagesService} from '../messages.service';
import {AccountService} from 'app/setup/account/account.service';
import {NotifierService} from 'angular-notifier';
import {UtilService} from 'app/util.service';
import {I18nService} from 'app/layout/components/i18n/i18n.service';
import {AddressPattern} from 'app/util/addressPattern';
import {isKeyDecryptionError} from '../../../util/exceptions/isKeyDecryptionError';
import {NetworkService} from '../../../network/network.service';
import { FeeRegimeService } from "../../../components/fee-input/fee-regime.service";

@Component({
  selector: 'message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessageViewComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() feeSigna: number;
  @Input() encrypt: boolean;

  @ViewChild('pin', {static: false})
  pin: string;
  @ViewChild(FusePerfectScrollbarDirective, {static: true})
  directiveScroll: FusePerfectScrollbarDirective;
  @ViewChildren('replyInput')
  replyInputField;
  @ViewChild('replyForm', {static: false})
  replyForm: NgForm;

  addressPrefix = AddressPrefix.MainNet;
  message: Messages;
  replyInput: any;
  pinInput: any;
  selectedUser: Account;
  isNewMessage = false;
  addressPatternRef = AddressPattern;
  isSending = false;
  showPin = [];

  private _unsubscribeAll: Subject<any>;

  constructor(
    private messageService: MessagesService,
    private accountService: AccountService,
    private router: Router,
    private notifierService: NotifierService,
    private utilService: UtilService,
    private i18nService: I18nService,
    private networkService: NetworkService,
    private feeRegimeService: FeeRegimeService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.encrypt = false;
    this.addressPrefix = this.networkService.isMainNet() ? AddressPrefix.MainNet : AddressPrefix.TestNet;
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

    this.messageService.onMessagesUpdated
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((messages) => {
        messages.map((message) => {
          if (message.contactId === this.message.contactId) {
            this.message = message;
            this.scrollToBottom();
          }
        });
      });
  }

  ngAfterViewInit(): void {
    this.replyInput = this.replyInputField.first.nativeElement;
    this.readyToReply();
  }

  ngOnDestroy(): void {
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
      try {
        this.message.senderRS = `${this.addressPrefix}-${this.message.senderRS}`;
        this.message.contactId = Address.fromReedSolomonAddress(this.message.senderRS).getNumericId();
        this.isNewMessage = false;
      } catch (e) {
        // TODO: i1n8
        return this.notifierService.notify('error', e);
      }
    }

    const message = {
      contactId: this.selectedUser.account,
      message: this.replyForm.form.value.message,
      timestamp: ChainTime.fromDate(new Date()).getChainTimestamp()
    };

    try {
      this.isSending = true;
      await this.messageService.sendTextMessage(
        message,
        this.encrypt,
        this.message.contactId,
        this.replyForm.form.value.pin,
        this.feeSigna);
      this.replyForm.reset();
      this.readyToReply();
    } catch (e) {
      if (isKeyDecryptionError(e)) {
        this.notifierService.notify('error', this.i18nService.getTranslation('wrong_pin'));
      } else {
        this.notifierService.notify('error', this.utilService.translateServerError(e.data || e));
      }
    }
    this.isSending = false;
  }


  public async submitPinPrompt(event): Promise<void> {
    event.stopImmediatePropagation();
    const account = await this.accountService.currentAccount$.getValue();
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
    return ChainTime.fromChainTimestamp(timestamp).getDate();
  }

  canSubmitReply(): boolean {
    if (!this.replyForm) {
      return false;
    }
    const {pin, message} = this.replyForm.form.value;
    return (pin && pin.length > 0) &&
      (message && message.length) > 0;
  }

  getIconStyle(): string {
    return this.encrypt ? 'green-300-fg' : 'warn-300-fg';
  }

  onMessageChange(msg: string): void {
    const length = this.encrypt ? msg.length + 48 : msg.length;
    const fee = this.feeRegimeService.calculateFeeByPayload(TransactionType.Arbitrary, TransactionArbitrarySubtype.Message, length);
    this.feeSigna = parseFloat(fee.getSigna());
  }
}
