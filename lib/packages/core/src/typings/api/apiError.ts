/** @module core */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
* Error
*
* The Error type, returned by BRS Api
*/
// TODO: use this in exception handling
export interface ApiError {
    readonly errorCode: number;
    readonly errorDescription: string;
}
