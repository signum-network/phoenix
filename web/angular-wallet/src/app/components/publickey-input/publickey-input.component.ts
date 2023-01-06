import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Address } from '@signumjs/core';
import { Recipient } from '../recipient-input/recipient-input.component';

@Component({
  selector: 'app-publickey-input',
  templateUrl: './publickey-input.component.html',
  styleUrls: ['./publickey-input.component.scss']
})
export class PublickeyInputComponent implements OnChanges {
  @Input() recipient: Recipient;
  @Output() publickeyChange = new EventEmitter<string>();

  public validPublicKey: string;
  private recipientId: string;

  constructor() {
  }

  onChange(publicKey: string): void {
    if(!this.recipientId){
      this.validPublicKey =  '';
    }

    try {
      const numericId = Address.fromPublicKey(publicKey).getNumericId();
      this.validPublicKey =  publicKey;
    } catch (e) {
      this.validPublicKey = '';
    }
    this.publickeyChange.next(this.validPublicKey);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.recipient) {
      try {
        this.recipientId = Address.create(changes.recipient.currentValue).getNumericId();
      } catch (e) {
        this.recipientId = null;
      }
    }
  }
}
