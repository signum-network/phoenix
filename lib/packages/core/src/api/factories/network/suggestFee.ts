/** @ignore */
/** @module core */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../../service/burstService';
import { SuggestedFees } from '../../../typings/suggestedFees';

export const suggestFee = (service: BurstService): () => Promise<SuggestedFees> =>
    (): Promise<SuggestedFees> => service.query('suggestFee');
