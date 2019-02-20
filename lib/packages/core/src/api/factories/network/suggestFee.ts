/** @ignore */
/** @module core */

/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../../burstService';
import { SuggestedFees } from '../../../typings/suggestedFees';
import { ApiError } from '../../../typings/api/apiError';

export const suggestFee = (service: BurstService): () => Promise<SuggestedFees | ApiError> =>
    (): Promise<SuggestedFees | ApiError> => service.query('suggestFee');
