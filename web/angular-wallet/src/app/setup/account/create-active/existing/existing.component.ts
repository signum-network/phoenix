import {Component, Input, OnInit} from '@angular/core';
import {CreateService} from '../../create.service';
import {convertNumericIdToAddress} from '@burstjs/util';
import {
  generateMasterKeys,
  getAccountIdFromPublicKey,
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
    const {publicKey} = generateMasterKeys(this.createService.getCompletePassphrase());
    const id = getAccountIdFromPublicKey(publicKey);
    const address = convertNumericIdToAddress(id);
    this.createService.setId(id);
    this.createService.setPublicKey(publicKey);
    this.createService.setAddress(address);
    setTimeout(x => {
      this.createService.setStepIndex(1);
    }, 0);
  }

  public setManualPassphrase(phrase: string): void {
    return this.setPassphraseAndGenerateMasterKeys(phrase.split(' '));
  }
}
