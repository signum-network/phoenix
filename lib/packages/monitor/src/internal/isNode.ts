/**
 * Copyright (c) 2020 Burst Apps Team
 */

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
