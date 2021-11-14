import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Account, Address, SuggestedFees, TransactionMiningSubtype, TransactionType } from '@signumjs/core';
import { Amount } from '@signumjs/util';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'app/setup/account/account.service';
import { NotifierService } from 'angular-notifier';
import { I18nService } from 'app/layout/components/i18n/i18n.service';
import { Recipient, RecipientValidationStatus } from 'app/components/recipient-input/recipient-input.component';
import { isKeyDecryptionError } from '../../util/exceptions/isKeyDecryptionError';

@Component({
  selector: 'app-set-reward-recipient',
  templateUrl: './set-reward-recipient.component.html',
  styleUrls: ['./set-reward-recipient.component.scss']
})
export class SetRewardRecipientComponent implements OnInit {
  @ViewChild('setRewardRecipientForm', {static: false}) public setRewardRecipientForm: NgForm;
  public fee: string;
  @ViewChild('recipient', {static: false}) public recipient: Recipient;
  @ViewChild('pin', {static: false}) public pin: string;

  @Output() submit = new EventEmitter<any>();
  showMessage = false;
  isSending = false;
  account: Account;
  isLoadingRewardRecipient = true;
  rewardRecipient: Account;
  type = TransactionType.Mining;
  subtype = TransactionMiningSubtype.RewardRecipientAssignment;

  constructor(private route: ActivatedRoute,
              private accountService: AccountService,
              private notifierService: NotifierService,
              private i18nService: I18nService) {
  }

  ngOnInit(): void {
    this.account = this.route.snapshot.data.account as Account;
    this.pin = '';
    this.recipient = new Recipient();
    this.fetchRewardRecipient();
  }

  async fetchRewardRecipient(): Promise<void> {
    this.rewardRecipient = await this.accountService.getRewardRecipient(this.account.account);
    this.isLoadingRewardRecipient = false;
  }

  async onSubmit(event): Promise<void> {
    event.stopImmediatePropagation();
    this.isSending = true;
    try {
      await this.accountService.setRewardRecipient({
        recipientId: Address.fromReedSolomonAddress(this.recipient.addressRS).getNumericId(),
        feePlanck: Amount.fromSigna(this.fee).getPlanck(),
        deadline: 1440,
        pin: this.pin,
        keys: this.account.keys,
      });
      this.notifierService.notify('success', this.i18nService.getTranslation('success_set_reward_recipient'));
      this.setRewardRecipientForm.resetForm();
    } catch (e) {
      if (isKeyDecryptionError(e)) {
        this.notifierService.notify('error', this.i18nService.getTranslation('wrong_pin'));
      } else {
        this.notifierService.notify('error', e.message || this.i18nService.getTranslation('error_set_reward_recipient'));
      }
    } finally {
      this.isSending = false;
    }
  }

  onRecipientChange(recipient: Recipient): void {
    this.recipient = recipient;
  }

  canSubmit(): boolean {
    return this.pin
      && this.recipient.status === RecipientValidationStatus.VALID;
  }

  setPin(pin: string): void {
    this.pin = pin;
  }
}
