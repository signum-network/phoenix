# @signumjs/http

Generic HTTP client that is used as a network provider for @signumjs/core.

## Installation

`@signumjs/http` can be used with NodeJS or Web. Two formats are available

### Using with NodeJS and/or modern web frameworks

Install using [npm](https://www.npmjs.org/):

```
npm install @signumjs/http
```

or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @signumjs/http
```

#### Example

```js
import {HttpImpl} from '@signumjs/http'

async function getTodos() {
    try{
        const client = new HttpClientFactory.createHttpClient('https://jsonplaceholder.typicode.com/');
        const result = await client.get('/todos/1')
        console.log(result)
    }
    catch(httpError){
        console.error(httpError.message)
    }
}
```

### Using in classic `<script>`

Each package is available as bundled standalone library using UMD.
This way _signumJS_ can be used also within `<script>`-Tags.
This might be useful for Wordpress and/or other PHP applications.

Just import the package using the HTML `<script>` tag.

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/http/dist/signumjs.http.min.js'></script>`

#### Example

```js
const {HttpClientFactory} = sig$http
const client = new HttpClientFactory.createHttpClient('https://jsonplaceholder.typicode.com/');
client.get('/todos/1').then(console.log)
```

See more here:

[@signumjs/http Online Documentation](https://burst-apps-team.github.io/phoenix/modules/http.html)

---

## API Reference
## Modules

<dl>
<dt><a href="#module_http">http</a></dt>
<dd><p>Http Implementation of [[Http]] using https://github.com/axios/axios</p>
<p>Prefer [[HttpClientFactory.createHttpClient]] to create an instance</p></dd>
<dt><a href="#module_http">http</a></dt>
<dd><p>Factory for clients of [[Http]]</p></dd>
<dt><a href="#module_http">http</a></dt>
<dd><p>HttpError class</p>
<p>Thrown on HTTP errors</p></dd>
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
</dl>

<a name="module_http"></a>

## http
<p>Http Implementation of [[Http]] using https://github.com/axios/axios</p>
<p>Prefer [[HttpClientFactory.createHttpClient]] to create an instance</p>


* [http](#module_http)
    * [~HttpAdapterAxios](#module_http..HttpAdapterAxios)
        * [new HttpAdapterAxios(baseURL, options)](#new_module_http..HttpAdapterAxios_new)
        * [.mountError(url, error)](#module_http..HttpAdapterAxios.mountError)

<a name="module_http..HttpAdapterAxios"></a>

### http~HttpAdapterAxios
**Kind**: inner class of [<code>http</code>](#module_http)  

* [~HttpAdapterAxios](#module_http..HttpAdapterAxios)
    * [new HttpAdapterAxios(baseURL, options)](#new_module_http..HttpAdapterAxios_new)
    * [.mountError(url, error)](#module_http..HttpAdapterAxios.mountError)

<a name="new_module_http..HttpAdapterAxios_new"></a>

#### new HttpAdapterAxios(baseURL, options)
<p>Creates your Http client</p>


| Param | Description |
| --- | --- |
| baseURL | <p>The baseUrl, i.e host url</p> |
| options | <p>[optional] An options/configurations object applied to all requests The current implementation uses axios, so the options can be found here <a href="https://github.com/axios/axios#request-config">Axios Configuration</a></p> |

<a name="module_http..HttpAdapterAxios.mountError"></a>

#### HttpAdapterAxios.mountError(url, error)
**Kind**: static method of [<code>HttpAdapterAxios</code>](#module_http..HttpAdapterAxios)  
**Internal**:   

| Param | Description |
| --- | --- |
| url | <p>The url</p> |
| error | <p>The returned error</p> |

<a name="module_http"></a>

## http
<p>Factory for clients of [[Http]]</p>


* [http](#module_http)
    * [~HttpAdapterAxios](#module_http..HttpAdapterAxios)
        * [new HttpAdapterAxios(baseURL, options)](#new_module_http..HttpAdapterAxios_new)
        * [.mountError(url, error)](#module_http..HttpAdapterAxios.mountError)

<a name="module_http..HttpAdapterAxios"></a>

### http~HttpAdapterAxios
**Kind**: inner class of [<code>http</code>](#module_http)  

* [~HttpAdapterAxios](#module_http..HttpAdapterAxios)
    * [new HttpAdapterAxios(baseURL, options)](#new_module_http..HttpAdapterAxios_new)
    * [.mountError(url, error)](#module_http..HttpAdapterAxios.mountError)

<a name="new_module_http..HttpAdapterAxios_new"></a>

#### new HttpAdapterAxios(baseURL, options)
<p>Creates your Http client</p>


| Param | Description |
| --- | --- |
| baseURL | <p>The baseUrl, i.e host url</p> |
| options | <p>[optional] An options/configurations object applied to all requests The current implementation uses axios, so the options can be found here <a href="https://github.com/axios/axios#request-config">Axios Configuration</a></p> |

<a name="module_http..HttpAdapterAxios.mountError"></a>

#### HttpAdapterAxios.mountError(url, error)
**Kind**: static method of [<code>HttpAdapterAxios</code>](#module_http..HttpAdapterAxios)  
**Internal**:   

| Param | Description |
| --- | --- |
| url | <p>The url</p> |
| error | <p>The returned error</p> |

<a name="module_http"></a>

## http
<p>HttpError class</p>
<p>Thrown on HTTP errors</p>


* [http](#module_http)
    * [~HttpAdapterAxios](#module_http..HttpAdapterAxios)
        * [new HttpAdapterAxios(baseURL, options)](#new_module_http..HttpAdapterAxios_new)
        * [.mountError(url, error)](#module_http..HttpAdapterAxios.mountError)

<a name="module_http..HttpAdapterAxios"></a>

### http~HttpAdapterAxios
**Kind**: inner class of [<code>http</code>](#module_http)  

* [~HttpAdapterAxios](#module_http..HttpAdapterAxios)
    * [new HttpAdapterAxios(baseURL, options)](#new_module_http..HttpAdapterAxios_new)
    * [.mountError(url, error)](#module_http..HttpAdapterAxios.mountError)

<a name="new_module_http..HttpAdapterAxios_new"></a>

#### new HttpAdapterAxios(baseURL, options)
<p>Creates your Http client</p>


| Param | Description |
| --- | --- |
| baseURL | <p>The baseUrl, i.e host url</p> |
| options | <p>[optional] An options/configurations object applied to all requests The current implementation uses axios, so the options can be found here <a href="https://github.com/axios/axios#request-config">Axios Configuration</a></p> |

<a name="module_http..HttpAdapterAxios.mountError"></a>

#### HttpAdapterAxios.mountError(url, error)
**Kind**: static method of [<code>HttpAdapterAxios</code>](#module_http..HttpAdapterAxios)  
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
    * [~HttpAdapterAxios](#module_http..HttpAdapterAxios)
        * [new HttpAdapterAxios(baseURL, options)](#new_module_http..HttpAdapterAxios_new)
        * [.mountError(url, error)](#module_http..HttpAdapterAxios.mountError)

<a name="module_http..HttpAdapterAxios"></a>

### http~HttpAdapterAxios
**Kind**: inner class of [<code>http</code>](#module_http)  

* [~HttpAdapterAxios](#module_http..HttpAdapterAxios)
    * [new HttpAdapterAxios(baseURL, options)](#new_module_http..HttpAdapterAxios_new)
    * [.mountError(url, error)](#module_http..HttpAdapterAxios.mountError)

<a name="new_module_http..HttpAdapterAxios_new"></a>

#### new HttpAdapterAxios(baseURL, options)
<p>Creates your Http client</p>


| Param | Description |
| --- | --- |
| baseURL | <p>The baseUrl, i.e host url</p> |
| options | <p>[optional] An options/configurations object applied to all requests The current implementation uses axios, so the options can be found here <a href="https://github.com/axios/axios#request-config">Axios Configuration</a></p> |

<a name="module_http..HttpAdapterAxios.mountError"></a>

#### HttpAdapterAxios.mountError(url, error)
**Kind**: static method of [<code>HttpAdapterAxios</code>](#module_http..HttpAdapterAxios)  
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
    * [~HttpAdapterAxios](#module_http..HttpAdapterAxios)
        * [new HttpAdapterAxios(baseURL, options)](#new_module_http..HttpAdapterAxios_new)
        * [.mountError(url, error)](#module_http..HttpAdapterAxios.mountError)

<a name="module_http..HttpAdapterAxios"></a>

### http~HttpAdapterAxios
**Kind**: inner class of [<code>http</code>](#module_http)  

* [~HttpAdapterAxios](#module_http..HttpAdapterAxios)
    * [new HttpAdapterAxios(baseURL, options)](#new_module_http..HttpAdapterAxios_new)
    * [.mountError(url, error)](#module_http..HttpAdapterAxios.mountError)

<a name="new_module_http..HttpAdapterAxios_new"></a>

#### new HttpAdapterAxios(baseURL, options)
<p>Creates your Http client</p>


| Param | Description |
| --- | --- |
| baseURL | <p>The baseUrl, i.e host url</p> |
| options | <p>[optional] An options/configurations object applied to all requests The current implementation uses axios, so the options can be found here <a href="https://github.com/axios/axios#request-config">Axios Configuration</a></p> |

<a name="module_http..HttpAdapterAxios.mountError"></a>

#### HttpAdapterAxios.mountError(url, error)
**Kind**: static method of [<code>HttpAdapterAxios</code>](#module_http..HttpAdapterAxios)  
**Internal**:   

| Param | Description |
| --- | --- |
| url | <p>The url</p> |
| error | <p>The returned error</p> |

