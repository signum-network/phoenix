import { Component } from '@angular/core';
import { AppService } from '../../app.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  isDesktop = false;
  constructor(
              private appService: AppService,
  ) {
    this.isDesktop = this.appService.isDesktop();
  }

}
