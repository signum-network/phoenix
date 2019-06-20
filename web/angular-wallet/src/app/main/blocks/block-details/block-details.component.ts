import { Component, OnInit } from '@angular/core';
import { EncryptedMessage, Message, Account, Block } from '@burstjs/core';
import { ActivatedRoute } from '@angular/router';
import {BlockCellValue, BlockCellValueMapper} from './block-cell-value-mapper';

export interface BlockDetailRow {
  k: string;
  l: string;
  v: BlockCellValue;
}

@Component({
  selector: 'app-block-details',
  templateUrl: './block-details.component.html',
  styleUrls: ['./block-details.component.scss']
})
export class BlockDetailsComponent implements OnInit {

  detailsData: BlockDetailRow[];
  block: Block;
  private cellValueMapper: BlockCellValueMapper;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.block = this.route.snapshot.data.block as Block;
    this.cellValueMapper = new BlockCellValueMapper(this.block);

    this.detailsData = Object
      .keys(this.block)
      .map(k => ({
          k,
          // l: this.getFieldNameFromField(k),
          l: k,
          v: this.cellValueMapper.getValue(k)
        })
      ).sort((a, b) => {
        if (a.l < b.l) { return -1; }
        if (a.l > b.l) { return 1; }
        return 0;
      });

    // const blockDetails = Object
    //   .keys(this.block).map((key: string): TransactionDetailsCellValueMap => [ key, this.block[key]]);
    // this.detailsData = new Map(blockDetails);
  }

  trackRows(index, row): any {
    return row ? row.id : undefined;
  }

}
