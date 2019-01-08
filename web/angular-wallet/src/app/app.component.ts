import {Component} from '@angular/core';

import {PuppyApi} from '@bats/phoenix-common/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'angular-wallet';
  result: String;

  async ngOnInit() {
    const puppyApi = new PuppyApi();
    const puppies = await puppyApi.getAllPuppies();

    this.result = puppies.map(p => p.name).join(',');
  }
}
