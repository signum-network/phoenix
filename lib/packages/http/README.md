# @burstjs/http

Generic HTTP client that is used as a network provider for @burst/core.

## Installation

`@burstjs/http` can be used with NodeJS or Web. Two formats are available

### Using with NodeJS and/or modern web frameworks

Install using [npm](https://www.npmjs.org/):

```
npm install @burstjs/http
```

or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @burstjs/http
```

#### Example

```js
import {HttpImpl} from '@burstjs/http'

try{
    const client = new HttpImpl('https://jsonplaceholder.typicode.com/');
    const response = client.get('/todos/1')
    console.log(response)
}
catch(httpError){
    console.error(httpError.message)
}

```

### Using in classic `<script>`

Each package is available as bundled standalone library using IIFE.
This way _burstJS_ can be used also within `<script>`-Tags.
This might be useful for Wordpress and/or other PHP applications.

Just import the package using the HTML `<script>` tag.

`<script src='https://cdn.jsdelivr.net/npm/@burstjs/http/dist/burstjs.http.min.js'></script>`

#### Example

```js
const client = new b$http.HttpImpl('https://jsonplaceholder.typicode.com/');
client.get('/todos/1').then(console.log)
```

See more here:

[@burstjs/http Online Documentation](https://burstappsteam.org/phoenix/modules/http.html)

---

## API Reference
## Modules

<dl>
<dt><a href="#module_http">http</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#HttpImpl">HttpImpl</a></dt>
<dd><p>Generic Http client</p></dd>
</dl>

<a name="module_http"></a>

## http

* [http](#module_http)
    * [~HttpError](#module_http..HttpError)
    * [~HttpMock](#module_http..HttpMock)
        * [.onGet(endpoint?)](#module_http..HttpMock.onGet)
        * [.onPost(endpoint?)](#module_http..HttpMock.onPost)
        * [.onPut(endpoint?)](#module_http..HttpMock.onPut)
        * [.onDelete(endpoint?)](#module_http..HttpMock.onDelete)
        * [.reset()](#module_http..HttpMock.reset)
    * [~HttpResponse](#module_http..HttpResponse)

<a name="module_http..HttpError"></a>

### http~HttpError
<p>HttpError class</p>
<p>Thrown on HTTP errors</p>

**Kind**: inner class of [<code>http</code>](#module_http)  
<a name="module_http..HttpMock"></a>

### http~HttpMock
<p>Http Mocker for easy to http testing using Jest</p>
<p>When using this mocking helper you need to call <code>Http.onGet()</code>
before Http instance is created</p>

**Kind**: inner class of [<code>http</code>](#module_http)  

* [~HttpMock](#module_http..HttpMock)
    * [.onGet(endpoint?)](#module_http..HttpMock.onGet)
    * [.onPost(endpoint?)](#module_http..HttpMock.onPost)
    * [.onPut(endpoint?)](#module_http..HttpMock.onPut)
    * [.onDelete(endpoint?)](#module_http..HttpMock.onDelete)
    * [.reset()](#module_http..HttpMock.reset)

<a name="module_http..HttpMock.onGet"></a>

#### HttpMock.onGet(endpoint?)
<p>Mocks responses for get methods
You may pass a specific endpoint as parameter to mock only selected endpoints.
This is very useful, when having methods that do several Http requests,
so you can mock them one on one.</p>
<p>The following code returns the same content on <em>every</em> get call</p>
<pre class="prettyprint source"><code>  HttpMock.onGet().reply(200, [{login: 'foo'}, {login: 'bar'}]);
</code></pre>
<p>The next code returns the different content depending on the passed endpoint</p>
<pre class="prettyprint source"><code>  HttpMock.onGet('/foo').reply(200, {data: 'foo'});
  HttpMock.onGet('/bar').reply(200, {data: 'bar'});
</code></pre>

**Kind**: static method of [<code>HttpMock</code>](#module_http..HttpMock)  

| Param | Description |
| --- | --- |
| endpoint? | <p>An endpoint, to allow specific behavior on that endpoint</p> |

<a name="module_http..HttpMock.onPost"></a>

#### HttpMock.onPost(endpoint?)
<p>Mocks responses for post methods</p>

**Kind**: static method of [<code>HttpMock</code>](#module_http..HttpMock)  

| Param | Description |
| --- | --- |
| endpoint? | <p>An endpoint, to allow specific behavior on that endpoint</p> |

<a name="module_http..HttpMock.onPut"></a>

#### HttpMock.onPut(endpoint?)
<p>Mocks responses for put methods</p>

**Kind**: static method of [<code>HttpMock</code>](#module_http..HttpMock)  

| Param | Description |
| --- | --- |
| endpoint? | <p>An endpoint, to allow specific behavior on that endpoint</p> |

<a name="module_http..HttpMock.onDelete"></a>

#### HttpMock.onDelete(endpoint?)
<p>Mocks responses for delete methods</p>

**Kind**: static method of [<code>HttpMock</code>](#module_http..HttpMock)  

| Param | Description |
| --- | --- |
| endpoint? | <p>An endpoint, to allow specific behavior on that endpoint</p> |

<a name="module_http..HttpMock.reset"></a>

#### HttpMock.reset()
<p>Resets all mocked behavior</p>

**Kind**: static method of [<code>HttpMock</code>](#module_http..HttpMock)  
<a name="module_http..HttpResponse"></a>

### http~HttpResponse
<p>Http Response</p>
<p>Returned by Http request</p>

**Kind**: inner class of [<code>http</code>](#module_http)  
<a name="module_http"></a>

## http

* [http](#module_http)
    * [~HttpError](#module_http..HttpError)
    * [~HttpMock](#module_http..HttpMock)
        * [.onGet(endpoint?)](#module_http..HttpMock.onGet)
        * [.onPost(endpoint?)](#module_http..HttpMock.onPost)
        * [.onPut(endpoint?)](#module_http..HttpMock.onPut)
        * [.onDelete(endpoint?)](#module_http..HttpMock.onDelete)
        * [.reset()](#module_http..HttpMock.reset)
    * [~HttpResponse](#module_http..HttpResponse)

<a name="module_http..HttpError"></a>

### http~HttpError
<p>HttpError class</p>
<p>Thrown on HTTP errors</p>

**Kind**: inner class of [<code>http</code>](#module_http)  
<a name="module_http..HttpMock"></a>

### http~HttpMock
<p>Http Mocker for easy to http testing using Jest</p>
<p>When using this mocking helper you need to call <code>Http.onGet()</code>
before Http instance is created</p>

**Kind**: inner class of [<code>http</code>](#module_http)  

* [~HttpMock](#module_http..HttpMock)
    * [.onGet(endpoint?)](#module_http..HttpMock.onGet)
    * [.onPost(endpoint?)](#module_http..HttpMock.onPost)
    * [.onPut(endpoint?)](#module_http..HttpMock.onPut)
    * [.onDelete(endpoint?)](#module_http..HttpMock.onDelete)
    * [.reset()](#module_http..HttpMock.reset)

<a name="module_http..HttpMock.onGet"></a>

#### HttpMock.onGet(endpoint?)
<p>Mocks responses for get methods
You may pass a specific endpoint as parameter to mock only selected endpoints.
This is very useful, when having methods that do several Http requests,
so you can mock them one on one.</p>
<p>The following code returns the same content on <em>every</em> get call</p>
<pre class="prettyprint source"><code>  HttpMock.onGet().reply(200, [{login: 'foo'}, {login: 'bar'}]);
</code></pre>
<p>The next code returns the different content depending on the passed endpoint</p>
<pre class="prettyprint source"><code>  HttpMock.onGet('/foo').reply(200, {data: 'foo'});
  HttpMock.onGet('/bar').reply(200, {data: 'bar'});
</code></pre>

**Kind**: static method of [<code>HttpMock</code>](#module_http..HttpMock)  

| Param | Description |
| --- | --- |
| endpoint? | <p>An endpoint, to allow specific behavior on that endpoint</p> |

<a name="module_http..HttpMock.onPost"></a>

#### HttpMock.onPost(endpoint?)
<p>Mocks responses for post methods</p>

**Kind**: static method of [<code>HttpMock</code>](#module_http..HttpMock)  

| Param | Description |
| --- | --- |
| endpoint? | <p>An endpoint, to allow specific behavior on that endpoint</p> |

<a name="module_http..HttpMock.onPut"></a>

#### HttpMock.onPut(endpoint?)
<p>Mocks responses for put methods</p>

**Kind**: static method of [<code>HttpMock</code>](#module_http..HttpMock)  

| Param | Description |
| --- | --- |
| endpoint? | <p>An endpoint, to allow specific behavior on that endpoint</p> |

<a name="module_http..HttpMock.onDelete"></a>

#### HttpMock.onDelete(endpoint?)
<p>Mocks responses for delete methods</p>

**Kind**: static method of [<code>HttpMock</code>](#module_http..HttpMock)  

| Param | Description |
| --- | --- |
| endpoint? | <p>An endpoint, to allow specific behavior on that endpoint</p> |

<a name="module_http..HttpMock.reset"></a>

#### HttpMock.reset()
<p>Resets all mocked behavior</p>

**Kind**: static method of [<code>HttpMock</code>](#module_http..HttpMock)  
<a name="module_http..HttpResponse"></a>

### http~HttpResponse
<p>Http Response</p>
<p>Returned by Http request</p>

**Kind**: inner class of [<code>http</code>](#module_http)  
<a name="module_http"></a>

## http

* [http](#module_http)
    * [~HttpError](#module_http..HttpError)
    * [~HttpMock](#module_http..HttpMock)
        * [.onGet(endpoint?)](#module_http..HttpMock.onGet)
        * [.onPost(endpoint?)](#module_http..HttpMock.onPost)
        * [.onPut(endpoint?)](#module_http..HttpMock.onPut)
        * [.onDelete(endpoint?)](#module_http..HttpMock.onDelete)
        * [.reset()](#module_http..HttpMock.reset)
    * [~HttpResponse](#module_http..HttpResponse)

<a name="module_http..HttpError"></a>

### http~HttpError
<p>HttpError class</p>
<p>Thrown on HTTP errors</p>

**Kind**: inner class of [<code>http</code>](#module_http)  
<a name="module_http..HttpMock"></a>

### http~HttpMock
<p>Http Mocker for easy to http testing using Jest</p>
<p>When using this mocking helper you need to call <code>Http.onGet()</code>
before Http instance is created</p>

**Kind**: inner class of [<code>http</code>](#module_http)  

* [~HttpMock](#module_http..HttpMock)
    * [.onGet(endpoint?)](#module_http..HttpMock.onGet)
    * [.onPost(endpoint?)](#module_http..HttpMock.onPost)
    * [.onPut(endpoint?)](#module_http..HttpMock.onPut)
    * [.onDelete(endpoint?)](#module_http..HttpMock.onDelete)
    * [.reset()](#module_http..HttpMock.reset)

<a name="module_http..HttpMock.onGet"></a>

#### HttpMock.onGet(endpoint?)
<p>Mocks responses for get methods
You may pass a specific endpoint as parameter to mock only selected endpoints.
This is very useful, when having methods that do several Http requests,
so you can mock them one on one.</p>
<p>The following code returns the same content on <em>every</em> get call</p>
<pre class="prettyprint source"><code>  HttpMock.onGet().reply(200, [{login: 'foo'}, {login: 'bar'}]);
</code></pre>
<p>The next code returns the different content depending on the passed endpoint</p>
<pre class="prettyprint source"><code>  HttpMock.onGet('/foo').reply(200, {data: 'foo'});
  HttpMock.onGet('/bar').reply(200, {data: 'bar'});
</code></pre>

**Kind**: static method of [<code>HttpMock</code>](#module_http..HttpMock)  

| Param | Description |
| --- | --- |
| endpoint? | <p>An endpoint, to allow specific behavior on that endpoint</p> |

<a name="module_http..HttpMock.onPost"></a>

#### HttpMock.onPost(endpoint?)
<p>Mocks responses for post methods</p>

**Kind**: static method of [<code>HttpMock</code>](#module_http..HttpMock)  

| Param | Description |
| --- | --- |
| endpoint? | <p>An endpoint, to allow specific behavior on that endpoint</p> |

<a name="module_http..HttpMock.onPut"></a>

#### HttpMock.onPut(endpoint?)
<p>Mocks responses for put methods</p>

**Kind**: static method of [<code>HttpMock</code>](#module_http..HttpMock)  

| Param | Description |
| --- | --- |
| endpoint? | <p>An endpoint, to allow specific behavior on that endpoint</p> |

<a name="module_http..HttpMock.onDelete"></a>

#### HttpMock.onDelete(endpoint?)
<p>Mocks responses for delete methods</p>

**Kind**: static method of [<code>HttpMock</code>](#module_http..HttpMock)  

| Param | Description |
| --- | --- |
| endpoint? | <p>An endpoint, to allow specific behavior on that endpoint</p> |

<a name="module_http..HttpMock.reset"></a>

#### HttpMock.reset()
<p>Resets all mocked behavior</p>

**Kind**: static method of [<code>HttpMock</code>](#module_http..HttpMock)  
<a name="module_http..HttpResponse"></a>

### http~HttpResponse
<p>Http Response</p>
<p>Returned by Http request</p>

**Kind**: inner class of [<code>http</code>](#module_http)  
<a name="HttpImpl"></a>

## HttpImpl
<p>Generic Http client</p>

**Kind**: global class  
<a name="new_HttpImpl_new"></a>

### new HttpImpl(baseURL, options)
<p>Creates your Http client</p>


| Param | Description |
| --- | --- |
| baseURL | <p>The baseUrl, i.e host url</p> |
| options | <p>[optional] An options/configurations object applied to all requests The current implementation uses axios, so the options can be found here <a href="https://github.com/axios/axios#request-config">Axios Configuration</a></p> |

