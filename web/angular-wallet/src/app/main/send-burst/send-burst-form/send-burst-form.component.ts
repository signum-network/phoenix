import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Account, SuggestedFees} from '@burstjs/core';
import {burstAddressPattern, convertNQTStringToNumber} from '@burstjs/util';
import {NgForm} from '@angular/forms';
import {TransactionService} from 'app/main/transactions/transaction.service';
import {NotifierService} from 'angular-notifier';
import {I18nService} from 'app/layout/components/i18n/i18n.service';
import {AccountService} from '../../../setup/account/account.service';
import {MatDialog, MatDialogRef} from '@angular/material';
import {WarnSendDialogComponent} from '../warn-send-dialog/warn-send-dialog.component';
import {
  Recipient,
  RecipientValidationStatus
} from '../../../layout/components/burst-recipient-input/burst-recipient-input.component';
import {StoreService} from '../../../store/store.service';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';


interface QRData {
  recipient: Recipient;
  amountNQT: string;
  feeNQT: string;
  immutable: boolean;
}

const isNotEmpty = (value: string) => value && value.length > 0;

@Component({
  selector: 'app-send-burst-form',
  templateUrl: './send-burst-form.component.html',
  styleUrls: ['./send-burst-form.component.scss']
})
export class SendBurstFormComponent extends UnsubscribeOnDestroy implements OnInit {
  @ViewChild('sendBurstForm') public sendBurstForm: NgForm;
  @ViewChild('amountNQT') public amountNQT: string;
  @ViewChild('message') public message: string;
  @ViewChild('fullHash') public fullHash: string;
  @ViewChild('encrypt') public encrypt: string;
  @ViewChild('pin') public pin: string;

  @Input('account') account: Account;
  @Input('fees') fees: SuggestedFees;

  advanced = false;
  showMessage = false;
  burstAddressPatternRef = burstAddressPattern;
  deadline = '24';
  immutable = false;

  public recipient = new Recipient();
  public feeNQT: string;
  isSending = false;
  language: string;

  constructor(
    private warnDialog: MatDialog,
    private transactionService: TransactionService,
    private accountService: AccountService,
    private notifierService: NotifierService,
    private i18nService: I18nService,
    private storeService: StoreService
  ) {
    super();
    this.storeService.settings
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(async ({language}) => {
          this.language = language;
        }
      );
  }

  ngOnInit(): void {
  }

  getTotal(): number {
    return parseFloat(this.amountNQT) + parseFloat(this.feeNQT) || 0;
  }

  onSubmit(event): void {
    event.stopImmediatePropagation();

    if (this.recipient.status !== RecipientValidationStatus.VALID) {
      const dialogRef = this.openWarningDialog([this.recipient]);
      dialogRef.afterClosed().subscribe(ok => {
        if (ok) {
          this.sendBurst(this.recipient.addressRaw);
        }
      });
    } else {
      this.sendBurst(this.recipient.addressRS);
    }
  }

  async sendBurst(addressRS: string): Promise<void> {

    try {
      this.isSending = true;
      await this.transactionService.sendMoney({
        transaction: {
          amountNQT: this.amountNQT,
          feeNQT: this.feeNQT,
          attachment: this.getMessage(),
          deadline: parseFloat(this.deadline) * 60,
          fullHash: this.fullHash,
          type: 1
        },
        pin: this.pin,
        keys: this.account.keys,
        recipientAddress: addressRS,
      });

      this.notifierService.notify('success', this.i18nService.getTranslation('success_send_money'));
      this.sendBurstForm.resetForm();
    } catch (e) {
      this.notifierService.notify('error', this.i18nService.getTranslation('error_send_money'));
    }
    this.immutable = false;
    this.isSending = false;
  }


  private openWarningDialog(recipients: Array<Recipient>): MatDialogRef<any> {
    return this.warnDialog.open(WarnSendDialogComponent, {
      width: '400px',
      data: recipients
    });
  }

  getMessage(): any {

    if (!this.message) {
      return null;
    }

    return this.encrypt ? {
      data: this.message,
      nonce: null,
      isText: true
    } : {
      message: this.message,
      type: 'message',
      messageIsText: true
    };
  }

  canSubmit(): boolean {
    return isNotEmpty(this.recipient.addressRaw) &&
      isNotEmpty(this.amountNQT) &&
      isNotEmpty(this.pin);
  }

  onRecipientChange(recipient: Recipient): void {
    this.recipient = recipient;
  }

  onQRUpload(qrData: QRData): void {
    this.amountNQT = convertNQTStringToNumber(qrData.amountNQT).toString();
    this.feeNQT = convertNQTStringToNumber(qrData.feeNQT).toString();
    this.immutable = qrData.immutable;
  }

}
