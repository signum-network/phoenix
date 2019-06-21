import {Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {fuseAnimations} from '@fuse/animations';

import {MessagesService} from './messages.service';
import {SuggestedFees} from '@burstjs/core/out';
import {ActivatedRoute} from '@angular/router';
import {MessageRightSidenavComponent} from './sidenavs/right/right.component';
import {convertNQTStringToNumber} from '@burstjs/util/out';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class MessagesComponent implements OnInit, OnDestroy {
  @ViewChild(MessageRightSidenavComponent, { static: true }) rightSidenav;

  selectedMessage: any;
  fees: SuggestedFees;
  encrypt: boolean;
  feeNQT: number;

  MESSAGE_FETCH_INTERVAL = 30000; // 30 secs

  private _unsubscribeAll: Subject<any>;
  messageFetcher$: NodeJS.Timeout;

  constructor(
    private _messageService: MessagesService,
    private route: ActivatedRoute
  ) {
    this._unsubscribeAll = new Subject();

    this.fees = this.route.snapshot.data.fees as SuggestedFees;
    this.encrypt = true;
    this.feeNQT = convertNQTStringToNumber(this.fees.standard.toString());

  }

  ngOnInit(): void {
    this._messageService.onMessageSelected
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(({message}) => {
        this.selectedMessage = message;
      });

    this.messageFetcher$ = setInterval(() => {
      this._messageService.populateMessages();
    }, this.MESSAGE_FETCH_INTERVAL);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    clearInterval(this.messageFetcher$);
  }
}
