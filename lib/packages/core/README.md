# @burstjs/core



Burst-related functions and models for building Burstcoin applications.

## Installation

burstJS can be used with NodeJS or Web. Two formats are available

### Using with NodeJS and/or modern web frameworks

Install using [npm](https://www.npmjs.org/):

```
npm install @burstjs/core
```

or using [yarn](https://yarnpkg.com/):

```
yarn add @burstjs/core
```

#### Example

```js
import {composeApi, ApiSettings} from '@burstjs/core'
import {BurstValue} from '@burstjs/util'

const apiSettings = new ApiSettings('https://testnet.burstcoin.network:6876');
const api = composeApi(apiSettings);

// this self-executing file makes turns this file into a starting point of your app

(async () => {
try{
const {balanceNQT} = await api.account.getAccountBalance('13036514135565182944')
console.log(`Account Balance: ${BurstValue.fromPlanck(balanceNQT).toString()}`)
}
catch(e){ // e is of type HttpError (as part of @burstjs/http)
console.error(`Whooops, something went wrong: ${e.message}`)
}
})()
```


### Using in classic `<script>`

Each package is available as bundled standalone library using IIFE.
This way _burstJS_ can be used also within `<script>`-Tags.
This might be useful for Wordpress and/or other PHP applications.

Just import the package using the HTML `<script>` tag.

`<script src='https://cdn.jsdelivr.net/npm/@burstjs/core/dist/burstjs.min.js'></script>`


#### Example

```js
(function(){
const api = b$.composeApi({nodeHost: "https://testnet.burstcoin.network:6876"});

api.network.getBlockchainStatus().then(console.log).catch(console.error);
})()
```


See more here:

[@burstjs/core Online Documentation](https://burst-apps-team.github.io/phoenix/modules/core.html)

---

## API Reference
## Modules

<dl>
<dt><a href="#core.module_api">api</a></dt>
<dd><p>The API composer mounts the API for given service and selected methods</p>
<p>Usually you would use [[composeApi]], which gives you <em>all</em> available API methods.
Unfortunately, this will import almost all dependencies, even if you need only a fraction
of the methods. To take advantage of tree-shaking (dead code elimination) you can
compose your own API with the methods you need. This can reduce your final bundle significantly.</p>
<p>Usage:</p>
<pre class="prettyprint source lang-typescript"><code>
const burstService = new BurstService({
    nodeHost: 'https://testnet.burst.fun',
})

<p>const api = apiComposer
.create(burstService)
.withMessageApi({
               sendTextMessage
           })
.withAccountApi({
               getAccountTransactions,
               getUnconfirmedAccountTransactions,
               getAccountBalance,
               generateSendTransactionQRCode,
               generateSendTransactionQRCodeAddress,
           })
.compose();
</code></pre></p>
<p>The <code>with&lt;section&gt;Api</code> uses factory methods from the <a href="/phoenix/docs/modules/core_api_factories.html">api.core.factories</a> package</p></dd>
<dt><a href="#core.module_api">api</a></dt>
<dd><p>Settings for API used in [[composeApi]]</p></dd>
<dt><a href="#core.module_api">api</a> ⇒</dt>
<dd><p>Composes the API, i.e. setup the environment and mounts the API structure
with its functions.</p>
<pre class="prettyprint source lang-ts"><code>const api = composeApi(new ApiSettings('https://wallet1.burst-team.us:2083')), // one of the mainnet nodes
</code></pre>
<blockquote>
<p>Note, that this method mounts the <strong>entire</strong> API, i.e. all available methods. One may also customize the API composition
using [[ApiComposer]].</p>
</blockquote></dd>
<dt><a href="#module_core">core</a> ⇒</dt>
<dd><p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p></dd>
<dt><a href="#module_core">core</a> ⇒</dt>
<dd><p>Checks if a transaction attachment is of specific version</p></dd>
<dt><a href="#module_core">core</a></dt>
<dd></dd>
<dt><a href="#module_core">core</a></dt>
<dd><p>The default deadline (in minutes) for Transactions</p></dd>
<dt><a href="#module_core">core</a></dt>
<dd><p>The default endpoint for [[ApiSettings]]</p></dd>
<dt><a href="#module_core">core</a></dt>
<dd><p>Constants for arbitrary subtypes</p></dd>
<dt><a href="#module_core">core</a></dt>
<dd><p>Constants for asset subtypes</p></dd>
<dt><a href="#module_core">core</a></dt>
<dd><p>Constants for escrow subtypes</p></dd>
<dt><a href="#module_core">core</a></dt>
<dd><p>Constants for leasing subtypes</p></dd>
<dt><a href="#module_core">core</a></dt>
<dd><p>Constants for marketplace subtypes</p></dd>
<dt><a href="#module_core">core</a></dt>
<dd><p>Constants for payment subtypes</p></dd>
<dt><a href="#module_core">core</a></dt>
<dd><p>Constants for reward recipient subtypes (Pool Operation)</p></dd>
<dt><a href="#module_core">core</a></dt>
<dd><p>Constants for smart contract (aka AT) subtypes</p></dd>
<dt><a href="#module_core">core</a></dt>
<dd><p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p></dd>
<dt><del><a href="#module_core">core</a> ⇒</del></dt>
<dd><p>Constructs an Attachment</p></dd>
<dt><a href="#module_core">core</a> ⇒</dt>
<dd><p>Creates BRS Http send parameters for a transaction from attachment data</p></dd>
<dt><a href="#module_core">core</a></dt>
<dd><p>Generic BRS Web Service class.</p></dd>
<dt><a href="#module_core">core</a> ⇒</dt>
<dd><p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p></dd>
<dt><a href="#module_core">core</a> ⇒</dt>
<dd><p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p></dd>
<dt><a href="#module_core">core</a> ⇒</dt>
<dd><p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p></dd>
<dt><a href="#module_core">core</a> ⇒</dt>
<dd><p>Checks if a transaction is a multi out transaction (with different amounts)</p></dd>
<dt><a href="#module_core">core</a></dt>
<dd><p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p></dd>
<dt><a href="#module_core">core</a></dt>
<dd><p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p></dd>
<dt><a href="#module_core">core</a></dt>
<dd><p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p></dd>
<dt><a href="#module_core">core</a></dt>
<dd><p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p></dd>
</dl>

## Classes

<dl>
<dt><a href="#ApiImpl">ApiImpl</a></dt>
<dd><p>Copyright (c) 2019 Burst Apps Team</p></dd>
</dl>

<a name="core.module_api"></a>

## api
<p>The API composer mounts the API for given service and selected methods</p>
<p>Usually you would use [[composeApi]], which gives you <em>all</em> available API methods.
Unfortunately, this will import almost all dependencies, even if you need only a fraction
of the methods. To take advantage of tree-shaking (dead code elimination) you can
compose your own API with the methods you need. This can reduce your final bundle significantly.</p>
<p>Usage:</p>
<pre class="prettyprint source lang-typescript"><code>
const burstService = new BurstService({
    nodeHost: 'https://testnet.burst.fun',
})

const api = apiComposer
.create(burstService)
.withMessageApi({
               sendTextMessage
           })
.withAccountApi({
               getAccountTransactions,
               getUnconfirmedAccountTransactions,
               getAccountBalance,
               generateSendTransactionQRCode,
               generateSendTransactionQRCodeAddress,
           })
.compose();
</code></pre>
<p>The <code>with&lt;section&gt;Api</code> uses factory methods from the <a href="/phoenix/docs/modules/core_api_factories.html">api.core.factories</a> package</p>


* [api](#core.module_api)
    * [~ApiSettings](#core.module_api..ApiSettings)
        * [new ApiSettings(nodeHost, apiVersion, httpClientOptions)](#new_core.module_api..ApiSettings_new)

<a name="core.module_api..ApiSettings"></a>

### api~ApiSettings
**Kind**: inner class of [<code>api</code>](#core.module_api)  
<a name="new_core.module_api..ApiSettings_new"></a>

#### new ApiSettings(nodeHost, apiVersion, httpClientOptions)

| Param | Type | Description |
| --- | --- | --- |
| nodeHost | <code>string</code> | <p>The url of the Burst peer</p> |
| apiVersion | <code>ApiVersion</code> | <p>For future usage.</p> |
| httpClientOptions | <code>any</code> \| <code>AxiosRequestSettings</code> | <p>Optional http options, like additional header. The default implementation uses axios. In case of a custom client pass your own options. see <a href="https://github.com/axios/axios#request-config">Axios Configuration</a></p> |

<a name="core.module_api"></a>

## api
<p>Settings for API used in [[composeApi]]</p>


* [api](#core.module_api)
    * [~ApiSettings](#core.module_api..ApiSettings)
        * [new ApiSettings(nodeHost, apiVersion, httpClientOptions)](#new_core.module_api..ApiSettings_new)

<a name="core.module_api..ApiSettings"></a>

### api~ApiSettings
**Kind**: inner class of [<code>api</code>](#core.module_api)  
<a name="new_core.module_api..ApiSettings_new"></a>

#### new ApiSettings(nodeHost, apiVersion, httpClientOptions)

| Param | Type | Description |
| --- | --- | --- |
| nodeHost | <code>string</code> | <p>The url of the Burst peer</p> |
| apiVersion | <code>ApiVersion</code> | <p>For future usage.</p> |
| httpClientOptions | <code>any</code> \| <code>AxiosRequestSettings</code> | <p>Optional http options, like additional header. The default implementation uses axios. In case of a custom client pass your own options. see <a href="https://github.com/axios/axios#request-config">Axios Configuration</a></p> |

<a name="core.module_api"></a>

## api ⇒
<p>Composes the API, i.e. setup the environment and mounts the API structure
with its functions.</p>
<pre class="prettyprint source lang-ts"><code>const api = composeApi(new ApiSettings('https://wallet1.burst-team.us:2083')), // one of the mainnet nodes
</code></pre>
<blockquote>
<p>Note, that this method mounts the <strong>entire</strong> API, i.e. all available methods. One may also customize the API composition
using [[ApiComposer]].</p>
</blockquote>

**Returns**: <p>The <em>complete</em> API</p>  

| Param | Description |
| --- | --- |
| settings | <p>necessary execution context</p> |


* [api](#core.module_api) ⇒
    * [~ApiSettings](#core.module_api..ApiSettings)
        * [new ApiSettings(nodeHost, apiVersion, httpClientOptions)](#new_core.module_api..ApiSettings_new)

<a name="core.module_api..ApiSettings"></a>

### api~ApiSettings
**Kind**: inner class of [<code>api</code>](#core.module_api)  
<a name="new_core.module_api..ApiSettings_new"></a>

#### new ApiSettings(nodeHost, apiVersion, httpClientOptions)

| Param | Type | Description |
| --- | --- | --- |
| nodeHost | <code>string</code> | <p>The url of the Burst peer</p> |
| apiVersion | <code>ApiVersion</code> | <p>For future usage.</p> |
| httpClientOptions | <code>any</code> \| <code>AxiosRequestSettings</code> | <p>Optional http options, like additional header. The default implementation uses axios. In case of a custom client pass your own options. see <a href="https://github.com/axios/axios#request-config">Axios Configuration</a></p> |

<a name="module_core"></a>

## core ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |


* [core](#module_core) ⇒
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |


* [core](#module_core) ⇒
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core
<p>The default deadline (in minutes) for Transactions</p>


* [core](#module_core)
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core
<p>The default endpoint for [[ApiSettings]]</p>


* [core](#module_core)
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core
<p>Constants for arbitrary subtypes</p>


* [core](#module_core)
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core
<p>Constants for asset subtypes</p>


* [core](#module_core)
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core
<p>Constants for escrow subtypes</p>


* [core](#module_core)
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core
<p>Constants for leasing subtypes</p>


* [core](#module_core)
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core
<p>Constants for marketplace subtypes</p>


* [core](#module_core)
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core
<p>Constants for payment subtypes</p>


* [core](#module_core)
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core
<p>Constants for reward recipient subtypes (Pool Operation)</p>


* [core](#module_core)
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core
<p>Constants for smart contract (aka AT) subtypes</p>


* [core](#module_core)
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>


* [core](#module_core)
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## ~~core ⇒~~
***Deprecated***

<p>Constructs an Attachment</p>

**Returns**: <p>HttpParams</p>  
**Internal**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |


* ~~[core](#module_core) ⇒~~
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core ⇒
<p>Creates BRS Http send parameters for a transaction from attachment data</p>

**Returns**: <p>HttpParams</p>  
**Internal**:   

| Param | Description |
| --- | --- |
| attachment | <p>The attachment</p> |
| params | <p>Any object</p> |


* [core](#module_core) ⇒
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core
<p>Generic BRS Web Service class.</p>


* [core](#module_core)
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |


* [core](#module_core) ⇒
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |


* [core](#module_core) ⇒
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |


* [core](#module_core) ⇒
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |


* [core](#module_core) ⇒
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>


* [core](#module_core)
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>


* [core](#module_core)
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>


* [core](#module_core)
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core"></a>

## core
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>


* [core](#module_core)
    * [~BurstService](#module_core..BurstService)
        * [new BurstService(settings)](#new_module_core..BurstService_new)
        * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
        * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="module_core..BurstService"></a>

### core~BurstService
**Kind**: inner class of [<code>core</code>](#module_core)  

* [~BurstService](#module_core..BurstService)
    * [new BurstService(settings)](#new_module_core..BurstService_new)
    * [.toBRSEndpoint(method, data)](#module_core..BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#module_core..BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#module_core..BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_module_core..BurstService_new"></a>

#### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="module_core..BurstService+toBRSEndpoint"></a>

#### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="module_core..BurstService+query"></a>

#### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="module_core..BurstService+send"></a>

#### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#module_core..BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="ApiImpl"></a>

## ApiImpl
<p>Copyright (c) 2019 Burst Apps Team</p>

**Kind**: global class  
