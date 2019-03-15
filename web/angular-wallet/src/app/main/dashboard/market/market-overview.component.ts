import {Component, OnDestroy, OnInit} from '@angular/core';
import {formatCurrency, formatPercent} from '@angular/common';
import {MarketService} from './market.service';
import {takeWhile} from 'rxjs/operators';
import {MarketTicker} from './types';

interface TickerDataField {
  key: string;
  value: string;
}

@Component({
  selector: 'app-market-overview',
  templateUrl: './market-overview.component.html'
})
export class MarketOverviewComponent implements OnInit, OnDestroy {
  private tickerData: TickerDataField[] = [];
  private _isActive = true;

  public isLoading = true;

  constructor(private marketService: MarketService) {
  }

  public ngOnInit(): void {
    this.marketService.ticker$
      .pipe(
        takeWhile(this.isActive)
      )
      .subscribe(tickerData => {
        this.isLoading = false;
        this.mapTickerData(tickerData);
      });
  }

  ngOnDestroy(): void {
    this._isActive = false;
  }

  isActive = () => this._isActive;

  mapTickerData(tickerData: MarketTicker): any {

    // TODO: need to fetch locale from i18n
    const locale = 'en';
    const dataFields = {
      price_btc: {
        label: 'Price BTC',
        mapper: ({price_btc}: MarketTicker) => `${price_btc} BTC`
      },
      price_usd: {
        label: 'Price USD',
        mapper: ({price_usd}: MarketTicker) => `${price_usd} USD`
      },
      '24h_volume_usd': {
        label: '24h Volume',
        mapper: (data: MarketTicker) => `${formatCurrency(parseFloat(data['24h_volume_usd']), locale, '', )} USD`,
      },
      available_supply: {
        label: 'Circulating Supply',
        mapper: ({available_supply}: MarketTicker) => `${formatCurrency(parseFloat(available_supply), locale, '', )} BURST`
      },
      supply_relative: {
        label: 'Relative Supply',
        mapper: ({available_supply, max_supply}: MarketTicker) => {
          const supply = parseFloat(available_supply);
          const relative_supply = supply > 0 ? (supply / parseFloat(max_supply)) : 0;
          return `${formatPercent(relative_supply, locale)}`;
        }
      },
      market_cap_usd: {
        label: 'Market Cap',
        mapper: ({market_cap_usd}) => `${formatCurrency(parseFloat(market_cap_usd), 'en', '', )} USD`
      },
      percent_change_24h: {
        label: 'Yesterday\'s change',
        mapper: ({percent_change_24h}: MarketTicker) => `${parseFloat(percent_change_24h).toFixed(2)} %`
      },
      rank: {
        label: 'Market Rank',
        mapper: ({rank}: MarketTicker) => rank
      },
    };

    this.tickerData = Object.keys(dataFields).map(k =>
      ({
        key: dataFields[k].label,
        value: dataFields[k].mapper(tickerData)
      })
    );
  }
}
