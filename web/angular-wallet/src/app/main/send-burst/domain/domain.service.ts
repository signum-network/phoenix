import {Injectable} from '@angular/core';
import { Namicorn } from 'namicorn';

@Injectable()
export class DomainService {
  private namicorn = new Namicorn();

  constructor() {
  }

  public getZilAddress(address: string): Promise<string> {
    return this.namicorn.address(address.toLowerCase(), 'BURST');
  }

}
