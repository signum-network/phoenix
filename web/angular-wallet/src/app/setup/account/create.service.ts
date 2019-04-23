import { Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable()
export class CreateService {
    private passphrase: string[];
    private pin: string;
    private account: string;
    private accountRS: string;
    private stepIndex: number;

    constructor(private accountService: AccountService) {
        this.stepIndex = 0;
        this.reset();
    }

    public setPassphrase(passphrase: string[]) {
        this.passphrase = passphrase;
    }

    public getPassphrase(): string[] {
        return this.passphrase;
    }

    public setPin(pin: string) {
        this.pin = pin;
    }

    public getPin(): string {
        return this.pin;
    }

    public getPassphrasePart(index: number): string {
        return this.passphrase[index];
    }

    public getCompletePassphrase(): string {
        return this.passphrase.join(' ');
    }

    public setId(account: string) {
        this.account = account;
    }

    public getId() {
        return this.account;
    }

    public setAddress(address: string) {
        this.accountRS = address;
    }

    public getAddress(): string {
        return this.accountRS;
    }

    public setStepIndex(index: number) {
        this.stepIndex = index;
    }

    public getStepIndex(): number {
        return this.stepIndex;
    }

    public isPassphraseGenerated(): boolean {
        return this.passphrase.length > 0 &&
          this.accountRS !== undefined &&
          this.account !== undefined;
    }

    public createActiveAccount() {
        return this.accountService.createActiveAccount({ passphrase: this.getCompletePassphrase(), pin: this.pin });
    }

    public createPassiveAccount() {
        return this.accountService.createOfflineAccount(`BURST-${this.accountRS}`);
    }

    public reset() {
        this.setStepIndex(0);
        this.passphrase = [];
        this.account = undefined;
        this.accountRS = undefined;
    }
}
