class HttpResponse {
    constructor(status, response, error = null){
        this.__response = response;
        this.__status = status;
        this._error = error;
    }

    get response() { return this.__response }
    get status() { return this.__status }
    get error() { return this._error }
    hasError() { return !!this._error; }
}

export default HttpResponse;
