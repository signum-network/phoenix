import { Component, OnDestroy, OnInit, ViewEncapsulation, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MessagesService } from '../../../messages.service';
import { SuggestedFees } from '@burstjs/core/out';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector     : 'message-options-sidenav',
    templateUrl  : './options.component.html',
    styleUrls    : ['./options.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MessageOptionsSidenavComponent implements OnInit, OnDestroy
{
    options: any;
    @Input('fees') fees: SuggestedFees;
    @Input('feeNQT') feeNQT: string;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _messageService: MessagesService,
        private route: ActivatedRoute
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._messageService.onOptionsSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(options => {
                this.options = options;
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
