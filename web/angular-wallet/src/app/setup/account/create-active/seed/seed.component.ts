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
    this.seed.push([e.clientX, e.clientY, +new Date()]);
    if (this.update) {
      return;
    }

    this.update = true;
    setTimeout(() => {
      this.progress = this.seed.length / this.seedLimit * 100;
      if (this.progress >= 100) {
        this.createService.setSeed(this.seed);
        this.createService.setStep(1);
      } else {
        this.update = false;
      }
    }, 100);
  }
}
