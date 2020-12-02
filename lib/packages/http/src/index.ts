/**
 * The Http Module is a thin wrapper around the isomorhpic Http Implementation [axios](https://github.com/axios/axios)
 * It mainly unifies responses such that its use is consistent
 *
 * @moduledefinition http
 */

import Http from './http';
import HttpResponse from './httpResponse';
import HttpError from './httpError';
import HttpMockBuilder from './httpMockBuilder';
import HttpImpl from './httpImpl';

const HttpClient = HttpImpl;

export {
    Http,
    HttpClient,
    HttpImpl,
    HttpResponse,
    HttpMockBuilder,
    HttpError
};

