import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StoreService} from 'app/store/store.service';
import {AccountService} from 'app/setup/account/account.service';
import {Account} from '@signumjs/core';
import {TokenService, TokenData} from './token.service';
import {FuseProgressBarService} from '../../../@fuse/components/progress-bar/progress-bar.service';

@Component({
  selector: 'app-tokens',
  styleUrls: ['./tokens.component.scss'],
  templateUrl: './tokens.component.html'
})
export class TokensComponent implements OnInit, OnDestroy {
  public selectedAccount: Account;
  public tokens: TokenData[] = [];

  intervalHandle = null;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private accountService: AccountService,
    private progressService: FuseProgressBarService,
    private tokenService: TokenService,
  ) {
  }

  ngOnInit(): void {
    this.storeService.ready.subscribe(async (ready) => {
      if (!ready) {
        return;
      }
      this.selectedAccount = this.route.snapshot.data.account as Account;
      if (this.selectedAccount) {
        this.progressService.show();
        await this.fetchTokens();
        this.progressService.hide();
      }
      this.intervalHandle = setInterval(() => {
        this.fetchTokens();
      }, 60 * 1000);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalHandle);
  }

  async fetchTokens(): Promise<void> {
    this.tokens = await this.tokenService.fetchAccountTokens(this.selectedAccount);
  }

}
