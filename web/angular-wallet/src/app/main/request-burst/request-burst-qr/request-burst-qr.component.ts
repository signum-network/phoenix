import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-request-burst-qr',
  templateUrl: './request-burst-qr.component.html',
  styleUrls: ['./request-burst-qr.component.scss']
})
export class RequestBurstQrComponent implements OnInit {

  @Input('immutable') immutable: boolean;
  @Input('recipientRS') recipientRS: string;
  @Input('amountNQT') amountNQT: string;
  @Input('feeNQT') feeNQT: string;
  @Input('imgSrc') imgSrc: string;

  constructor() { }

  ngOnInit() {
  }

}
