import { Component, OnInit } from '@angular/core';
import { CreateService } from '../../create.service';

@Component({
    selector: 'app-account-create-record',
    styleUrls: ['./record.component.scss'],
    templateUrl: './record.component.html'
})
export class AccountCreateRecordComponent implements OnInit {

    constructor(
        private createService: CreateService,
    ) { }

    public ngOnInit() {

    }

    public ngOnDestroy() {

    }

    public reset() {
        this.createService.reset();
        // Angular Stepper hack
        setTimeout(x => {
            this.createService.setStepIndex(0)
        }, 0);
    }

    public next() {
        this.createService.setStepIndex(2);
    }

    public copy() {
        let selBox = document.createElement('textarea');
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
