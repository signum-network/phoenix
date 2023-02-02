import { Pipe, PipeTransform } from '@angular/core';
import { NetworkService } from '../../network/network.service';
import { formatAddress } from 'app/util/formatAddress';

@Pipe({
  name: 'address',
  pure: false
})
export class AddressPipe implements PipeTransform {

  constructor(private networkService: NetworkService) {
  }

  transform(accountIdOrAddress: string,
            isShortForm: boolean = false,
            noPrefix: boolean = false
  ): string {
    const currentPrefix = this.networkService.getAddressPrefix();
    return formatAddress(accountIdOrAddress, {
      isShortForm,
      prefix: noPrefix ? undefined : currentPrefix
    });
  }
}
