/**
 * Original work Copyright (c) 2018 PoC-Consortium  
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

import { isValid } from "./isValid";

/**
 * Validation Check. Quick validation of Burst addresses included
 * @param address Burst Address
 */
export const isBurstAddress = (address: string): boolean => {
    return /^BURST\-[A-Z0-9]{4}\-[A-Z0-9]{4}\-[A-Z0-9]{4}\-[A-Z0-9]{5}/i.test(address) && isValid(address);
}