import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { StoreService } from 'app/store/store.service';
import { NetworkService } from '../network/network.service';
import { LedgerClientFactory } from '@signumjs/core';
import { AccountManagementService } from 'app/shared/services/account-management.service';
import { NodeInfo } from 'app/shared/types';
import { memo } from 'app/util/memo';

async function _fetchNodeInfo(nodeHost: string): Promise<NodeInfo|null> {
  try {
    console.log('fetchNodeInfo', nodeHost);
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
const fetchNodeInfo = memo(_fetchNodeInfo);
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  authorized = false;

  constructor(private storeService: StoreService,
              private accountManagementService: AccountManagementService,
              private networkService: NetworkService,
              private router: Router) {
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

        const nodeInfo = await fetchNodeInfo(settings.node);
        if (!nodeInfo){
          await this.router.navigate(['/settings'], {queryParams: { connectionFail: true }});
          return false;
        }
        this.storeService.setSelectedNode(nodeInfo);

        const selectedAccount = this.accountManagementService.getSelectedAccount();
        const hasAccounts = this.accountManagementService.hasAccounts();
        if (selectedAccount) {
          //await this.accountManagementService.selectAccount(selectedAccount);
          return true;
        } else if (hasAccounts) {
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
