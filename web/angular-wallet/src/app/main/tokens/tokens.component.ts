import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StoreService} from 'app/store/store.service';
import {AccountService} from 'app/setup/account/account.service';
import {FuseProgressBarService} from '../../../@fuse/components/progress-bar/progress-bar.service';
import { TokenData, TokenService } from '../../shared/services/token.service';
import { WalletAccount } from 'app/util/WalletAccount';

@Component({
  selector: 'app-tokens',
  styleUrls: ['./tokens.component.scss'],
  templateUrl: './tokens.component.html'
})
export class TokensComponent implements OnInit, OnDestroy {
  public selectedAccount: WalletAccount;
  public tokens: TokenData[] = [];

  intervalHandle = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private accountService: AccountService,
    private progressService: FuseProgressBarService,
    private tokenService: TokenService,
  ) {
  }

  ngOnInit(): void {
    this.storeService.ready$.subscribe(async (ready) => {
      if (!ready) {
        return;
      }
      this.selectedAccount = this.route.snapshot.data.account as WalletAccount;
      if (this.selectedAccount) {
        this.progressService.show();
        this.isLoading = true;
        await this.fetchTokens();
        this.isLoading = false;
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
