/* global process */

/**
 *
 * Checks if the code is running on nodejs
 * @internal
 *
 * @module monitor
 */
// @ts-ignore
export const isNode = () => typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
