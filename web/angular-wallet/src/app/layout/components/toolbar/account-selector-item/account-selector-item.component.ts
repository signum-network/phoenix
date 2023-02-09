import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { WalletAccount } from 'app/util/WalletAccount';
import { DescriptorData } from '@signumjs/standards';
import { NetworkService } from '../../../../network/network.service';
import hashicon from 'hashicon';
import { Address } from '@signumjs/core';

@Component({
  selector: 'app-account-selector-item',
  templateUrl: './account-selector-item.component.html',
  styleUrls: ['./account-selector-item.component.scss']
})
export class AccountSelectorItemComponent implements OnChanges {

  @Input() account: WalletAccount;
  @ViewChild('avatar', { static: false }) avatar: ElementRef<HTMLCanvasElement>;
  avatarImgSrc: string;
  src44: DescriptorData;
  shortAddress: string;

  constructor(private networkService: NetworkService) {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.account.previousValue === changes.account.currentValue){
      return;
    }

    if (this.account){
      setTimeout(() => this.updateAvatar());
      this.shortAddress = Address.create(this.account.account).getReedSolomonAddress(false);
    }
  }

  private updateAvatar(): void {
    this.avatarImgSrc = null;
    try {
      const src44 = DescriptorData.parse(this.account.description, false);
      this.avatarImgSrc = src44.avatar ? this.networkService.getIpfsCidUrl(src44.avatar.ipfsCid) : '';
    } catch (e) {
      // ignore
    }

    if (!this.avatarImgSrc) {
      this.avatarImgSrc = hashicon(this.account.account).toDataURL();
    }
  }

  short(s: string): string {
    return s.length > 15 ? `${s.substr(0, 4)}...${s.substr(s.length - 4)}` : s;
  }
}
