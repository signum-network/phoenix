import {Component, Input} from '@angular/core';
import {CreateService} from '../../create.service';
import {Address, AddressPrefix} from '@signumjs/core';
import {
  generateMasterKeys,
  PassPhraseGenerator
} from '@signumjs/crypto';
import {NetworkService} from '../../../../network/network.service';


@Component({
  selector: 'app-account-create-existing',
  styleUrls: ['./existing.component.scss'],
  templateUrl: './existing.component.html'
})
export class AccountCreateExistingComponent {

  @Input('passphrase') passphrase: string;

  passphraseGenerator: PassPhraseGenerator;

  constructor(
    public createService: CreateService,
    private networkService: NetworkService,
  ) {
    this.passphraseGenerator = new PassPhraseGenerator();
  }

  public setPassphraseAndGenerateMasterKeys(phrase: string[]): void {
    const prefix = this.networkService.isMainNet() ? AddressPrefix.MainNet : AddressPrefix.TestNet;
    this.createService.setPassphrase(phrase);
    const keys = generateMasterKeys(this.createService.getCompletePassphrase());
    const address = Address.fromPublicKey(keys.publicKey, prefix);
    this.createService.setId(address.getNumericId());
    this.createService.setAddress(address.getReedSolomonAddress());
    setTimeout(x => {
      this.createService.setStep(1);
    }, 0);
  }

  public setManualPassphrase(phrase: string): void {
    this.setPassphraseAndGenerateMasterKeys(phrase.split(' '));
  }
}
