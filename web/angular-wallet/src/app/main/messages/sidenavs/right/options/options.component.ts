import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {takeUntil} from 'rxjs/operators';

import {MessagesService} from '../../../messages.service';
import {SuggestedFees} from '@burstjs/core';
import {UnsubscribeOnDestroy} from '../../../../../util/UnsubscribeOnDestroy';
import {convertNQTStringToNumber} from '@burstjs/util';

@Component({
  selector: 'message-options-sidenav',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessageOptionsSidenavComponent extends UnsubscribeOnDestroy implements OnInit {
  @Input() fees: SuggestedFees;

  public encrypt: boolean;
  public feeBurst: string;
  public options: any;

  constructor(
    private _messageService: MessagesService,
  ) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.feeBurst = convertNQTStringToNumber(this.fees.standard.toString()).toString();
    });
    this._messageService.onOptionsSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(options => {
        this.options = options;
        this.encrypt = options.encrypt;
      });
  }
}
