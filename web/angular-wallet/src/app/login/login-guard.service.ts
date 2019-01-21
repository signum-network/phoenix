import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { StoreService } from 'app/store/store.service';
import { AccountService } from 'app/setup/account/account.service';

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
        const selectedAccount = await this.storeService.getSelectedAccount().catch(() => {console.log('something bad')});
        const allAccounts = await this.storeService.getAllAccounts().catch(() => {console.log('something bad2')});
        console.log(selectedAccount, allAccounts);
        if (selectedAccount) {
          this.accountService.setCurrentAccount(selectedAccount);
          return true;
        } else if (allAccounts && allAccounts.length) {
          this.router.navigate(['/dashboard/accounts'])
          return false;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    )
  }
}
