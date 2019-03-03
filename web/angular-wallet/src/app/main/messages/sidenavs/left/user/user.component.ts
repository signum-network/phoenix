import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MessagesService } from 'app/main/messages/messages.service';


@Component({
    selector     : 'message-user-sidenav',
    templateUrl  : './user.component.html',
    styleUrls    : ['./user.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MessageUserSidenavComponent implements OnInit, OnDestroy
{
    user: any;
    userForm: FormGroup;

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
        this.user = this._messageService.user;

        this.userForm = new FormGroup({
            mood  : new FormControl(this.user.mood),
            status: new FormControl(this.user.status)
        });

        this.userForm.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(500),
                distinctUntilChanged()
            )
            .subscribe(data => {
                this.user.mood = data.mood;
                this.user.status = data.status;
                // this._messageService.updateUserData(this.user);
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Change left sidenav view
     *
     * @param view
     */
    changeLeftSidenavView(view): void
    {
        this._messageService.onLeftSidenavViewChanged.next(view);
    }

}
