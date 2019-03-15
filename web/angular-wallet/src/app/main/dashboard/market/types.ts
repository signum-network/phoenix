export interface MarketTicker {
  readonly '24h_volume_usd': string;
  readonly available_supply: string;
  readonly id: string;
  readonly last_updated: string;
  readonly market_cap_usd: string;
  readonly max_supply: string;
  readonly name: string;
  readonly percent_change_1h: string;
  readonly percent_change_7d: string;
  readonly percent_change_24h: string;
  readonly price_btc: string;
  readonly price_usd: string;
  readonly rank: string;
  readonly symbol: string;
  readonly total_supply: string;
}
