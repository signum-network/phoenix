import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Account, Block } from '@burstjs/core';
import { FormControl } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Amount, BlockTime } from '@burstjs/util';
import { NetworkService } from 'app/network/network.service';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'app/store/store.service';

@Component({
  selector: 'app-blocks',
  styleUrls: ['./blocks.component.scss'],
  templateUrl: './blocks.component.html'
})
export class BlocksComponent implements OnInit {
  public dataSource: MatTableDataSource<Block>;
  public displayedColumns: string[];
  private account: Account;
  pickerFromField = new FormControl();
  pickerToField = new FormControl();
  chart: any;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private networkService: NetworkService,
    private notifierService: NotifierService,
    private storeService: StoreService,
    private route: ActivatedRoute
  ) {
  }

  public async ngOnInit(): Promise<void> {
    this.displayedColumns = ['block', 'height', 'numberOfTransactions', 'timestamp', 'totalAmountNQT', 'totalFeeNQT'];
    this.dataSource = new MatTableDataSource<Block>();
    this.dataSource.data = this.route.snapshot.data.blocks.blocks;
    this.networkService.setBlocks(this.dataSource.data);
    this.networkService.blocks.subscribe((blocks) => {
      this.dataSource.data = blocks;
      const chartData = blocks
        .slice()
        .splice(0, 20)
        .map((block, i) => {
          if (blocks[i + 1]) {
            const timeBetween = this.convertTimestamp(block.timestamp).getTime() - this.convertTimestamp(blocks[i + 1].timestamp).getTime();
            return new Date(timeBetween).getMinutes();
          }
        })
        .filter((time) => typeof time !== 'undefined')
        .reverse();

      this.chart = {
        chartType: 'line',
        datasets: [
          {
            label: 'Block Time (mins)',
            data: chartData,
            fill: 'start'
          }
        ],
        labels: blocks
          .slice()
          .splice(0, 20)
          .map((block) => block.block)
          .reverse(),
        colors: [
          {
            borderColor: '#42a5f5',
            backgroundColor: '#42a5f5',
            pointBackgroundColor: '#1e88e5',
            pointHoverBackgroundColor: '#1e88e5',
            pointBorderColor: '#ffffff',
            pointHoverBorderColor: '#ffffff'
          }
        ],
        options: {
          spanGaps: false,
          legend: {
            display: false
          },
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 32,
              left: 32,
              right: 32
            }
          },
          elements: {
            point: {
              radius: 4,
              borderWidth: 2,
              hoverRadius: 4,
              hoverBorderWidth: 2
            },
            line: {
              tension: 0
            }
          },
          scales: {
            xAxes: [
              {
                display: false,
                gridLines: {
                  display: false,
                  drawBorder: false,
                  tickMarkLength: 18
                },
                ticks: {
                  fontColor: '#ffffff'
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  min: Math.min(...chartData),
                  max: Math.max(...chartData),
                  stepSize: 2,
                  fontColor: '#ffffff'
                }
              }
            ]
          },
          plugins: {
            filler: {
              propagate: false
            },
            xLabelsOnTop: {
              active: true
            }
          }
        }
      };
    });
  }

  public ngAfterViewInit(): void {
    const defaultFilterPredicate = this.dataSource.filterPredicate;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filterValue: string) => {
      let withinRange = true;
      if (this.pickerFromField.value && this.pickerToField.value) {
        withinRange = this.convertTimestamp(data.timestamp) > this.pickerFromField.value &&
          this.convertTimestamp(data.timestamp) < this.pickerToField.value;
      } else if (this.pickerFromField.value) {
        withinRange = this.convertTimestamp(data.timestamp) > this.pickerFromField.value;
      } else if (this.pickerToField.value) {
        withinRange = this.convertTimestamp(data.timestamp) < this.pickerToField.value;
      }
      return withinRange && defaultFilterPredicate(data, filterValue);
    };
  }

  public applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue || 'burst';
  }

  public isOwnAccount(address: string): boolean {
    return address && address === this.account.accountRS;
  }

  public convertTimestamp(timestamp: number): Date {
    return BlockTime.fromBlockTimestamp(timestamp).getDate();
  }

  getAmountFromPlanck(totalFeeNQT: any): string {
    return Amount.fromPlanck(totalFeeNQT).getSigna();
  }
}
