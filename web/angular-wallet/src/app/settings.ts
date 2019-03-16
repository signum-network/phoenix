
/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

import { constants } from "./constants";
import { environment } from "../environments/environment";

/*
* Settings class
*
* The Settings class holds the settings for a device.
*/
export class Settings {
    public id: string;
    public contacts: string[];
    public currency: string;
    public language: string;
    public node: string;
    public theme: string;
    public version: string;
    public marketUrl: string;
    public agree = false;

    constructor(data: any = {}) {
        this.id = "settings";
        if (data.contacts != undefined && data.contacts.length > 0) {
            this.contacts = data.contacts;
        } else {
            this.contacts = [];
        }
        this.currency = data.currency || constants.defaultCurrency;
        this.language = data.language || constants.defaultLanguage;
        this.node = data.node || environment.defaultNode;
        this.marketUrl = data.marketUrl || environment.market.tickerUrl;
        this.theme = data.theme || constants.defaultTheme;
        this.version = data.version || constants.version;
        this.agree = data.agree || this.agree;
    }
}
