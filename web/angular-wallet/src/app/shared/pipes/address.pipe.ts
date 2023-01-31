import { Pipe, PipeTransform } from '@angular/core';
import { NetworkService } from '../../network/network.service';
import { formatAddress } from 'app/util/formatAddress';

@Pipe({
  name: 'address',
  pure: true
})
export class AddressPipe implements PipeTransform {

  constructor(private networkService: NetworkService) {
  }

  transform(accountIdOrAddress: string,
            isShortForm: boolean = false,
            noPrefix: boolean = false
  ): string {
    const currentPrefix = this.networkService.getAddressPrefix();

    console.log('AddressPipe prefix', currentPrefix)
    return formatAddress(accountIdOrAddress, {
      isShortForm,
      prefix: noPrefix ? undefined : currentPrefix
    });
  }
}
