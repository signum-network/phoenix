/** @module core.api.factories */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../../service/burstService';
import { SuggestedFees } from '../../../typings/suggestedFees';

/**
 * Use with [[ApiComposer]] and belongs to [[NetworkApi]].
 *
 * See details at [[NetworkApi.suggestFee]]
 */
export const suggestFee = (service: BurstService): () => Promise<SuggestedFees> =>
    (): Promise<SuggestedFees> => service.query('suggestFee');
