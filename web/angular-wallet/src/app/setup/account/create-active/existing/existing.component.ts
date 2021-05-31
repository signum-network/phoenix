import {Component, Input} from '@angular/core';
import {CreateService} from '../../create.service';
import {Address} from '@burstjs/core';
import {
  generateMasterKeys,
  PassPhraseGenerator
} from '@burstjs/crypto';


@Component({
  selector: 'app-account-create-existing',
  styleUrls: ['./existing.component.scss'],
  templateUrl: './existing.component.html'
})
export class AccountCreateExistingComponent {

  @Input('passphrase') passphrase: string;

  passphraseGenerator: PassPhraseGenerator;

  constructor(public createService: CreateService) {
    this.passphraseGenerator = new PassPhraseGenerator();
  }

  public setPassphraseAndGenerateMasterKeys(phrase: string[]): void {
    this.createService.setPassphrase(phrase);
    const keys = generateMasterKeys(this.createService.getCompletePassphrase());
    const address = Address.fromPublicKey(keys.publicKey);
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
