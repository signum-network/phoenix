import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { CreateService } from '../create.service';

@Component({
    selector: 'app-account-create',
    styleUrls: ['./create.component.scss'],
    templateUrl: './create.component.html'
})
export class CreateActiveAccountComponent implements OnInit {
    @ViewChild(MatStepper, { static: true }) stepper: MatStepper;
    @Input('newUser') newUser: boolean;

    constructor(public createService: CreateService) {}

    public ngOnInit() {
    }

    public ngOnDestroy() {
    }

    public setIndex() {
        this.stepper.selectedIndex = 1;
    }

}
