import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatStepper } from '@angular/material';
import { CreateService } from '../create.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-account-create',
    styleUrls: ['./create.component.scss'],
    templateUrl: './create.component.html'
})
export class CreateActiveAccountComponent implements OnInit {
    @ViewChild(MatStepper) stepper: MatStepper;
    @Input('newUser') newUser: boolean;

    constructor(private createService: CreateService) {}

    public ngOnInit() {
    }

    public ngOnDestroy() {
    }

    public setIndex() {
        this.stepper.selectedIndex = 1
    }

}
 