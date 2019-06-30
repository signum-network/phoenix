import {Injectable} from '@angular/core';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import {AppService} from '../app.service';

@Injectable()
export class LedgerService {

  constructor(private appService: AppService) {
  }

  /**
   * @param accountIndex The last entry in the derivation path, which selects which account to use.
   * @return The public key, hex encoded
   */
  public async getPublicKey(accountIndex: number): Promise<string> {
    if (this.appService.isDesktop()) {
      const publicKeyHex: string = this.appService.sendIpcMessageSync('ledger-get-public-key', accountIndex);
      if (publicKeyHex.startsWith('Error: ')) {
        throw new Error(publicKeyHex);
      }
      return publicKeyHex;
    } else {
      const transport = await TransportWebUSB.create();
      // todo: move this to a shared fn
      let accountIndexHex = accountIndex.toString(16);
      if (accountIndexHex.length === 1) {
        accountIndexHex = '0' + accountIndexHex;
      }
      const publicKey: Buffer = await transport.exchange(Buffer.from('800400' + accountIndexHex + '00', 'hex'));
      return publicKey.toString('hex').substr(0, 64);
    }
  }

  public async sign(accountIndex: number, message: string): Promise<string> {
    if (this.appService.isDesktop()) {
      // TODO
    } else {
      // TODO
    }
  }
}
