import {Component, OnInit} from '@angular/core';
import {CreateService} from '../../create.service';
import * as seedrandom from 'seedrandom';

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
    console.log('ngOnInit');
  }


  public reset(): void {
    this.createService.reset();
  }

  public next(): void {
    this.createService.setSalt(this.salt);
    setTimeout(() => {
      this.createService.generateAccount().then(() =>
        this.createService.nextStep()
      );
    }, 0);
  }

  private createRandomString(length: number): string {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjklmnpqrstuvxyz123456789';
    const seed = this.createService.getSeed();
    const rng = seed.map(s => seedrandom(s, {entropy: true}))[0];

    let randomString = '';
    for (let i = 0; i < length; ++i) {
      const index = Math.ceil(rng() * alphabet.length) - 1;
      randomString += alphabet[index];
    }
    return randomString;
  }

  public generate(): void {
    this.salt = this.createRandomString(16);
  }
}
