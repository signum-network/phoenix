/**
 * Copyright (c) 2020 Burst Apps Team
 */
import {getSuggestedFees} from './getSuggestedFees';

/**
 * Use with [[ApiComposer]] and belongs to [[NetworkApi]].
 *
 * See details at [[NetworkApi.getSuggestedFees]]
 * @deprecated Use getSuggestedFees
 * <div class="deprecated">
 *     Use [[NetworkApi.getSuggestedFees]] instead
 * </div>
 * @module core.api.factories
 */
export const suggestFee = getSuggestedFees;
