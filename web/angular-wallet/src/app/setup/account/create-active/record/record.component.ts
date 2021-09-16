import {Component} from '@angular/core';
import {CreateService, StepsEnum} from '../../create.service';

@Component({
    selector: 'app-account-create-record',
    styleUrls: ['./record.component.scss'],
    templateUrl: './record.component.html'
})
export class AccountCreateRecordComponent {
    addressId = '';
    address = '';

    constructor(
        public createService: CreateService,
    ) { }


    public reset(): void {
        this.createService.reset();
    }

    public next(): void {
        this.createService.setStep(StepsEnum.DefinePin);
    }

    public copy(): void {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.createService.getCompletePassphrase();
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }



}
