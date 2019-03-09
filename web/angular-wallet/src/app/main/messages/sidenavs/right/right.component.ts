import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { MessagesService } from '../../messages.service';

@Component({
    selector     : 'message-right-sidenav',
    templateUrl  : './right.component.html',
    styleUrls    : ['./right.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MessageRightSidenavComponent implements OnInit, OnDestroy
{
    view: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _messageService: MessagesService
    )
    {
        // Set the defaults
        this.view = 'options';

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
        this._messageService.onRightSidenavViewChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(view => {
                this.view = view;
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
