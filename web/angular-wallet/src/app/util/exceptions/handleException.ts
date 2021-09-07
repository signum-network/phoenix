import {I18nService} from '../../layout/components/i18n/i18n.service';
import {NotifierService} from 'angular-notifier';
import {isKeyDecryptionError} from './isKeyDecryptionError';

interface HandleExceptionArgs {
  i18nService: I18nService;
  notifierService: NotifierService;
  e: Error;
}

// FIXME: remove and use ExceptionHandlerService instead
export function handleException(args: HandleExceptionArgs): void {
  const {i18nService, notifierService, e} = args;
  if (isKeyDecryptionError(e)) {
    notifierService.notify('error', i18nService.getTranslation('wrong_pin'));
  } else if (e.message) {
    const message = `${i18nService.getTranslation('error')}: ${e.message}`;
    notifierService.notify('error', message);
  } else {
    notifierService.notify('error', i18nService.getTranslation('error_unknown'));
  }
}
