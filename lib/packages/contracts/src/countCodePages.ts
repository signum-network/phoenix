/** @module contracts */

/**
 * Copyright (c) 2019 Burst Apps Team
 */

import {CodePageSize} from './constants';

/**
 * Counts the code pages for given machine code
 *
 * @param hexCode The contracts code in hex form
 * @return The number of code pages for the passed code
 */
export function countCodePages(hexCode: string ): number {
    return Math.ceil((hexCode.length / 2) / CodePageSize);
}
