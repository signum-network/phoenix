import { Component, Input } from '@angular/core';
import { Amount, createDeeplink } from '@signumjs/util';

@Component({
  selector: 'app-request-qr-code',
  templateUrl: './request-qr-code.component.html',
  styleUrls: ['./request-qr-code.component.scss']
})
export class RequestQrCodeComponent{

  @Input() immutable: boolean;
  @Input() recipientRS: string;
  @Input() amount: string;
  @Input() fee: string;


  getDeepLink(): string {

    if (!this.amount || !this.fee) {
      return 'string';
    }

    const payload = {
      recipient: this.recipientRS,
      amountPlanck: Amount.fromSigna(this.amount).getPlanck(),
      feePlanck: Amount.fromSigna(this.fee).getPlanck(),
      immutable: this.immutable,
      deadline: 24
    };

    return createDeeplink({
      action: 'pay',
      payload
    });

  }
}
