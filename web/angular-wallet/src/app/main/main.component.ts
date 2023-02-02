import {Component, Inject, OnDestroy, OnInit, Input} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Platform} from '@angular/cdk/platform';
import {takeUntil} from 'rxjs/operators';

import {FuseConfigService} from '@fuse/services/config.service';
import {FuseNavigationService} from '@fuse/components/navigation/navigation.service';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {FuseSplashScreenService} from '@fuse/services/splash-screen.service';
import {FuseTranslationLoaderService} from '@fuse/services/translation-loader.service';

import {navigation} from 'app/navigation/navigation';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends UnsubscribeOnDestroy implements OnInit, OnDestroy {
  fuseConfig: any;
  navigation: any;


  constructor(
    @Inject(DOCUMENT) private document: any,
    private _fuseConfigService: FuseConfigService,
    private _fuseNavigationService: FuseNavigationService,
    private _fuseSidebarService: FuseSidebarService,
    private _fuseSplashScreenService: FuseSplashScreenService,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private _platform: Platform
  ) {

    super();
    this.navigation = navigation;
    this._fuseNavigationService.register('main', this.navigation);
    this._fuseNavigationService.setCurrentNavigation('main');

    // Add is-mobile class to the body if the platform is mobile
    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }
  }

  ngOnInit(): void {

    // Subscribe to config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((config) => {

        this.fuseConfig = config;

        // Boxed
        if (this.fuseConfig.layout.width === 'boxed') {
          this.document.body.classList.add('boxed');
        } else {
          this.document.body.classList.remove('boxed');
        }

        // Color theme - Use normal for loop for IE11 compatibility
        for (const element of this.document.body.classList) {
          const className = element;

          if (className.startsWith('theme-')) {
            this.document.body.classList.remove(className);
          }
        }

        this.document.body.classList.add(this.fuseConfig.colorTheme);
      });


  }

  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }
}
