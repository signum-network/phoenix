import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MessagesService } from '../../../messages.service';

@Component({
    selector     : 'message-options-sidenav',
    templateUrl  : './options.component.html',
    styleUrls    : ['./options.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MessageOptionsSidenavComponent implements OnInit, OnDestroy
{
    options: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MessagesService} _messageService
     */
    constructor(
        private _messageService: MessagesService
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
                console.log(options);
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
