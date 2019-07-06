import {Injectable} from '@angular/core';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import {AppService} from '../app.service';

@Injectable()
export class LedgerService {

  constructor(private appService: AppService) { // TODO close transports after using them
  }
  
  private byteToHex(byte: number): string {
    if (byte > 255 || byte < 0) {
      throw new Error('Byte out of bounds');
    }
    let accountIndexHex = byte.toString(16);
    if (accountIndexHex.length === 1) {
      accountIndexHex = '0' + accountIndexHex;
    }
    return accountIndexHex;
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
      const publicKey: Buffer = await transport.exchange(Buffer.from('800400' + this.byteToHex(accountIndex) + '00', 'hex'));
      return publicKey.toString('hex').substr(0, 64);
    }
  }

  public async sign(accountIndex: number, message: string): Promise<string> {
    if (this.appService.isDesktop()) {
      const signature: string = this.appService.sendIpcMessageSync('ledger-sign', {accountIndex, message});
      if (signature.startsWith('Error: ')) {
        throw new Error(signature);
      }
      return signature;
    } else {
      const transport = await TransportWebUSB.create();
      let offset = 0;
      while (offset !== message.length) {
        let chunk: string;
        if (message.length - offset > 510) {
          chunk = message.substr(offset, 510);
        } else {
          chunk = message.substr(offset);
        }
        let apdu = '8002';
        const final = (offset + chunk.length) === message.length;
        apdu += final ? '80' : '00';
        apdu += this.byteToHex(accountIndex);
        apdu += this.byteToHex(chunk.length / 2);
        apdu += chunk;
        offset += chunk.length;
        const result: Buffer = await transport.exchange(Buffer.from(apdu, 'hex'));
        if (final) {
          return result.toString('hex').substr(0, 128);
        }
      }
      // Should never reach here
      throw new Error('Never delivered final chunk');
    }
  }
}
