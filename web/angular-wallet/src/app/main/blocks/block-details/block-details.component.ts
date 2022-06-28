import {Component, OnInit} from '@angular/core';
import { Block } from '@signumjs/core';
import { ActivatedRoute } from '@angular/router';
import {BlockCellValue, BlockCellValueMapper} from './block-cell-value-mapper';
import {UtilService} from '../../../util.service';
import {I18nService} from '../../../layout/components/i18n/i18n.service';
import { NetworkService } from '../../../network/network.service';
import { AppService } from '../../../app.service';

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

  constructor(
    private route: ActivatedRoute,
    private networkService: NetworkService,
    private appService: AppService,
    private i18nService: I18nService,
    private utilService: UtilService,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      _ => {
          this.block = this.route.snapshot.data.block;
          this.initializeDetailsData(this.block);
      }
    );
  }

  initializeDetailsData(block: Block): void{
    // @ts-ignore
    delete this.block.blockRewardNQT;

    this.cellValueMapper = new BlockCellValueMapper(block);
    this.detailsData = Object
      .keys(block)
      .map(k => ({
          k,
          l: this.getTranslatedFieldName(k),
          v: this.cellValueMapper.getValue(k)
        })
      ).sort((a, b) => {
        if (a.l < b.l) { return -1; }
        if (a.l > b.l) { return 1; }
        return 0;
      });
  }


  trackRows(index, row): any {
    return row ? row.id : undefined;
  }

  private getTranslatedFieldName(key: string): string {
    return this.utilService.translateBlockField(key);
  }

  openExplorer(): void {
    const host = this.networkService.getChainExplorerHost();
    const url = `${host}/block/${this.block.height}`;
    if (!this.appService.isDesktop()) {
      window.open(url, 'blank');
    } else {
      this.appService.openInBrowser(url);
    }
  }
}
