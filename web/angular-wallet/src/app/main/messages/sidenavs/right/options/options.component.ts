import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {takeUntil} from 'rxjs/operators';

import {MessagesService} from '../../../messages.service';
import { SuggestedFees, TransactionArbitrarySubtype, TransactionType } from '@signumjs/core';
import {UnsubscribeOnDestroy} from '../../../../../util/UnsubscribeOnDestroy';
import {Amount} from '@signumjs/util';

@Component({
  selector: 'message-options-sidenav',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessageOptionsSidenavComponent extends UnsubscribeOnDestroy implements OnInit {
  @Input() fees: SuggestedFees;

  public CurrencySymbol = Amount.CurrencySymbol();
  public encrypt = false;
  public feeSigna: string;
  public options: any;
  public type = TransactionType.Arbitrary;
  public subtype = TransactionArbitrarySubtype.Message;

  constructor(
    private _messageService: MessagesService,
  ) {
    super();
  }

  ngOnInit(): void {
    this._messageService.onOptionsSelected
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(options => {
        this.options = options;
        this.encrypt = options.encrypt;
      });
  }
}
