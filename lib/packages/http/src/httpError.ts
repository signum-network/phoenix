/**
 * Original work Copyright (c) 2018 PoC-Consortium  
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/*
* HttpError class
*
* Thrown on HTTP errors
*
*/
export default class HttpError {
    public timestamp: number = Date.now();
    constructor(public requestUrl: string, public status: number, public message: string, public data: any) {}
}
