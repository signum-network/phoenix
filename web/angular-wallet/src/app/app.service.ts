import {Injectable} from '@angular/core';
import {ElectronService} from 'ngx-electron';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
    private electronService: ElectronService,
  ) {
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
    new window.Notification(title, {body, title: 'Phoenix'});

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
}
