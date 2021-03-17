/**
 * Copyright (c) 2019 Burst Apps Team
 */

/**
 * HttpError class
 *
 * Thrown on HTTP errors
 * @module http
 */
export class HttpError {
    public timestamp: number = Date.now();

    constructor(public requestUrl: string,
                public status: number,
                public message: string,
                public data: any) {
    }
}
