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
    const keys = generateMasterKeys(this.createService.getCompletePassphrase());
    const id = getAccountIdFromPublicKey(keys.publicKey);
    this.createService.setId(id);
    const address = convertNumericIdToAddress(id);
    this.createService.setAddress(address);
    setTimeout(x => {
      this.createService.setStep(1);
    }, 0);
  }

  public setManualPassphrase(phrase: string): void {
    this.setPassphraseAndGenerateMasterKeys(phrase.split(' '));
  }
}
