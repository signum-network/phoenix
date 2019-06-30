import {Injectable} from '@angular/core';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import {AppService} from '../app.service';

@Injectable()
export class LedgerService {

  constructor(private appService: AppService) {
  }

  public async getPublicKey(accountIndex: number): Promise<Buffer> {
    if (this.appService.isDesktop()) {
      console.log('Desktop!');
      const publicKeyHex = this.appService.sendIpcMessageSync('ledger-get-public-key', accountIndex);
      if (publicKeyHex.startsWith('Error: ')) {
        throw new Error(publicKeyHex);
      }
      console.log('received public key', publicKeyHex); // TODO
      return Buffer.from(publicKeyHex, 'hex');
    } else {
      const transport = await TransportWebUSB.create();
      let accountIndexHex = accountIndex.toString(16);
      if (accountIndexHex.length === 1) {
        accountIndexHex = '0' + accountIndexHex;
      }
      console.log('accountIndexHex', accountIndexHex); // TODO
      const publicKey = await transport.exchange(Buffer.from('800400' + accountIndexHex + '00', 'hex'));
      console.log('publicKey', publicKey); // TODO
      return publicKey;
    }
  }
}
