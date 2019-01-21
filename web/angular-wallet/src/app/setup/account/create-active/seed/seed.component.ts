import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateService } from '../../create.service';
import { generateMasterKeys, getAccountIdFromPublicKey, getBurstAddressFromAccountId, PassPhraseGenerator } from '@burst/crypto';


@Component({
    selector: 'app-account-create-seed',
    styleUrls: ['./seed.component.scss'],
    templateUrl: './seed.component.html'
})
export class AccountCreateSeedComponent {
    private seedLimit: number = 100;
    private seed: any[] = [];
    private update: boolean = false;
    private progress = 0;
    passphraseGenerator: PassPhraseGenerator;

    constructor(
        private createService: CreateService
    ) { 
        this.passphraseGenerator = new PassPhraseGenerator();
    }

    public movement(e) {
        this.seed.push([e.clientX, e.clientY, new Date()]);
        if (!this.update) {
            this.update = true
            setTimeout(() => {
                this.progress = this.seed.length / this.seedLimit * 100;
                this.update = false;
            }, 100)
        }
        if (this.seed.length >= this.seedLimit) {
            this.passphraseGenerator.generatePassPhrase(this.seed)
                .then(phrase => {
                    this.setPassphraseAndGenerateMasterKeys(phrase);
                });
        }
    }

    public setPassphraseAndGenerateMasterKeys(phrase: string[]) {
        this.createService.setPassphrase(phrase);
        const keys = generateMasterKeys(this.createService.getCompletePassphrase());
        const id = getAccountIdFromPublicKey(keys.publicKey);
        this.createService.setId(id);
        const address = getBurstAddressFromAccountId(id);
        this.createService.setAddress(address);
        this.seed = [];
        setTimeout(x => {
            this.createService.setStepIndex(1);
        }, 0);
    }
}
