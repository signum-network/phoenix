import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FuseMatchMediaService
{
    activeMediaQuery: string;
    onMediaChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

    /**
     * Constructor
     *
     * @param {ObservableMedia} _observableMedia
     */
    constructor(
        private _observableMedia: MediaObserver
    )
    {
        // Set the defaults
        this.activeMediaQuery = '';

        // Initialize
        this._init();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Initialize
     *
     * @private
     */
    private _init(): void
    {
        this._observableMedia.asObservable()
            .pipe(
                debounceTime(500),
                distinctUntilChanged()
            )
            // @ts-ignore
            .subscribe((change: MediaChange[]) => {
                if (!change || !change.length) {
                    return;
                }
                if (this.activeMediaQuery !== change[0].mqAlias) {
                    this.activeMediaQuery = change[0].mqAlias;
                    this.onMediaChange.next(change[0].mqAlias);
                }
            });
    }

}
