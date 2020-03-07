/** @module core */

/**
 * Original work Copyright (c) 2020 Burst Apps Team
 */

import {Subscription} from './subscription';

export interface SubscriptionList {
    readonly requestProcessingTime: number;
    readonly subscriptions: Subscription[];
}
