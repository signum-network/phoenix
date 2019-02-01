# @burstjs/http

Generic HTTP client that is used as a network provider for @burst/core.

## Installation

Install using [npm](https://www.npmjs.org/):

```
npm install @burstjs/http
```

or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @burstjs/http
```

## API Reference
## Classes

<dl>
<dt><a href="#HttpError">HttpError</a></dt>
<dd><p>HttpError class</p>
<p>Thrown on HTTP errors</p></dd>
<dt><a href="#HttpImpl">HttpImpl</a></dt>
<dd></dd>
<dt><a href="#HttpMock">HttpMock</a></dt>
<dd><p>Http Mocker for easy to http testing using Jest</p>
<p>When using this mocking helper you need to call <code>Http.onGet()</code>
before Http instance is created</p></dd>
</dl>

<a name="HttpError"></a>

## HttpError
<p>HttpError class</p>
<p>Thrown on HTTP errors</p>

**Kind**: global class  
<a name="HttpImpl"></a>

## HttpImpl
**Kind**: global class  
<a name="new_HttpImpl_new"></a>

### new HttpImpl(baseURL)
<p>Creates your Http client</p>


| Param | Description |
| --- | --- |
| baseURL | <p>The baseUrl, i.e host url</p> |

<a name="HttpMock"></a>

## HttpMock
<p>Http Mocker for easy to http testing using Jest</p>
<p>When using this mocking helper you need to call <code>Http.onGet()</code>
before Http instance is created</p>

**Kind**: global class  

* [HttpMock](#HttpMock)
    * [.onGet(endpoint?)](#HttpMock.onGet)
    * [.onPost(endpoint?)](#HttpMock.onPost)
    * [.onPut(endpoint?)](#HttpMock.onPut)
    * [.onDelete(endpoint?)](#HttpMock.onDelete)
    * [.reset()](#HttpMock.reset)

<a name="HttpMock.onGet"></a>

### HttpMock.onGet(endpoint?)
<p>Mocks responses for get methods
You may pass a specific endpoint as parameter to mock only selected endpoints.
This is very useful, when having methods that do several Http requests,
so you can mock them one on one.</p>
<p>The following code returns the same content on <em>every</em> get call</p>
<pre class="prettyprint source"><code>  HttpMock.onGet().reply(200, [{login: 'foo'}, {login: 'bar'}]);</code></pre><p> The next code returns the different content depending on the passed endpoint</p>
<pre class="prettyprint source"><code>  HttpMock.onGet('/foo').reply(200, {data: 'foo'});
  HttpMock.onGet('/bar').reply(200, {data: 'bar'});</code></pre>

**Kind**: static method of [<code>HttpMock</code>](#HttpMock)  

| Param | Description |
| --- | --- |
| endpoint? | <p>An endpoint, to allow specific behavior on that endpoint</p> |

<a name="HttpMock.onPost"></a>

### HttpMock.onPost(endpoint?)
<p>Mocks responses for post methods</p>

**Kind**: static method of [<code>HttpMock</code>](#HttpMock)  

| Param | Description |
| --- | --- |
| endpoint? | <p>An endpoint, to allow specific behavior on that endpoint</p> |

<a name="HttpMock.onPut"></a>

### HttpMock.onPut(endpoint?)
<p>Mocks responses for put methods</p>

**Kind**: static method of [<code>HttpMock</code>](#HttpMock)  

| Param | Description |
| --- | --- |
| endpoint? | <p>An endpoint, to allow specific behavior on that endpoint</p> |

<a name="HttpMock.onDelete"></a>

### HttpMock.onDelete(endpoint?)
<p>Mocks responses for delete methods</p>

**Kind**: static method of [<code>HttpMock</code>](#HttpMock)  

| Param | Description |
| --- | --- |
| endpoint? | <p>An endpoint, to allow specific behavior on that endpoint</p> |

<a name="HttpMock.reset"></a>

### HttpMock.reset()
<p>Resets all mocked behavior</p>

**Kind**: static method of [<code>HttpMock</code>](#HttpMock)  
