/** @module core */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Asset
 *
 * The Burst Asset Exchange is a built-in peer-to-peer exchange integrated into the Burst Wallet.
 * It allows fast, secure, and decentralized trading of Burst Assets.
 * Because of its decentralized nature, there’s no need for outside organizations or agencies
 * to meddle with its affairs, resulting in improved efficiency and reduced costs.
 */
export interface Asset {
    account: string;
    accountRS: string;
    name: string;
    description: string;
    decimals: number;
    quantityQNT: string;
    asset: string;
    numberOfTrades: number;
    numberOfTransfers: number;
    numberOfAccounts: number;
}
