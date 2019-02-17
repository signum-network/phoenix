/** @module http */

/**
 *Copyright (c) 2019 Burst Apps Team
 */

/**
 * Http Response
 *
 * Returned by Http request
 */
export default class HttpResponse {
    constructor(public status: number, public response: any) {}
}
