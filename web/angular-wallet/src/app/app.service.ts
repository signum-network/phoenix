import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { isMobile } from 'is-mobile';
import { I18nService } from './shared/services/i18n.service';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
    private electronService: ElectronService,
    private i18nService: I18nService,
    private notificationService: NotifierService
  ) {
  }

  public isRunningOnMobile(): boolean {
    return isMobile({
      tablet: true,
      featureDetect: true
    });
  }

  public isDesktop(): boolean {
    return this.electronService.isElectronApp;
  }

  public showDesktopMessage(title: string, body: string): void {
    if (!this.electronService.isElectronApp) {
      return;
    }

    // @ts-ignore
    // tslint:disable-next-line:no-unused-expression
    new window.Notification(title, { body, title: 'Phoenix' });

  }

  public openInBrowser(url: string): Promise<void> {
    if (!this.electronService.isElectronApp) {
      console.log('Opening url:', url);
      return;
    }
    return this.electronService.shell.openExternal(url);
  }

  public onIpcMessage(eventName: string, handler: (payload: any) => void): void {
    if (!this.electronService.isElectronApp) {
      return;
    }
    this.electronService.ipcRenderer.on(eventName, (event, data) => {
      handler(data);
    });
  }

  public sendIpcMessage(eventName: string, payload: any): void {
    if (!this.electronService.isElectronApp) {
      return;
    }
    this.electronService.ipcRenderer.send(eventName, payload);
  }

  async copyToClipboard(data: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(data);
      this.notificationService.notify('success',
        this.i18nService.getTranslation('success_clipboard_copy')
      );
    } catch (e) {
      this.notificationService.notify('error',
        this.i18nService.getTranslation('error_clipboard_copy')
      );
    }
  }
}
