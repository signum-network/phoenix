import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestFeeResolver } from './suggest-fee.resolver';
import { NetworkService } from './network.service';
import { MiningInfoResolver } from './mining-info.resolver';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule
  ],
  providers: [ MiningInfoResolver, SuggestFeeResolver, NetworkService ]
})
export class NetworkModule { }
