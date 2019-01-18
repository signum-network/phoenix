/*
* Copyright 2018 PoC-Consortium
*/

/*
* HttpError class
*
* Thrown on HTTP errors
*
* TODO: seems a specific BRS structure
*/
export default class HttpError {
    public status: number;
    public error: string;
    public exception: string;
    public message: string;
    public path: string;
    public timestamp: Date;
    public errorCode: number;

    constructor (data: any = {}) {
        this.status = data.status || 0;
        this.error = data.error || '';
        this.exception = data.exception || '';
        this.message = data.message || '';
        this.path = data.path || '';
        this.timestamp = data.timestamp || Date.now();
        this.errorCode = data.errorCode || 0;
    }
}
