import { Injectable } from '@angular/core';
import { StoreService } from 'app/store/store.service';
import { WalletContact } from 'app/util/WalletContact';

@Injectable({
  providedIn: 'root'
})
export class ContactManagementService {

  constructor(private storeService: StoreService) {
  }

  public addContact(contact: WalletContact): WalletContact {
    const existingContact = this.findContactById(contact.account);
    if (!existingContact) {
      this.storeService.saveContact(contact);
      return contact;
    } else {
      throw new Error('Contact already imported!');
    }
  }

  public hasContacts(): boolean {
    return this.storeService.getAllContacts().length > 0;
  }

  public removeContact(contactId: string): void {
    this.storeService.removeContact(contactId);
  }

  public findContactById(accountId: string): WalletContact | null {
    return this.storeService.findContactByAccountId(accountId);
  }

  public findContactsByName(name: string): WalletContact[] {
    return this.storeService.findContactsByName(name);
  }

  public getAllContacts(): WalletContact[] {
    // this forces change detection
    return [...this.storeService.getAllContacts()];
  }

  public updateContact(contact: WalletContact): void {
    this.storeService.saveContact(contact);
  }
}
