import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ZilResponse {
  addresses: {
    'BURST': string
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

  public getZilAddress(address: string): Promise<string> {
    return this.httpClient.get<ZilResponse>(`https://unstoppabledomains.com/api/v1/${address.toLowerCase()}`).toPromise()
      .then((response) => {
        return response.addresses['BURST'];
      });
  }

}
