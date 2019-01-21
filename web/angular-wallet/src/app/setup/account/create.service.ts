import { Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable()
export class CreateService {
    private passphrase: string[];
    private pin: string;
    private id: string;
    private address: string;
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
        return this.passphrase.join(" ");
    }

    public setId(id: string) {
        this.id = id;
    }

    public getId(id: string) {
        return this.id;
    }

    public setAddress(address: string) {
        this.address = address;
    }

    public getAddress() : string {
        return this.address;
    }

    public setStepIndex(index: number) {
        this.stepIndex = index;
    }

    public getStepIndex() : number {
        return this.stepIndex;
    }

    public isPassphraseGenerated() : boolean {
        return this.passphrase.length > 0 && this.address != undefined && this.id != undefined
    }

    public createActiveAccount() {
        return this.accountService.createActiveAccount({ passphrase: this.getCompletePassphrase(), pin: this.pin });
    }

    public createPassiveAccount() {
        return this.accountService.createOfflineAccount(`BURST-${this.address}`);
    }

    public reset() {
        this.passphrase = [];
        this.id = undefined;
        this.address = undefined;
    }
}
