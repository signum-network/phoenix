import {Component, OnInit} from '@angular/core';
import {Settings} from '../../settings';
import {I18nService} from '../../layout/components/i18n/i18n.service';
import {StoreService} from '../../store/store.service';
import {UnsubscribeOnDestroy} from '../../util/UnsubscribeOnDestroy';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends UnsubscribeOnDestroy implements OnInit {

  constructor(private i18nService: I18nService,
              private storeService: StoreService,
  ) {
    super();
  }

  public settings: Settings;

  async ngOnInit(): Promise<void> {
    this.storeService.ready.subscribe(async (ready) => {
      if (!ready) {
        return;
      }
      this.settings = await this.storeService.getSettings();
    });
  }
}
