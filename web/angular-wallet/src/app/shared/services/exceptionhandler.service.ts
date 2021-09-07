import {Injectable} from '@angular/core';
import {I18nService} from '../../layout/components/i18n/i18n.service';
import {NotifierService} from 'angular-notifier';
import {KeyDecryptionException} from '../../util/exceptions/KeyDecryptionException';

@Injectable({
  providedIn: 'root'
})
export class ExceptionHandlerService {

  constructor(
    private i18nService: I18nService,
    private notifierService: NotifierService,
  ) {

  }

  public handle(e: Error): void {
      let message = this.i18nService.getTranslation('error_unknown');
      if (e instanceof KeyDecryptionException) {
        message = this.i18nService.getTranslation('wrong_pin');
      } else if (e.message) {
        // we could introduce translations for the errors
        message = `${this.i18nService.getTranslation('error')}: ${e.message}`;
      }
    this.notifierService.notify('error', message);
  }
}
