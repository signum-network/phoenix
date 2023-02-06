import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'app/app.service';
import { AccountManagementService } from 'app/shared/services/account-management.service';
import { ContactManagementService } from 'app/shared/services/contact-management.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { NetworkService } from 'app/network/network.service';
import { StoreService } from 'app/store/store.service';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AddContactDialogComponent } from '../add-contact-dialog/add-contact-dialog.component';
import { WalletContact } from 'app/util/WalletContact';
import { NotifierService } from 'angular-notifier';
import { MatDialog } from '@angular/material/dialog';
import { I18nService } from 'app/shared/services/i18n.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent extends UnsubscribeOnDestroy implements OnInit {

  @Input() accountId: string;
  @Input() noActions: boolean;
  isContact = false;
  selectedAccount: WalletAccount;

  constructor(
    private appService: AppService,
    private accountManagementService: AccountManagementService,
    private contactManagementService: ContactManagementService,
    private networkService: NetworkService,
    private storeService: StoreService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private notificationService: NotifierService,
    private i18nService: I18nService,
    private addContactDialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
    this.selectedAccount = this.accountManagementService.getSelectedAccount();
    this.storeService
      .accountSelected$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((account) => {
        this.selectedAccount = account;
      });

    this.noActions = this.noActions !== undefined;
    this.isContact = !!this.contactManagementService.findContactById(this.accountId);
  }

  copyToClipboard(accountId: string): void {
    this.appService.copyToClipboard(accountId);
  }

  openInExplorer(accountId: string): void {
    const host = this.networkService.getChainExplorerHost();
    const url = `${host}/address/${accountId}`;
    if (!this.appService.isDesktop()) {
      window.open(url, 'blank');
    } else {
      this.appService.openInBrowser(url);
    }
  }

  sendToAccount(accountId: string): void {
    this.router.navigate(['/send'], {
      queryParams: {
        receiver: accountId
      }
    });
  }

  addAsContact(accountId: string): void {
    const width = this.breakpointObserver.isMatched(Breakpoints.Handset) ? '90%' : '400px';
    const dialogRef = this.addContactDialog.open(AddContactDialogComponent, {width, data: accountId});

    dialogRef
      .afterClosed()
      .subscribe(this.addContact.bind(this));
  }

  private addContact(contact: WalletContact): void {
    if (!contact) { return; }
    try{
      this.contactManagementService.addContact(contact);
      this.notificationService.notify('success', this.i18nService.getTranslation('contact_added'));
    }catch (e){
      this.notificationService.notify('error', this.i18nService.getTranslation('error_add_contact'));
    }
  }
}
