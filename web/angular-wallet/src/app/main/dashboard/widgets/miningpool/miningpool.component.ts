import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {TransactionMiningSubtype, TransactionType } from '@signumjs/core';
import { AccountService } from '../../../../setup/account/account.service';
import { UnsubscribeOnDestroy } from '../../../../util/UnsubscribeOnDestroy';
import { ChainTime } from '@signumjs/util';
import { WalletAccount } from 'app/util/WalletAccount';

@Component({
  selector: 'app-miningpool',
  templateUrl: './miningpool.component.html',
  styleUrls: ['./miningpool.component.scss', '../widget.shared.scss']
})
export class MiningpoolComponent extends UnsubscribeOnDestroy implements OnInit {

  @Input() public account: WalletAccount;

  locale = 'en';
  isLoading = true;
  poolAccount: WalletAccount;
  lastPoolAssignment: Date;
  poolName: string;

  constructor(
    private accountService: AccountService
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    await this.fetchPoolAccount();
    this.isLoading = false;
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes.account) {
      this.fetchPoolAccount();
    }
  }

  private async fetchPoolAccount(): Promise<void> {
    const rewardRecipient = await this.accountService.getRewardRecipient(this.account.account);
    this.poolAccount = rewardRecipient.account !== this.account.account ? rewardRecipient : null;
    if (this.poolAccount) {
      const assignments = await this.accountService.getAccountTransactions({
        accountId: this.account.account,
        type: TransactionType.Mining,
        subtype: TransactionMiningSubtype.RewardRecipientAssignment
      });
      this.lastPoolAssignment = ChainTime.fromChainTimestamp(assignments.transactions[0].timestamp).getDate();
      this.poolName = this.getPoolUrlOrName();
    }
  }


  public getPoolUrlOrName(): string {
    try {
      const poolUrl = this.poolAccount.name.startsWith('http')
        ? this.poolAccount.name
        : 'https://' + this.poolAccount.name;
      // tslint:disable-next-line:no-unused-expression
      new URL(poolUrl);
      return poolUrl;
    } catch (e) {
      return this.poolAccount.name;
    }
  }
}
