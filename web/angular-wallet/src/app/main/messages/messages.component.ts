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
  @ViewChild(MessageRightSidenavComponent) rightSidenav;

  selectedMessage: any;
  fees: SuggestedFees;
  encrypt: boolean;
  feeNQT: number;

  private _unsubscribeAll: Subject<any>;

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
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
