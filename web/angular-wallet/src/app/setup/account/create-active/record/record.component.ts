import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { CreateService } from '../../create.service';
import { NotifierService } from 'angular-notifier';
import { I18nService } from '../../../../layout/components/i18n/i18n.service';
import { ExceptionHandlerService } from '../../../../shared/services/exceptionhandler.service';
import { AccountService } from '../../account.service';


@Component({
  selector: 'app-account-create-record',
  styleUrls: ['./record.component.scss'],
  templateUrl: './record.component.html'
})
export class AccountCreateRecordComponent {

  @Input() newUser = false;

  constructor(
    public createService: CreateService,
    private notifierService: NotifierService,
    private i18nService: I18nService,
    private exceptionHandlerService: ExceptionHandlerService
  ) {
  }

  public back(): void {
    this.createService.previousStep();
  }

  public next(): void {
    this.createService.nextStep();
  }

  public async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.createService.getPhrase());
      const msg = this.i18nService.getTranslation('success_clipboard_copy');
      this.notifierService.notify('success', msg);
    } catch (e) {
      this.exceptionHandlerService.handle(e);
    }
  }

  print(): void {
    window.print();
  }

}
