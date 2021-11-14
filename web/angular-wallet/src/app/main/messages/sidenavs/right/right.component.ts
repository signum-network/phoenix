import {Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {fuseAnimations} from '@fuse/animations';
import {MessagesService} from '../../messages.service';
import {MessageOptionsSidenavComponent} from './options/options.component';

@Component({
  selector: 'message-right-sidenav',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MessageRightSidenavComponent implements OnInit, OnDestroy {
  view: string;
  @ViewChild(MessageOptionsSidenavComponent, { static: false }) options;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _messageService: MessagesService
  ) {
    this.view = 'options';
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._messageService.onRightSidenavViewChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(view => {
        this.view = view;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
