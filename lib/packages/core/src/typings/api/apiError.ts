/** @module core */

/**
 * Original work Copyright (c) 2019 Burst Apps Team
 */

/**
* Error
*
* The Error type, returned by BRS Api
*/
export interface ApiError {
    readonly errorCode: number;
    readonly errorDescription: string;
}
