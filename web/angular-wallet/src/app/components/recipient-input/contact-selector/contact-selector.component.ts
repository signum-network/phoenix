import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ContactManagementService } from 'app/shared/services/contact-management.service';
import { WalletContact } from 'app/util/WalletContact';
import { MatMenuTrigger } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { Address } from '@signumjs/core';
import { NetworkService } from 'app/network/network.service';
import * as hashicon from 'hashicon';

interface ContactItem {
  imgUrl: string;
  name: string;
  id: string;
  address: string;
}

@Component({
  selector: 'contact-selector',
  templateUrl: './contact-selector.component.html',
  styleUrls: ['./contact-selector.component.scss']
})
export class ContactSelectorComponent implements OnInit {

  @ViewChild('menuTrigger', {static: false}) menuTrigger: MatMenuTrigger;
  contacts: ContactItem[] = [];


  private selectedContact$ = new Subject<WalletContact>();

  constructor(
    private contactManagerService: ContactManagementService,
    private networkService: NetworkService
  ) { }

  ngOnInit(): void {
  }

  private getAllContactItems(): ContactItem[] {
    const prefix = this.networkService.getAddressPrefix();
    return this.contactManagerService.getAllContacts().map( c => ({
      imgUrl:  hashicon(c.account).toDataURL(),
      name: c.name,
      id: c.account,
      address: Address.fromNumericId(c.account, prefix).getReedSolomonAddress()
    }));
  }

  openMenu(): Observable<WalletContact> {
    this.contacts = this.getAllContactItems();
    this.menuTrigger.openMenu();
    return this.selectedContact$.asObservable();
  }

  closeMenu(): void {
    this.menuTrigger.closeMenu();
  }

  selectContact(contact: ContactItem): void {
    this.selectedContact$.next(new WalletContact({ account: contact.id, name: contact.name }));
    this.closeMenu();
  }

  applyFilter(query: string): void {
      if (!query){
        this.contacts = this.getAllContactItems();
      } else {
        this.contacts = this.contacts.filter( c => c.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
      }
  }
}
