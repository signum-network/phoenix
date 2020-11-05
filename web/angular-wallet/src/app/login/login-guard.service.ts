import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';
import {StoreService} from 'app/store/store.service';
import {AccountService} from 'app/setup/account/account.service';
import {ApiService} from '../api.service';

const errorHandler = console.error;

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  authorized = false;

  constructor(private storeService: StoreService,
              private accountService: AccountService,
              private apiService: ApiService,
              private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.storeService.ready.pipe(
      filter(Boolean),
      switchMap(async () => {
        const settings = await this.storeService.getSettings().catch(errorHandler);
        const selectedAccount = await this.storeService.getSelectedAccount().catch(errorHandler);
        const allAccounts = await this.storeService.getAllAccounts().catch(errorHandler);
        // caches the current nodes api version
        try {
          await this.apiService.fetchBrsApiVersion();
        } catch (e) {
          await this.router.navigate(['/repair']);
          return false;
        }

        // User must agree to disclaimer
        if (!(settings && settings.agree)) {
          await this.router.navigate(['/disclaimer']);
          return false;
        } else if (selectedAccount) {
          this.accountService.setCurrentAccount(selectedAccount);
          return true;
        } else if (allAccounts && allAccounts.length) {
          await this.router.navigate(['/dashboard']);
          return false;
        } else {
          await this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
