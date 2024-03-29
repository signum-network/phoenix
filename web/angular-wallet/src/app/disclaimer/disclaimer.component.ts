import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { StoreService } from 'app/store/store.service';
import { Router } from '@angular/router';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class DisclaimerComponent {
  version = environment.version;


  constructor(
    private _fuseConfigService: FuseConfigService,
    private storeService: StoreService,
    private router: Router,
  ) {
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
