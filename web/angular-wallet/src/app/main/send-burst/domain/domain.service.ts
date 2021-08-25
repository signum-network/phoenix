import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AddressPrefix} from '@signumjs/core';

interface UnstoppableResponse {
  addresses: {
    BURST: string
    SIGNA: string
  };
  meta: {
    owner: string,
    ttl: number
  };
}

@Injectable()
export class DomainService {
  constructor(private httpClient: HttpClient) {
  }

  public isUnstoppableDomain(address: string): boolean {
    return /.+\.zil|crypto|888|x|coin|wallet|bitcoin|nft|dao|blockchain$/.test(address.toLowerCase());
  }

  public async getUnstoppableAddress(domain: string): Promise<string> {
    const response = await this.httpClient.get<UnstoppableResponse>(`https://unstoppabledomains.com/api/v1/${domain.toLowerCase()}`).toPromise()
    const address = response.addresses.BURST || response.addresses.SIGNA;
    return address ? address.replace(/^BURST/, AddressPrefix.MainNet) : null;
  }

}
