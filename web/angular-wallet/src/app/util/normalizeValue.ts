/**
 * Returns [0,1]
 * @param v value within range
 * @param floor lowest value
 * @param ceil highest value
 */
export const normalizeValue = (v: number, floor: number, ceil: number): number => (v - floor) / (ceil - floor);
