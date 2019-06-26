import {Injectable} from '@angular/core';
import {AppService} from '../app.service';
import Transport from '@ledgerhq/hw-transport';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';

@Injectable()
export class LedgerService {

  constructor(private appService: AppService) {
  }

  private async getTransport(): Transport {
    if (this.appService.isDesktop()) {
      return await TransportNodeHid.create();
    } else {
      return await TransportWebUSB.create();
    }
  }

  public async getPublicKey(accountIndex: number): Promise<Buffer> {
    const transport = this.getTransport();
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
