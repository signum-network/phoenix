import { Component, Input, OnChanges, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WalletContact } from 'app/util/WalletContact';
import hashicon from 'hashicon';
import { WalletAccount } from 'app/util/WalletAccount';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';
import { NetworkService } from 'app/network/network.service';
import { DeleteDialogComponent } from '../delete-account-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { I18nService } from 'app/shared/services/i18n.service';
import { NotifierService } from 'angular-notifier';
import { ContactManagementService } from 'app/shared/services/contact-management.service';
import { MatSort } from '@angular/material/sort';
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { EditContactDialogComponent } from "../../../components/edit-contact-dialog/edit-contact-dialog.component";

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @Input() selectedAccount: WalletAccount;
  @Input() contacts: WalletContact[] = [];
  @Input() filter = '';
  dataSource: MatTableDataSource<WalletContact> = new MatTableDataSource<WalletContact>();
  displayedColumns = ['delete', 'avatar', 'account', 'name', 'actions'];


  paginationEnabled = false;
  selectedContacts: any = {};
  isEditingName = false;
  constructor(
    private router: Router,
    private appService: AppService,
    private networkService: NetworkService,
    private deleteDialog: MatDialog,
    private i18nService: I18nService,
    private notificationService: NotifierService,
    private contactManagementService: ContactManagementService,
    private breakpointObserver: BreakpointObserver,
    private editContactDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.refreshContacts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.contacts){
      this.refreshContacts();
    }
    if (changes.filter){
      this.applyFilter(changes.filter.currentValue);
    }
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private refreshContacts(): void {
    this.contacts = this.contactManagementService.getAllContacts();
    this.dataSource.data = this.contacts;
    this.dataSource.paginator = this.paginator;
    this.paginationEnabled = this.dataSource.data.length > 10;
  }

  public applyFilter(filterValue: string): void {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
  }


  getAvatarUrl(contact: WalletContact): string {
    return hashicon(contact.account).toDataURL();
  }

  openInExplorer(contact: WalletContact): void {
    const host = this.networkService.getChainExplorerHost();
    const url = `${host}/address/${contact.account}`;
    if (!this.appService.isDesktop()) {
      window.open(url, 'blank');
    } else {
      this.appService.openInBrowser(url);
    }
  }

  routeToAccount(contact: WalletContact): void {
    this.router.navigate(['/account', contact.account]);
  }

  sendToAccount(contact: WalletContact): void {
    this.router.navigate(['/send'], {
      queryParams: {
        receiver: contact.account
      }
    });
  }

  public deleteContact(contact: WalletContact): void {
    this.deleteContacts([contact]);
  }
  private deleteContacts(contacts: WalletContact[]): void {

    if (!contacts.length) { return; }

    const dialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      width: '400px',
      data: {
        mode: 'contact',
        accountIds: contacts.map( ({account}) => account)
      }
    });

    dialogRef.afterClosed()
      .subscribe(async (confirm) => {
        if (!confirm) {
          return;
        }
        for (const c of contacts){
          this.contactManagementService.removeContact(c.account);
        }
        this.refreshContacts();
        this.notificationService.notify('success', this.i18nService.getTranslation('contact_successfully_deleted'));
      });
  }

  public getSelectedContacts(): WalletContact[] {
    return this.contacts.filter(({ account }) => this.selectedContacts[account]);
  }

  public deleteSelectedContacts(): void {
    this.deleteContacts(this.getSelectedContacts());
  }

  async copyToClipboard(data: string): Promise<void> {
    this.appService.copyToClipboard(data);
  }

  openEditContactDialog(contact: WalletContact): void {
    const width = this.breakpointObserver.isMatched(Breakpoints.Handset) ? '90%' : '400px';
    const dialogRef = this.editContactDialog.open(EditContactDialogComponent, {width, data: contact});
    dialogRef
      .afterClosed()
      .subscribe(this.editContact.bind(this));
  }

  private editContact(contact: WalletContact): void {
    if (!contact) { return; }
    this.contactManagementService.updateContact(contact);
    this.refreshContacts();
  }

}
