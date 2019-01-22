/*
* Copyright 2018 PoC-Consortium
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
