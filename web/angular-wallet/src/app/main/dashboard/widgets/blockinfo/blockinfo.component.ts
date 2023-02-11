import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'app/network/network.service';
import { MiningInfo } from '@signumjs/core';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import { interval } from 'rxjs';

@Component({
  selector: 'app-blockinfo',
  templateUrl: './blockinfo.component.html',
  styleUrls: ['./blockinfo.component.scss']
})
export class BlockinfoComponent extends UnsubscribeOnDestroy implements OnInit {

  public isLoading = true;
  public miningInfo: MiningInfo = {
    baseTarget: '',
    averageCommitmentNQT: '',
    height: '',
    lastBlockReward: '',
    generationSignature: '',
    timestamp: ''
  };

  constructor(private networkService: NetworkService) {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.miningInfo = await this.networkService.getMiningInfo();
    this.isLoading = false;
    interval(120_000)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(async () => {
          this.miningInfo = await this.networkService.getMiningInfo();
      });
  }

  public getNetworkCapacity(): string {
    const { baseTarget } = this.miningInfo;

    if (!baseTarget) { return ''; }

    const GenesisBaseTarget = 4398046511104 / 240;
    const LogFactor = 1.83;
    const base = parseInt(baseTarget, 10);
    const capacity = GenesisBaseTarget / (base * LogFactor);
    return (capacity / 1024).toFixed(3);
  }

}
