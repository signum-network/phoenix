/**
 * Copyright (c) 2019 Burst Apps Team
 */
import { BurstService } from '../../burstService';
import { SuggestedFees } from '../../suggestedFees';

/**
 * Get the current suggested fees
 * @return {Promise<SuggestedFees>} The Suggested Fees
 */
export const suggestFee = (service: BurstService): () => Promise<SuggestedFees> =>
    (): Promise<SuggestedFees> => service.query('suggestFee');
