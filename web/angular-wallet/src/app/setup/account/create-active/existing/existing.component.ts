import { Component, OnInit } from '@angular/core';
import { CreateService } from '../../create.service';
import { generateMasterKeys, getAccountIdFromPublicKey, getBurstAddressFromAccountId, PassPhraseGenerator } from '@burst/crypto';


@Component({
    selector: 'app-account-create-existing',
    styleUrls: ['./existing.component.scss'],
    templateUrl: './existing.component.html'
})
export class AccountCreateExistingComponent {
    passphraseGenerator: PassPhraseGenerator;

    constructor(private createService: CreateService) { 
        this.passphraseGenerator = new PassPhraseGenerator();
    }

    public setPassphraseAndGenerateMasterKeys(phrase: string[]) {
        this.createService.setPassphrase(phrase);
        generateMasterKeys(this.createService.getCompletePassphrase()).then(keys => {
            getAccountIdFromPublicKey(keys.publicKey).then(id => {
                this.createService.setId(id);
                getBurstAddressFromAccountId(id).then(address => {
                    this.createService.setAddress(address);
                    setTimeout(x => {
                        this.createService.setStepIndex(1);
                    }, 0);
                });
            });
        });
    }

    public setManualPassphrase(phrase: string) {
        return this.setPassphraseAndGenerateMasterKeys(phrase.split(' '));
    }
}
