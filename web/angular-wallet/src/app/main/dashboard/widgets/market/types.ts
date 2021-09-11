export interface MarketInfoCryptoCompare {
  readonly BTC: CurrencyDataRaw;
  readonly USD: CurrencyDataRaw;
  readonly EUR: CurrencyDataRaw;
}

export interface CurrencyDataRaw {
  readonly TYPE: string;
  readonly MARKET: string;
  readonly FROMSYMBOL: string;
  readonly TOSYMBOL: string;
  readonly FLAGS: string;
  readonly PRICE: number;
  readonly LASTUPDATE: number;
  readonly MEDIAN: number;
  readonly LASTVOLUME: number;
  readonly LASTVOLUMETO: number;
  readonly LASTTRADEID: string;
  readonly VOLUMEDAY: number;
  readonly VOLUMEDAYTO: number;
  readonly VOLUME24HOUR: number;
  readonly VOLUME24HOURTO: number;
  readonly OPENDAY: number;
  readonly HIGHDAY: number;
  readonly LOWDAY: number;
  readonly OPEN24HOUR: number;
  readonly HIGH24HOUR: number;
  readonly LOW24HOUR: number;
  readonly LASTMARKET: string;
  readonly VOLUMEHOUR: number;
  readonly VOLUMEHOURTO: number;
  readonly OPENHOUR: number;
  readonly HIGHHOUR: number;
  readonly LOWHOUR: number;
  readonly TOPTIERVOLUME24HOUR: number;
  readonly TOPTIERVOLUME24HOURTO: number;
  readonly CHANGE24HOUR: number;
  readonly CHANGEPCT24HOUR: number;
  readonly CHANGEDAY: number;
  readonly CHANGEPCTDAY: number;
  readonly CHANGEHOUR: number;
  readonly CHANGEPCTHOUR: number;
  readonly CONVERSIONTYPE: string;
  readonly CONVERSIONSYMBOL: string;
  readonly SUPPLY: number;
  readonly MKTCAP: number;
  readonly TOTALVOLUME24H: number;
  readonly TOTALVOLUME24HTO: number;
  readonly TOTALTOPTIERVOLUME24H: number;
  readonly TOTALTOPTIERVOLUME24HTO: number;
}


