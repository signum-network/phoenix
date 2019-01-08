import HttpResponse from "./httpResponse";

class Http {

    get(url) {
        return Promise.resolve(new HttpResponse(200, `get ${url}`));
    }
    post(url, data){
        return Promise.resolve(new HttpResponse(200, `post ${url}: ${JSON.stringify(data, null, '  ')}`));
    }
    put(url, data){
        return Promise.resolve(new HttpResponse(200, `put ${url}: ${JSON.stringify(data, null, '  ')}`));
    }
    delete(url){
        return Promise.resolve(new HttpResponse(200, `delete ${url}`));
    }
}

export default Http;
