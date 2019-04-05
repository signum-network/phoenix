import { Component, OnInit } from '@angular/core';
import { EncryptedMessage, Message, Account, Block } from '@burstjs/core';
import { ActivatedRoute } from '@angular/router';

type TransactionDetailsCellValue = string | Message | EncryptedMessage | number;
type TransactionDetailsCellValueMap = [string, TransactionDetailsCellValue];

@Component({
  selector: 'app-block-details',
  templateUrl: './block-details.component.html',
  styleUrls: ['./block-details.component.scss']
})
export class BlockDetailsComponent implements OnInit {

  detailsData: Map<string, TransactionDetailsCellValue>;
  account: Account;
  block: Block

  constructor(private route: ActivatedRoute) { 
  }

  public getDetailsData(): TransactionDetailsCellValueMap[] {
    return Array.from(this.detailsData.entries());
  } 

  ngOnInit() {
    this.block = this.route.snapshot.data.block as Block;
    const blockDetails = Object.keys(this.block).map((key:string): TransactionDetailsCellValueMap => [ key, this.block[key]]);
    this.detailsData = new Map(blockDetails);
  }

}
