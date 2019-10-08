
/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

import { constants } from './constants';
import { environment } from '../environments/environment';
import { version } from '../../package.json';

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
    public nodeVersion: string;
    public nodeEndpoint: string;
    public theme: string;
    public version: string;
    public marketUrl: string;

    // user agreed to disclaimer
    public agree = false;

    // user collapsed welcome message for these accounts
    public welcomeMessageHiddenFrom: string[];

    constructor(data: any = {}) {
        this.id = 'settings';
        if (data.contacts !== undefined && data.contacts.length > 0) {
            this.contacts = data.contacts;
        } else {
            this.contacts = [];
        }
        this.currency = data.currency || constants.defaultCurrency;
        this.language = data.language || constants.defaultLanguage;
        this.node = data.node || environment.defaultNode;
        this.nodeEndpoint = data.nodeEndpoint || environment.defaultNodeEndpoint;
        this.nodeVersion = data.nodeVersion || environment.nodeVersion;
        this.marketUrl = data.marketUrl || environment.market.tickerUrl;
        this.theme = data.theme || constants.defaultTheme;
        this.version = data.version || version;
        this.agree = data.agree || this.agree;
        this.welcomeMessageHiddenFrom = data.welcomeMessageHiddenFrom || [];
    }
}
