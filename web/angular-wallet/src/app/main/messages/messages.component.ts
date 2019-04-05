import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { MessagesService } from './messages.service';
import { SuggestedFees } from '@burstjs/core/out';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { MessageRightSidenavComponent } from './sidenavs/right/right.component';
import { convertNQTStringToNumber } from '@burstjs/util/out';

@Component({
    selector     : 'messages',
    templateUrl  : './messages.component.html',
    styleUrls    : ['./messages.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MessagesComponent implements OnInit, OnDestroy
{
    selectedMessage: any;
    fees: SuggestedFees;
    encrypt: boolean;
    feeNQT: number;
    @ViewChild(MessageRightSidenavComponent) rightSidenav;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MessagesService} _messageService
     */
    constructor(
        private _messageService: MessagesService,
        private route: ActivatedRoute
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        this.fees = this.route.snapshot.data.fees as SuggestedFees;
        this.encrypt = true;
        this.feeNQT = convertNQTStringToNumber(this.fees.standard.toString());

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._messageService.onMessageSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({message}) => {
                this.selectedMessage = message;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
