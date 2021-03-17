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

[@burstjs/http Online Documentation](https://burst-apps-team.github.io/phoenix/modules/http.html)

---

## API Reference
## Modules

<dl>
<dt><a href="#module_http">http</a></dt>
<dd><p>HttpError class</p>
<p>Thrown on HTTP errors</p></dd>
<dt><a href="#module_http">http</a></dt>
<dd><p>Http Implementation of [[Http]] using https://github.com/axios/axios</p>
<p>You can use [[HttpClient]] as alias</p></dd>
<dt><a href="#module_http">http</a></dt>
<dd></dd>
<dt><a href="#module_http">http</a></dt>
<dd><p>Http Mocker Builder for easy to http testing</p>
<p>Example:</p>
<pre class="prettyprint source"><code> const mockedHttp = HttpMockBuilder
 .create()
 .onGetReply(200, {foo: 'get'})
 .onPostThrowError(500, 'Post Error', {e: 'post'})
 .onPutThrowError(404, 'Put Error', {e: 'put'})
 .onDeleteThrowError(403, 'Delete Error', {e: 'delete'})
 .build();

<p> const response = await mockedHttp.get(&#39;/url&#39;);</p>
<p> await mockedHttp.post(&#39;/url/post&#39;, {faz: &#39;post&#39;}); // will throw exception
</code></pre></p>
</dd>
<dt><a href="#module_http">http</a></dt>
<dd><p>Http Response</p>
<p>Returned by Http request</p></dd>
<dt><a href="#module_http">http</a></dt>
<dd><p>Alias for HttpImpl</p></dd>
</dl>

<a name="module_http"></a>

## http
<p>HttpError class</p>
<p>Thrown on HTTP errors</p>


* [http](#module_http)
    * [~HttpImpl](#module_http..HttpImpl)
        * [new HttpImpl(baseURL, options)](#new_module_http..HttpImpl_new)
        * [.mountError(url, error)](#module_http..HttpImpl.mountError)

<a name="module_http..HttpImpl"></a>

### http~HttpImpl
**Kind**: inner class of [<code>http</code>](#module_http)  

* [~HttpImpl](#module_http..HttpImpl)
    * [new HttpImpl(baseURL, options)](#new_module_http..HttpImpl_new)
    * [.mountError(url, error)](#module_http..HttpImpl.mountError)

<a name="new_module_http..HttpImpl_new"></a>

#### new HttpImpl(baseURL, options)
<p>Creates your Http client</p>


| Param | Description |
| --- | --- |
| baseURL | <p>The baseUrl, i.e host url</p> |
| options | <p>[optional] An options/configurations object applied to all requests The current implementation uses axios, so the options can be found here <a href="https://github.com/axios/axios#request-config">Axios Configuration</a></p> |

<a name="module_http..HttpImpl.mountError"></a>

#### HttpImpl.mountError(url, error)
**Kind**: static method of [<code>HttpImpl</code>](#module_http..HttpImpl)  
**Internal**:   

| Param | Description |
| --- | --- |
| url | <p>The url</p> |
| error | <p>The returned error</p> |

<a name="module_http"></a>

## http
<p>Http Implementation of [[Http]] using https://github.com/axios/axios</p>
<p>You can use [[HttpClient]] as alias</p>


* [http](#module_http)
    * [~HttpImpl](#module_http..HttpImpl)
        * [new HttpImpl(baseURL, options)](#new_module_http..HttpImpl_new)
        * [.mountError(url, error)](#module_http..HttpImpl.mountError)

<a name="module_http..HttpImpl"></a>

### http~HttpImpl
**Kind**: inner class of [<code>http</code>](#module_http)  

* [~HttpImpl](#module_http..HttpImpl)
    * [new HttpImpl(baseURL, options)](#new_module_http..HttpImpl_new)
    * [.mountError(url, error)](#module_http..HttpImpl.mountError)

<a name="new_module_http..HttpImpl_new"></a>

#### new HttpImpl(baseURL, options)
<p>Creates your Http client</p>


| Param | Description |
| --- | --- |
| baseURL | <p>The baseUrl, i.e host url</p> |
| options | <p>[optional] An options/configurations object applied to all requests The current implementation uses axios, so the options can be found here <a href="https://github.com/axios/axios#request-config">Axios Configuration</a></p> |

<a name="module_http..HttpImpl.mountError"></a>

#### HttpImpl.mountError(url, error)
**Kind**: static method of [<code>HttpImpl</code>](#module_http..HttpImpl)  
**Internal**:   

| Param | Description |
| --- | --- |
| url | <p>The url</p> |
| error | <p>The returned error</p> |

<a name="module_http"></a>

## http
**Internal**: Http Mocker for easy to http testing using Jest

When using this mocking helper you need to call `Http.onGet()`
before Http instance is created  

* [http](#module_http)
    * [~HttpImpl](#module_http..HttpImpl)
        * [new HttpImpl(baseURL, options)](#new_module_http..HttpImpl_new)
        * [.mountError(url, error)](#module_http..HttpImpl.mountError)

<a name="module_http..HttpImpl"></a>

### http~HttpImpl
**Kind**: inner class of [<code>http</code>](#module_http)  

* [~HttpImpl](#module_http..HttpImpl)
    * [new HttpImpl(baseURL, options)](#new_module_http..HttpImpl_new)
    * [.mountError(url, error)](#module_http..HttpImpl.mountError)

<a name="new_module_http..HttpImpl_new"></a>

#### new HttpImpl(baseURL, options)
<p>Creates your Http client</p>


| Param | Description |
| --- | --- |
| baseURL | <p>The baseUrl, i.e host url</p> |
| options | <p>[optional] An options/configurations object applied to all requests The current implementation uses axios, so the options can be found here <a href="https://github.com/axios/axios#request-config">Axios Configuration</a></p> |

<a name="module_http..HttpImpl.mountError"></a>

#### HttpImpl.mountError(url, error)
**Kind**: static method of [<code>HttpImpl</code>](#module_http..HttpImpl)  
**Internal**:   

| Param | Description |
| --- | --- |
| url | <p>The url</p> |
| error | <p>The returned error</p> |

<a name="module_http"></a>

## http
<p>Http Mocker Builder for easy to http testing</p>
<p>Example:</p>
<pre class="prettyprint source"><code> const mockedHttp = HttpMockBuilder
 .create()
 .onGetReply(200, {foo: 'get'})
 .onPostThrowError(500, 'Post Error', {e: 'post'})
 .onPutThrowError(404, 'Put Error', {e: 'put'})
 .onDeleteThrowError(403, 'Delete Error', {e: 'delete'})
 .build();

 const response = await mockedHttp.get('/url');

 await mockedHttp.post('/url/post', {faz: 'post'}); // will throw exception
</code></pre>


* [http](#module_http)
    * [~HttpImpl](#module_http..HttpImpl)
        * [new HttpImpl(baseURL, options)](#new_module_http..HttpImpl_new)
        * [.mountError(url, error)](#module_http..HttpImpl.mountError)

<a name="module_http..HttpImpl"></a>

### http~HttpImpl
**Kind**: inner class of [<code>http</code>](#module_http)  

* [~HttpImpl](#module_http..HttpImpl)
    * [new HttpImpl(baseURL, options)](#new_module_http..HttpImpl_new)
    * [.mountError(url, error)](#module_http..HttpImpl.mountError)

<a name="new_module_http..HttpImpl_new"></a>

#### new HttpImpl(baseURL, options)
<p>Creates your Http client</p>


| Param | Description |
| --- | --- |
| baseURL | <p>The baseUrl, i.e host url</p> |
| options | <p>[optional] An options/configurations object applied to all requests The current implementation uses axios, so the options can be found here <a href="https://github.com/axios/axios#request-config">Axios Configuration</a></p> |

<a name="module_http..HttpImpl.mountError"></a>

#### HttpImpl.mountError(url, error)
**Kind**: static method of [<code>HttpImpl</code>](#module_http..HttpImpl)  
**Internal**:   

| Param | Description |
| --- | --- |
| url | <p>The url</p> |
| error | <p>The returned error</p> |

<a name="module_http"></a>

## http
<p>Http Response</p>
<p>Returned by Http request</p>


* [http](#module_http)
    * [~HttpImpl](#module_http..HttpImpl)
        * [new HttpImpl(baseURL, options)](#new_module_http..HttpImpl_new)
        * [.mountError(url, error)](#module_http..HttpImpl.mountError)

<a name="module_http..HttpImpl"></a>

### http~HttpImpl
**Kind**: inner class of [<code>http</code>](#module_http)  

* [~HttpImpl](#module_http..HttpImpl)
    * [new HttpImpl(baseURL, options)](#new_module_http..HttpImpl_new)
    * [.mountError(url, error)](#module_http..HttpImpl.mountError)

<a name="new_module_http..HttpImpl_new"></a>

#### new HttpImpl(baseURL, options)
<p>Creates your Http client</p>


| Param | Description |
| --- | --- |
| baseURL | <p>The baseUrl, i.e host url</p> |
| options | <p>[optional] An options/configurations object applied to all requests The current implementation uses axios, so the options can be found here <a href="https://github.com/axios/axios#request-config">Axios Configuration</a></p> |

<a name="module_http..HttpImpl.mountError"></a>

#### HttpImpl.mountError(url, error)
**Kind**: static method of [<code>HttpImpl</code>](#module_http..HttpImpl)  
**Internal**:   

| Param | Description |
| --- | --- |
| url | <p>The url</p> |
| error | <p>The returned error</p> |

<a name="module_http"></a>

## http
<p>Alias for HttpImpl</p>


* [http](#module_http)
    * [~HttpImpl](#module_http..HttpImpl)
        * [new HttpImpl(baseURL, options)](#new_module_http..HttpImpl_new)
        * [.mountError(url, error)](#module_http..HttpImpl.mountError)

<a name="module_http..HttpImpl"></a>

### http~HttpImpl
**Kind**: inner class of [<code>http</code>](#module_http)  

* [~HttpImpl](#module_http..HttpImpl)
    * [new HttpImpl(baseURL, options)](#new_module_http..HttpImpl_new)
    * [.mountError(url, error)](#module_http..HttpImpl.mountError)

<a name="new_module_http..HttpImpl_new"></a>

#### new HttpImpl(baseURL, options)
<p>Creates your Http client</p>


| Param | Description |
| --- | --- |
| baseURL | <p>The baseUrl, i.e host url</p> |
| options | <p>[optional] An options/configurations object applied to all requests The current implementation uses axios, so the options can be found here <a href="https://github.com/axios/axios#request-config">Axios Configuration</a></p> |

<a name="module_http..HttpImpl.mountError"></a>

#### HttpImpl.mountError(url, error)
**Kind**: static method of [<code>HttpImpl</code>](#module_http..HttpImpl)  
**Internal**:   

| Param | Description |
| --- | --- |
| url | <p>The url</p> |
| error | <p>The returned error</p> |

