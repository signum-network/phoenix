import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
// import { Observable } from 'rxjs';
// import { filter, switchMap } from 'rxjs/operators';
// import { StoreService, AccountService } from '../../lib/services';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {

  constructor(
    // private storeService: StoreService,
    // private accountService: AccountService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean> {
    console.log('test');

    this.router.navigate(['/dashboard']);

    return Promise.resolve(true);

    /*
    return this.storeService.ready.pipe(
      filter(Boolean),
      switchMap(async (ready) => {
        const selectedAccount = await this.storeService.getSelectedAccount().catch(() => {});
        const allAccounts = await this.storeService.getAllAccounts().catch(() => {});
        console.log(selectedAccount, allAccounts);
        if (selectedAccount) {
          this.accountService.setCurrentAccount(selectedAccount);
          return true;
        } else if (allAccounts && allAccounts.length) {
          this.router.navigate(['/dashboard/accounts']);
          return false;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
    */
  }
}
