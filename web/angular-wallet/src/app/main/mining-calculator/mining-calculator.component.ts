import {Component, OnInit, ViewChild, Output, EventEmitter, Input, ViewChildren} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {I18nService} from 'app/layout/components/i18n/i18n.service';
import { MiningCalcCommitmentComponent } from 'app/layout/components/mining-calc-commitment/mining-calc-commitment.component';
import { MiningCalcPlotSizeComponent } from 'app/layout/components/mining-calc-plot-size/mining-calc-plot-size.component';


@Component({
  selector: 'app-mining-calculator',
  templateUrl: './mining-calculator.component.html',
  styleUrls: ['./mining-calculator.component.scss']
})
export class MiningCalculatorComponent implements OnInit {

    stepsArray: any [];
   plotCapacity: number;
   committedSize: number;
   total_burst: number;
   burst_per_day: number;
   burst_day_total: number;
   commit_ratio: number;
   avg_network_commitment: number;
   network_block_reward: number;
   base_target: number;

   burst_total_output: string;
   burst_per_day_output: string;

  constructor(private route: ActivatedRoute,
              private i18nService: I18nService) {
  }

  ngOnInit(): void {

    this.fetchBlockChainData();

    this.committedSize = 2000;
    this.plotCapacity = 100;      

    this.POCpluc();

   //this.stepsArray = [{value:0}, {value:1},{value:10}, {value:100}, {value:1000},{value:10000},{value:100000}, {value:200000}, {Value:300000}];

    
  }

  fetchBlockChainData(): void {

    //Need to query blockchain for data here:

    //This is dummy data :
    this.network_block_reward = 156;
    this.avg_network_commitment = 2500;
    this.base_target = 484515;


  }


  plotChange(number): void {

    this.plotCapacity = number;
    this.POCpluc();

  }

  commitChange(number): void {
    
    this.committedSize = number;
    this.POCpluc();

  }

  POCpluc(): void{

    this.total_burst = this.plotCapacity * this.committedSize;
    this.burst_total_output = this.total_burst.toFixed(0);        
    this.commit_ratio = this.committedSize / this.avg_network_commitment;     
 
    this.burst_per_day = 360 / (18325193796 / this.base_target / 1.83) * this.network_block_reward;

   this.burst_day_total =  this.burst_per_day * Math.max(.123, Math.min(8,Math.pow(this.commit_ratio, .4515449935))) * this.plotCapacity;
   this.burst_per_day_output = this.burst_day_total.toFixed(3);


  }



}
