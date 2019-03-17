import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { StoreService } from 'app/store/store.service';
import { AccountService } from 'app/setup/account/account.service';
import { Settings } from 'app/settings';

@Injectable({
  providedIn: 'root',
})

export class LoginGuard implements CanActivate {
  authorized: boolean = false;
  constructor(private storeService: StoreService,
              private accountService: AccountService,
              private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.storeService.ready.pipe(
      filter(Boolean),
      switchMap(async (ready) => {
        const settings = await this.storeService.getSettings().catch(() => {});
        const selectedAccount = await this.storeService.getSelectedAccount().catch(() => {});
        const allAccounts = await this.storeService.getAllAccounts().catch(() => {});
        // User must agree to disclaimer
        if (!(settings && settings.agree)) {
          this.router.navigate(['/disclaimer']);
          return false;
        } else if (selectedAccount) {
          this.accountService.setCurrentAccount(selectedAccount);
          return true;
        } else if (allAccounts && allAccounts.length) {
          this.router.navigate(['/dashboard']);
          return false;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    )
  }
}
