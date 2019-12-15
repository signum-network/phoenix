import {Component} from '@angular/core';
import {CreateService, StepsEnum} from '../../create.service';
import {convertNumericIdToAddress} from '@burstjs/util';
import {generateMasterKeys, getAccountIdFromPublicKey, PassPhraseGenerator} from '@burstjs/crypto';


@Component({
  selector: 'app-account-create-seed',
  styleUrls: ['./seed.component.scss'],
  templateUrl: './seed.component.html'
})
export class AccountCreateSeedComponent {
  private seedLimit = 100;
  private seed: any[] = [];
  private update = false;
  public progress = 0;
  passphraseGenerator: PassPhraseGenerator;

  constructor(
    private createService: CreateService
  ) {
    this.passphraseGenerator = new PassPhraseGenerator();
  }

  public movement(e): void {
    this.seed.push([e.clientX, e.clientY, new Date()]);
    if (!this.update) {
      this.update = true;
      setTimeout(() => {
        this.progress = this.seed.length / this.seedLimit * 100;
        this.update = false;
      }, 100);
    }
    if (this.seed.length >= this.seedLimit) {
      this.passphraseGenerator.generatePassPhrase(this.seed)
        .then(phrase => {
          this.setPassphraseAndGenerateMasterKeys(phrase);
        });
    }
  }

  public setPassphraseAndGenerateMasterKeys(phrase: string[]): void {
    this.createService.setPassphrase(phrase);
    const keys = generateMasterKeys(this.createService.getCompletePassphrase());
    const id = getAccountIdFromPublicKey(keys.publicKey);
    this.createService.setId(id);
    const address = convertNumericIdToAddress(id);
    this.createService.setAddress(address);
    this.seed = [];
    setTimeout(x => {
      this.createService.setStep(StepsEnum.Record);
    }, 0);
  }
}
