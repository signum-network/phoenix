import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
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
export class TokensComponent implements OnInit {
  public selectedAccount: Account;
  public tokens: TokenData[] = [];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private storeService: StoreService,
    private accountService: AccountService,
    private progressService: FuseProgressBarService,
    private tokenService: TokenService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.storeService.ready.subscribe(async (ready) => {
      if (!ready) {
        return;
      }
      this.selectedAccount = await this.storeService.getSelectedAccount();
      if (this.selectedAccount) {
        this.progressService.show();
        this.tokens = await this.tokenService.fetchAccountTokens(this.selectedAccount);
        this.progressService.hide();
      }
    });
  }
}
