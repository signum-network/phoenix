import { Component, ViewEncapsulation } from '@angular/core';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { StoreService } from 'app/store/store.service';
import { Router } from '@angular/router';

@Component({
    selector     : 'disclaimer',
    templateUrl  : './disclaimer.component.html',
    styleUrls    : ['./disclaimer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class DisclaimerComponent
{
    constructor(
        private _fuseConfigService: FuseConfigService,
        private storeService: StoreService,
        private router: Router
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    agree(): void {
      try {
        this.storeService.updateSettings({ agree: true });
        this.router.navigate(['/login']);
      } catch (e) {
        console.warn(e);
      }
    }
}
