/*
* Copyright 2018 PoC-Consortium
*/

/*
* Currency class
*
* The Currency class is a mapping of the currency json object provided by coinmarketcap.com's API.
*/
export class Currency {
    public id: string;
    public availableSupply: number;
    public currency: string;
    public lastUpdated: number;
    public marketCapCur: number;
	public marketCapUSD: number;
    public name: string;
	public percentChange1h: number;
	public percentChange24h: number;
	public percentChange7d: number;
    public priceBTC: number;
    public priceCur: number;
	public priceUSD: number;
    public rank: number;
    public symbol: string;
    public totalSupply: number;
    public volume24h: number;
    public volume24hCur: number;

    constructor(data:any = {}) {
        this.id = data.id || "";
        this.availableSupply = data.avalaible_supply || 0;
        this.currency = data.currency != undefined ? data.currency : "USD";
        this.lastUpdated = data.last_updated || 0;
        this.marketCapCur = data["market_cap_" + this.currency] || "";
        this.marketCapUSD = data.market_cap_usd || 0;
		this.name = data.name || "";
        this.percentChange1h = data.percent_change_1h || 0;
        this.percentChange24h = data.percent_change_24h || 0;
        this.percentChange7d = data.percent_change_7d || 0;
        this.priceBTC = data.price_btc || 0;
        this.priceCur = data["price_" + this.currency.toLowerCase()] || "";
        this.priceUSD = data.price_usd || 0;
        this.rank = data.rank || 0;
		this.symbol = data.symbol || "";
        this.totalSupply = data.total_supply || 0;
        this.volume24h = data["24h_volume_usd"] || 0;
        this.volume24hCur = data["24h_volume_" + this.currency] || "";
    }
}
