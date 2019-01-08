class HttpResponse {
    constructor(status, response){
        this.__response = response;
        this.__status = status;
    }

    get response() { return this.__response }
    get status() { return this.__status }
}

export default HttpResponse;
