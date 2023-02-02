import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ContactManagementService } from 'app/shared/services/contact-management.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StoreService } from 'app/store/store.service';
import { WalletContact } from 'app/util/WalletContact';

@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @Input()
  dataSource: MatTableDataSource<WalletContact>;
  displayedColumns = ['accountId', 'name'];

  paginationEnabled = false;
  constructor(
    private contactManagementService: ContactManagementService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.contactManagementService.getAllContacts();
    this.paginationEnabled = this.dataSource.data.length > 10;
  }

}
