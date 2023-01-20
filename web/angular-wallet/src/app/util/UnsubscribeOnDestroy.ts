import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

export class UnsubscribeOnDestroy implements OnDestroy {
  private _unsubscribeAll = new Subject();

  get unsubscribeAll(): Subject<any> {
    return this._unsubscribeAll;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
