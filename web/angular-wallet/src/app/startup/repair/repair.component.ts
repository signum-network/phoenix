import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {FuseConfigService} from '@fuse/services/config.service';
import {StoreService} from 'app/store/store.service';
import {Router} from '@angular/router';
import {Settings} from '../../settings';

@Component({
  selector: 'repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RepairComponent implements OnInit {
  public settings: Settings;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private storeService: StoreService,
    private router: Router
  ) {
    // Configure the layout
    this._fuseConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        sidepanel: {
          hidden: true
        }
      }
    };
  }

  async ngOnInit(): Promise<void> {
    this.storeService.ready.subscribe(async (ready) => {
      if (!ready) {
        return;
      }
      this.settings = await this.storeService.getSettings();
    });
  }

  apply() {
    this.router.navigate(['/dashboard']);
  }
}
