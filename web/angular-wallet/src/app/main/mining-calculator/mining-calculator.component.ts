import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MiningInfo, Account} from '@burstjs/core';
import {BurstValue} from '@burstjs/util';
import {I18nService} from 'app/layout/components/i18n/i18n.service';
import {AccountService} from 'app/setup/account/account.service';
import { StoreService } from 'app/store/store.service';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import {ApiService} from '../../api.service';
import {getBalancesFromAccount} from '../../util/balance';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-mining-calculator',
  templateUrl: './mining-calculator.component.html',
  styleUrls: ['./mining-calculator.component.scss']
})
export class MiningCalculatorComponent extends UnsubscribeOnDestroy implements OnInit {

  plotCapacity: number;
   committedSize: number;
   total_burst: number;
   burst_per_day: number;
   burst_day_total: number;
   commit_ratio: number;
   avg_network_commitment: number;
   network_block_reward: number;
   base_target: number;
   miningInfo: MiningInfo;
   avgcommit: BurstValue;

   account: Account;
   language: string;
   isSupported = false;

   burst_total_output: string;
   burst_per_day_output: string;

  constructor(
              private route: ActivatedRoute,              
              private apiService: ApiService,
              private accountService: AccountService,              
              private storeService: StoreService,
              private i18nService: I18nService) {
                super();

                
  }

  ngOnInit(): void {

    //API query for getMiningInfo
    this.miningInfo = this.route.snapshot.data.getMiningInfo as MiningInfo;  
    
    //Account
    this.account = this.route.snapshot.data.account as Account;  
    
    //POC+  
    this.apiService.supportsPocPlus().then(supportsPocPlus =>
      this.isSupported = supportsPocPlus
    );
   
    //Assign data to fields
    this.avgcommit = BurstValue.fromPlanck(this.miningInfo.averageCommitmentNQT);   
    this.network_block_reward = this.miningInfo.lastBlockReward;
    this.base_target = this.miningInfo.baseTarget;

    //convert Burst to Int for slider (can implement BurstValue at late date.)
    this.avg_network_commitment = parseInt(this.avgcommit.getBurst());


    //Set some initial setting for the sliders
    this.committedSize = 2000;
    this.plotCapacity = 50;      


    //do magic after data set.
    this.POCpluc();


    const unsubscribeAll = takeUntil(this.unsubscribeAll);
    this.storeService.settings
      .pipe(unsubscribeAll)
      .subscribe(({language}) => {
          this.language = language;
        }
      );

    this.storeService.ready
      .pipe(unsubscribeAll)
      .subscribe((ready) => {
        if (!ready) {
          return;
        }
        this.accountService.currentAccount
          .pipe(unsubscribeAll)
          .subscribe((account: Account) => {
            this.account = account;
          });
      });

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

  getBalance(): string {
    return getBalancesFromAccount(this.account).availableBalance.getBurst();
  }



}
