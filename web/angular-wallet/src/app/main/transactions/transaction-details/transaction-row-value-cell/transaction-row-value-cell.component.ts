import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Address, Asset, Transaction } from '@signumjs/core';
import {decryptMessage, EncryptedMessage} from '@signumjs/crypto';
import {AccountService} from 'app/setup/account/account.service';
import {CellValue} from '../cell-value-mapper';
import {NotifierService} from 'angular-notifier';
import {I18nService} from 'app/shared/services/i18n.service';
import {NetworkService} from 'app/network/network.service';
import { AccountManagementService } from 'app/shared/services/account-management.service';
import { getPrivateEncryptionKey } from 'app/util/security/getPrivateEncryptionKey';
import { TokenService } from '../../../../shared/services/token.service';
import { ChainValue } from '@signumjs/util';
import { AppService } from "../../../../app.service";
import { LedgerService } from "../../../../ledger.service";


interface AssetInfo {
  name: string;
  id: string;
  qnt: string;
}

@Component({
  selector: 'app-transaction-row-value-cell',
  templateUrl: './transaction-row-value-cell.component.html',
  styleUrls: ['./transaction-row-value-cell.component.scss']
})
export class TransactionRowValueCellComponent implements OnInit {

  @Input() value: CellValue;
  @Input() transaction: Transaction;
  @ViewChild('pin', {static: false}) pin: string;


  fetchedMultiAssets: AssetInfo[] | null =  null;
  decryptedMessage = '';
  fetchedAssetOwnershipReference: AssetInfo | null = null;
  constructor(
    private accountService: AccountService,
    private accountManagementService: AccountManagementService,
    private notifierService: NotifierService,
    private appService: AppService,
    private i18nService: I18nService,
    private networkService: NetworkService,
    private tokenService: TokenService,
    private ledgerService: LedgerService,
  ) {
  }

    ngOnInit(): void {

      if (this.value.type === 'AssetMultiTransfer'){
        this.fetchMultiAssets(this.value);
      }
         }


  public async decrypt(): Promise<void> {
    event.stopImmediatePropagation();
    const account = this.accountManagementService.getSelectedAccount();
    let senderPublicKey = this.transaction.senderPublicKey;
    if (account.account === this.transaction.sender) {
      const recipient = await this.accountService.getAccount(this.transaction.recipient);
      senderPublicKey = recipient.keys.publicKey;
    }
    const privateKey = getPrivateEncryptionKey(this.pin, account.keys);
    try {
      this.decryptedMessage = decryptMessage(<EncryptedMessage>this.value.data.encryptedMessage, senderPublicKey, privateKey);
    } catch (e) {
      this.notifierService.notify('error', this.i18nService.getTranslation('wrong_pin'));
    }
  }

  public getReedSolomonAddress(numericId: string): string {
    return Address.fromNumericId(numericId, this.networkService.getAddressPrefix()).getReedSolomonAddress();
  }

  convertAddressToNumericId(address: string): string {
    return Address.fromReedSolomonAddress(address).getNumericId();
  }

  decryptOnEnter($event: KeyboardEvent): void {
    if ($event.key === 'Enter'){
      this.decrypt();
    }
  }


  private async fetchMultiAssets(value: CellValue): Promise<void> {
    try{
      const fetchTokens = value.data.assetIds.map(tokenIds => this.tokenService.fetchSingleTokenInfo(tokenIds));
      const tokens  = (await Promise.all(fetchTokens)) as Asset[];

      this.fetchedMultiAssets = tokens.map((t, index) => {
        return  {
          qnt: ChainValue.create(t.decimals).setAtomic(value.data.quantitiesQNT[index]).getCompound(),
          name: t.name,
          id: t.asset
        };
      });

      console.log(this.fetchedMultiAssets)

    }catch (e){
      console.error('Could not fetch tokens', e.message);
    }
  }

  openAssetInExplorer(assetInfo: AssetInfo): void {
    const host = this.networkService.getChainExplorerHost();
    const url = `${host}/asset/${assetInfo.id}`;
    if (!this.appService.isDesktop()) {
      window.open(url, 'blank');
    } else {
      this.appService.openInBrowser(url);
    }
  }
}

