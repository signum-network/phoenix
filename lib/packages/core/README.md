# @burstjs/core

Burst-related functions and models for building Burstcoin applications.

## Installation

Install using [npm](https://www.npmjs.org/):

```
npm install @burstjs/core
```

or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @burstjs/core
```

## API Reference
<a name="BurstService"></a>

## BurstService
<p>Generic BRS Web Service class.
Extend and specific services here</p>

**Kind**: global class  

* [BurstService](#BurstService)
    * [new BurstService(baseUrl, relativePath, httpClient)](#new_BurstService_new)
    * [.http](#BurstService+http) ⇒
    * [.toBRSEndpoint(method, data)](#BurstService+toBRSEndpoint) ⇒
    * [.query(method, args)](#BurstService+query) ⇒
    * [.send(method, args)](#BurstService+send) ⇒

<a name="new_BurstService_new"></a>

### new BurstService(baseUrl, relativePath, httpClient)
<p>Creates Service instance</p>


| Param | Type | Description |
| --- | --- | --- |
| baseUrl |  | <p>The host url of web service</p> |
| relativePath |  | <p>The relative path will be prepended before each url created with toBRSEndpoint()</p> |
| httpClient | <code>Http</code> | <p>If passed an client instance, it will be used instead of default HttpImpl. Good for testing.</p> |

<a name="BurstService+http"></a>

### burstService.http ⇒
**Kind**: instance property of [<code>BurstService</code>](#BurstService)  
**Returns**: <p>The internal Http client</p>  
<a name="BurstService+toBRSEndpoint"></a>

### burstService.toBRSEndpoint(method, data) ⇒
<p>Mounts a BRS conform API endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#BurstService)  
**Returns**: <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Description |
| --- | --- |
| method | <p>The method name for <code>requestType</code></p> |
| data | <p>A JSON object which will be mapped to url params</p> |

<a name="BurstService+query"></a>

### burstService.query(method, args) ⇒
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#BurstService)  
**Returns**: <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Description |
| --- | --- |
| method | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <p>A JSON object which will be mapped to url params</p> |

<a name="BurstService+send"></a>

### burstService.send(method, args) ⇒
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#BurstService)  
**Returns**: <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Description |
| --- | --- |
| method | <p>The BRS method accordinghttps://burstwiki.org/wiki/The_Burst_API#Create_Transaction.        Note that there are only a few POST methods</p> |
| args | <p>A JSON object which will be mapped to url params</p> |

