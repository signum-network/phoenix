import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { StoreService } from 'app/store/store.service';
import { AccountService } from 'app/setup/account/account.service';
import { NetworkService } from '../network/network.service';
import { LedgerClientFactory } from '@signumjs/core';
import { AccountManagementService } from '../shared/services/account-management.service';
import { NodeInfo } from "../shared/types";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  authorized = false;

  constructor(private storeService: StoreService,
              private accountService: AccountManagementService,
              private networkService: NetworkService,
              private router: Router) {
  }

  private async fetchNodeInfo(nodeHost: string): Promise<NodeInfo|null> {
    try {
      const ledger = LedgerClientFactory.createClient({ nodeHost });
      const info = await ledger.network.getNetworkInfo();
      // all fine - could
      return {
        nodeUrl: nodeHost,
        networkName: info.networkName,
        addressPrefix: info.addressPrefix,
      };
    } catch (e) {
      console.warn('Cannot reach node: ', nodeHost);
      return null;
    }
  }

  canActivate(): Observable<boolean> {
    return this.storeService.ready$.pipe(
      filter(Boolean),
      switchMap(async () => {
        const settings = this.storeService.getSettings();

        // User must agree to disclaimer
        if (!(settings && settings.agree)) {
          await this.router.navigate(['/disclaimer']);
          return false;
        }

        const nodeInfo = await this.fetchNodeInfo(settings.node);
        if (!nodeInfo){
          await this.router.navigate(['/settings'], {queryParams: { connectionFail: true }});
          return false;
        }
        this.storeService.setSelectedNode(nodeInfo, true);

        const selectedAccount = this.storeService.getSelectedAccount();
        const allAccounts = this.storeService.getAllAccountsDistinct();
        if (selectedAccount) {
          await this.accountService.selectAccount(selectedAccount);
          return true;
        } else if (allAccounts.length) {
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
