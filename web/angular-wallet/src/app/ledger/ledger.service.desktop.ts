import {Injectable} from '@angular/core';
import Transport from '@ledgerhq/hw-transport';
import { AppService } from 'app/app.service';
// import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';

@Injectable()
export class LedgerService {
  appService: AppService;

  constructor(appService: AppService) {
    this.appService = appService;

    this.appService.onIpcMessage('public-key-received', () => {
      // do something
    });

  }

  public getPublicKey(accountIndex: number): void {
    this.appService.sendIpcMessage('get-public-key', {});
  }
  
}
