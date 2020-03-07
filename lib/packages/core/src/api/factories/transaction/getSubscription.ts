/** @module core.api.factories */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */
import {BurstService} from '../../../service/burstService';
import {Subscription} from '../../../typings/subscription';

/**
 * Use with [[ApiComposer]] and belongs to [[TransactionApi]].
 *
 * See details at [[TransactionApi.getSubscription]]
 */
export const getSubscription = (service: BurstService):
    (subscriptionId: string) => Promise<Subscription> =>
    (subscriptionId: string): Promise<Subscription> =>
        service.query('getSubscription', {subscription: subscriptionId});
