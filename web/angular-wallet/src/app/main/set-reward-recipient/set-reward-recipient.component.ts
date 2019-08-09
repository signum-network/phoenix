import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SuggestedFees, Account } from '@burstjs/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'app/setup/account/account.service';
import { NotifierService } from 'angular-notifier';
import { I18nService } from 'app/layout/components/i18n/i18n.service';
import { Recipient } from 'app/layout/components/burst-recipient-input/burst-recipient-input.component';
import { burstAddressPattern } from 'app/util/burstAddressPattern';

@Component({
  selector: 'app-set-reward-recipient',
  templateUrl: './set-reward-recipient.component.html',
  styleUrls: ['./set-reward-recipient.component.scss']
})
export class SetRewardRecipientComponent implements OnInit {
  @ViewChild('setRewardRecipientForm', { static: false }) public setRewardRecipientForm: NgForm;
  public feeNQT: string;
  @ViewChild('recipient', { static: false }) public recipient: Recipient;
  @ViewChild('fullHash', { static: false }) public fullHash: string;
  @ViewChild('pin', { static: false }) public pin: string;

  @Output() submit = new EventEmitter<any>();
  advanced: boolean = false;
  showMessage: boolean = false;
  burstAddressPatternRef = burstAddressPattern;
  deadline = '24';

  account: Account;
  fees: SuggestedFees;

  constructor(private route: ActivatedRoute,
    private accountService: AccountService,
    private notifierService: NotifierService,
    private i18nService: I18nService) {
  }

  ngOnInit() {
    this.account = this.route.snapshot.data.account as Account;
    this.fees = this.route.snapshot.data.suggestedFees as SuggestedFees;
  }

  async onSubmit(event) {
    event.stopImmediatePropagation();
    try {
      await this.accountService.setRewardRecipient({
        recipient: this.recipient.addressRS,
        feeNQT: this.feeNQT,
        deadline: parseFloat(this.deadline) * 60,
        pin: this.pin,
        keys: this.account.keys,
      });
      this.notifierService.notify('success', this.i18nService.getTranslation('success_set_reward_recipient'));
      this.setRewardRecipientForm.resetForm();
    } catch (e) {
      this.notifierService.notify('error', e.message || this.i18nService.getTranslation('error_set_reward_recipient'));
    }
  }

  onRecipientChange(recipient: Recipient): void {
    this.recipient = recipient;
  }
}
