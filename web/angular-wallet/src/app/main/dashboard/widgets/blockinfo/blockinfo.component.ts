import { Component, OnDestroy, OnInit } from '@angular/core';
import { NetworkService } from '../../../../network/network.service';
import { MiningInfo } from '@signumjs/core';

@Component({
  selector: 'app-blockinfo',
  templateUrl: './blockinfo.component.html',
  styleUrls: ['./blockinfo.component.scss']
})
export class BlockinfoComponent implements OnInit, OnDestroy {

  public isLoading = true;
  public miningInfo: MiningInfo = {
    baseTarget: '',
    averageCommitmentNQT: '',
    height: '',
    lastBlockReward: '',
    generationSignature: '',
    timestamp: ''
  };
  private interval: NodeJS.Timeout;

  constructor(private networkService: NetworkService) {
  }

  async ngOnInit(): Promise<void> {
    this.miningInfo = await this.networkService.getMiningInfo();
    this.isLoading = false;
    this.interval = setInterval(async () => {
      this.miningInfo = await this.networkService.getMiningInfo();
    }, 4 * 60 * 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
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
