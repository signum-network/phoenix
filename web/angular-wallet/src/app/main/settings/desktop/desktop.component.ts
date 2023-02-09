import { Component, OnInit } from '@angular/core';
import { StoreService } from 'app/store/store.service';
import { AppService } from 'app/app.service';
import { I18nService } from 'app/shared/services/i18n.service';

@Component({
  selector: 'settings-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {

  public showDesktopNotifications = true;
  constructor(
    private storeService: StoreService,
    private appService: AppService,
    private i18nService: I18nService
  ) { }

  ngOnInit(): void {
    const currentSettings = this.storeService.getSettings();
    this.showDesktopNotifications = currentSettings.showDesktopNotifications;
  }

  setDesktopNotifications(): void {
    const currentSettings = this.storeService.getSettings();
    currentSettings.showDesktopNotifications = this.showDesktopNotifications;
    this.storeService.updateSettings(currentSettings);
    if (this.showDesktopNotifications) {
      this.appService.showDesktopMessage('Phoenix', this.i18nService.getTranslation('notifications_enabled'));
    }
  }

}
