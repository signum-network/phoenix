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
import { AppService } from "../app.service";

async function _fetchNodeInfo(nodeHost: string): Promise<NodeInfo|null> {
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
const fetchNodeInfo = memo(_fetchNodeInfo);
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  authorized = false;

  constructor(private storeService: StoreService,
              private accountManagementService: AccountManagementService,
              private networkService: NetworkService,
              private appService: AppService,
              private router: Router) {
  }


  canActivate(): Observable<boolean> {
    return this.storeService.ready$.pipe(
      filter(Boolean),
      switchMap(async () => {
        const settings = this.storeService.getSettings();

        // User must agree to disclaimer
        if (!settings.agree) {
          await this.router.navigate(['/disclaimer']);
          return false;
        }

        if (!this.appService.isDesktop() && settings.node === '__origin__'){
          settings.node = window.location.origin;
        }

        const nodeInfo = await fetchNodeInfo(settings.node);
        if (!nodeInfo){
          await this.router.navigate(['/settings'], {queryParams: { connectionFail: true }});
          return false;
        }
        this.storeService.setSelectedNode(nodeInfo);
        if (this.accountManagementService.getSelectedAccount()) {
          return true;
        }

        if(!this.accountManagementService.hasAccounts()){
          await this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
