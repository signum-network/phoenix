import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestFeeResolver } from './suggest-fee.resolver';
import { NetworkService } from './network.service';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule
  ],
  providers: [ SuggestFeeResolver, NetworkService ]
})
export class NetworkModule { }
