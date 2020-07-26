/**
 * Copyright (c) 2020 Burst Apps Team
 */
import {BurstService} from '../../../service';
import {RewardRecipient} from '../../..';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.getRewardRecipient]]
 * @module core.api.factories
 */
export const getRewardRecipient = (service: BurstService):
    (accountId: string) => Promise<RewardRecipient> =>
    async (accountId: string): Promise<RewardRecipient> => {
        const parameters = {
            account: accountId
        };

        return await service.query<RewardRecipient>('getRewardRecipient', parameters);

    };
