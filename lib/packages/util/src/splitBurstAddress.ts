/**
 * Original work Copyright (c) 2018 PoC-Consortium  
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/**
 * Split the Burst address string into an array of 4 parts
 * @param address A valid Burst address
 */
export const splitBurstAddress = (address: string): string[] => {
    const parts: string[] = address.split('-');
    parts.shift();
    if (parts.length === 4) {
        return parts;
    } else {
        return [];
    }
}
