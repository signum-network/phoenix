import {NgModule} from '@angular/core';
import {LedgerService} from './ledger.service';
import {Injectable} from '@angular/core';
import {AppService} from '../app.service';
import Transport from '@ledgerhq/hw-transport';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';

@NgModule({
  imports: [
    Transport,
    TransportWebUSB,
    TransportNodeHid,
    Injectable,
    AppService
  ],
  exports: [
    LedgerService,
  ],
  providers: [
    LedgerService,
  ],
})
export class LedgerModule {
}
