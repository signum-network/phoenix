import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
    selector   : 'fuse-countdown',
    templateUrl: './countdown.component.html',
    styleUrls    : ['./countdown.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseCountdownComponent implements OnInit, OnDestroy
{
    // Event date
    @Input('eventDate')
    eventDate;

    countdown: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     */
    constructor()
    {
        // Set the defaults
        this.countdown = {
            days   : '',
            hours  : '',
            minutes: '',
            seconds: ''
        };

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
        const currDate = moment();
        const eventDate = moment(this.eventDate);

        // Get the difference in between the current date and event date in seconds
        let diff = eventDate.diff(currDate, 'seconds');

        // Calculate the remaining time for the first time so there will be no
        // delay on the countdown
        this.countdown = this._secondsToRemaining(diff);

        // Create a subscribable interval
        const countDown = interval(1000)
            .pipe(
                map(value => {
                    return diff = diff - 1;
                }),
                map(value => {
                    return this._secondsToRemaining(value);
                })
            );

        // Subscribe to the countdown interval
        countDown
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(value => {
                this.countdown = value;
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
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Converts given seconds to a remaining time
     *
     * @param seconds
     * @private
     */
    private _secondsToRemaining(seconds): any
    {
        const timeLeft = moment.duration(seconds, 'seconds');

        return {
            days   : timeLeft.asDays().toFixed(0),
            hours  : timeLeft.hours(),
            minutes: timeLeft.minutes(),
            seconds: timeLeft.seconds()
        };
    }

}
