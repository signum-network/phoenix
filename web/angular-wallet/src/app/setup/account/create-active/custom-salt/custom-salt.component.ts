import {Component, OnInit} from '@angular/core';
import {CreateService, StepsEnum} from '../../create.service';
import seedrandom from 'seedrandom';

@Component({
  selector: 'app-custom-salt',
  templateUrl: './custom-salt.component.html',
  styleUrls: ['./custom-salt.component.scss']
})
export class CustomSaltComponent implements OnInit {
  salt = '';

  constructor(private createService: CreateService) {
  }

  ngOnInit(): void {
  }


  public reset(): void {
    this.createService.reset();
  }

  public next(): void {
    this.createService.setSalt(this.salt);
    this.createService.generateAccount().then(() =>
      this.createService.setStep(StepsEnum.Record)
    );
  }

  public generate(): void {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjklmnpqrstuvxyz123456789';
    const seed = this.createService.getSeed();
    const rng = seedrandom(seed, {entropy: true});
    let rnd = '';
    for (let i = 0; i < 16; ++i) {
      const index = Math.ceil(rng() * alphabet.length) - 1;
      rnd += alphabet[index];
    }

    this.salt = rnd;
  }
}
