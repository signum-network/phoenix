import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseMatSidenavHelperService } from '@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';

import { MessagesService } from '../../../messages.service';
import { Converter } from '@burstjs/crypto/out/src';

@Component({
    selector: 'message-sidenav',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class MessageSidenavComponent implements OnInit, OnDestroy {
    messages: any[];
    messageSearch: any;
    contacts: any[];
    searchText: string;
    user: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {MessagesService} _messageService
     * @param {FuseMatSidenavHelperService} _fuseMatSidenavHelperService
     * @param {ObservableMedia} _observableMedia
     */
    constructor(
        private _messageService: MessagesService,
        private _fuseMatSidenavHelperService: FuseMatSidenavHelperService,
        public _observableMedia: ObservableMedia
    ) {
        // Set the defaults
        this.messageSearch = {
            name: ''
        };
        this.searchText = '';

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.user = this._messageService.user;
        this.messages = this._messageService.messages;
        this.contacts = this._messageService.contacts;

        this._messageService.onMessagesUpdated
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(updatedMessages => {
                this.messages = updatedMessages;
            });

        // this._messageService.onUserUpdated
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(updatedUser => {
        //         this.user = updatedUser;
        //     });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get message
     *
     * @param contact
     */
    getMessage(contact): void {
        this._messageService.getMessage(contact);

        if (!this._observableMedia.isActive('gt-md')) {
            this._fuseMatSidenavHelperService.getSidenav('message-left-sidenav').toggle();
        }
    }

    /**
     * Change left sidenav view
     *
     * @param view
     */
    changeLeftSidenavView(view): void {
        this._messageService.onLeftSidenavViewChanged.next(view);
    }

    /**
     * Logout
     */
    logout(): void {
        console.log('logout triggered');
    }

    convertTimestampToDate(timestamp) {
        return Converter.convertTimestampToDate(timestamp);
    }
}
