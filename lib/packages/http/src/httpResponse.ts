/**
 *Copyright (c) 2019 Burst Apps Team
 */

/**
 * Http Response
 *
 * Returned by Http request
 * @module http
 */
export class HttpResponse {
    constructor(public status: number, public response: any) {}
}
