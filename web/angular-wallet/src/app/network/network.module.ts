import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuggestFeeResolver } from './suggest-fee.resolver';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ SuggestFeeResolver ]
})
export class NetworkModule { }
