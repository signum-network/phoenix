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
        const keys = generateMasterKeys(this.createService.getCompletePassphrase());
        const id = getAccountIdFromPublicKey(keys.publicKey);
        this.createService.setId(id);
        const address = getBurstAddressFromAccountId(id);
        this.createService.setAddress(address);
        setTimeout(x => {
            this.createService.setStepIndex(1);
        }, 0);
    }

    public setManualPassphrase(phrase: string) {
        return this.setPassphraseAndGenerateMasterKeys(phrase.split(' '));
    }
}
