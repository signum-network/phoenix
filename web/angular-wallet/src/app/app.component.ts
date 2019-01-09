import {Component} from '@angular/core';
import {Api} from '@bats/phoenix-common';

const {Github} = Api;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'angular-wallet';
  result = '(loading...)';

  async ngOnInit() {
    const github = new Github();
    const contributors = await github.getAllPhoenixContributors();
    this.result = contributors.join(',');
  }
}
