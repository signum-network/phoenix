import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ContactManagementService } from "app/shared/services/contact-management.service";
import { WalletContact } from 'app/util/WalletContact';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'contact-selector',
  templateUrl: './contact-selector.component.html',
  styleUrls: ['./contact-selector.component.scss']
})
export class ContactSelectorComponent implements OnInit {

  @ViewChild('menuTrigger', {static:false}) menuTrigger: MatMenuTrigger;
  @Input() anchor: HTMLElement;
  contacts: WalletContact[] = [];

  constructor(
    private contactManagerService: ContactManagementService
  ) { }

  ngOnInit(): void {
    console.log('Anchor', this.anchor.getClientRects());
  }

  openMenu(): void {
    this.contacts = this.contactManagerService.getAllContacts();
    this.menuTrigger.openMenu();
  }

  closeMenu(): void {
    this.menuTrigger.closeMenu();
  }
}
