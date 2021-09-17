import {Component} from '@angular/core';
import {CreateService} from '../../create.service';

@Component({
  selector: 'app-account-create-seed',
  styleUrls: ['./seed.component.scss'],
  templateUrl: './seed.component.html'
})
export class AccountCreateSeedComponent {
  private seedLimit = 100;
  private seed: any[] = [];
  private update = false;
  public progress = 0;

  constructor(
    private createService: CreateService,
  ) {
  }

  public movement(e): void {
    this.seed.push([e.clientX, e.clientY, new Date()]);
    if (!this.update) {
      this.update = true;
      setTimeout(() => {
        this.progress = this.seed.length / this.seedLimit * 100;
        this.update = false;
      }, 100);
    }
    if (this.seed.length >= this.seedLimit) {
      this.createService.setSeed(this.seed);
      setTimeout(x => {
        this.createService.setStep(1);
      }, 0);
    }
  }
}
