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

``` yarn
yarn add @burstjs/core
```

### Using in classic `<script>`



```js
// using core
const api = b$.composeApi({
  nodeHost: "http://at-testnet.burst-alliance.org:6876",
  apiRootUrl: "/burst"
});

api.network.getBlockchainStatus().then(console.log);
```

## API Reference
## Classes

<dl>
<dt><a href="#BurstService">BurstService</a></dt>
<dd><p>Generic BRS Web Service class.
Extend and specific services here</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#generateSendTransactionQRCode">generateSendTransactionQRCode(receiverId, amountNQT, feeSuggestionType)</a> ⇒ <code>Promise.&lt;ArrayBufferLike&gt;</code></dt>
<dd><p>Get QR Code image for a given BURST address</p></dd>
<dt><a href="#generateSendTransactionQRCodeAddress">generateSendTransactionQRCodeAddress(receiverId, amountNQT, feeSuggestionType)</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Generate the URL for a QR Code for a given BURST address. Useful for IMG tags in HTML.</p></dd>
<dt><a href="#getAccountBalance">getAccountBalance()</a></dt>
<dd><p>Submits a getBalance query given an accountId</p></dd>
<dt><a href="#getAccountTransactions">getAccountTransactions(accountId, firstIndex, lastIndex, numberOfConfirmations)</a> ⇒ <code>Promise.&lt;TransactionList&gt;</code></dt>
<dd><p>Get transactions of given account</p></dd>
<dt><a href="#getAliases">getAliases(accountId)</a> ⇒ <code>Promise.&lt;AliasList&gt;</code></dt>
<dd><p>Gets the aliases of an account</p></dd>
<dt><a href="#getUnconfirmedAccountTransactions">getUnconfirmedAccountTransactions(accountId)</a> ⇒ <code>Promise.&lt;UnconfirmedTransactionList&gt;</code></dt>
<dd><p>Get <em>unconfirmed</em> transactions of given account</p></dd>
<dt><a href="#getBlockByHeight">getBlockByHeight(height, includeTransactions)</a> ⇒</dt>
<dd><p>Get a block by given height</p></dd>
<dt><a href="#getBlockById">getBlockById(id, includeTransactions)</a> ⇒</dt>
<dd><p>Get a block by given id</p></dd>
<dt><a href="#getBlockByTimestamp">getBlockByTimestamp()</a></dt>
<dd><p>Original work Copyright (c) 2019 Burst Apps Team</p></dd>
<dt><a href="#getBlockId">getBlockId(height)</a> ⇒ <code>Promise.&lt;BlockId&gt;</code></dt>
<dd><p>Get a block id by given height</p></dd>
<dt><a href="#constructAttachment">constructAttachment(transactions, params)</a> ⇒</dt>
<dd><p>Constructs an Attachment</p></dd>
<dt><a href="#sendTextMessage">sendTextMessage(message, recipientId, senderPublicKey, senderPrivateKey, fee)</a> ⇒</dt>
<dd><p><p>Broadcasts a text message to the network/blockchain</p></p>
<p><p>The message will be broadcasted in two steps.</p></p>
<ol>
<li>Send the message with public key to the network</li>
<li>Take the returned unsigned message and sign it, i.e. the private key won&#39;t be transmitted.</li>
</ol></dd>
<dt><a href="#getBlockchainStatus">getBlockchainStatus()</a> ⇒</dt>
<dd><p>Get the blockchain status.</p></dd>
<dt><a href="#getServerStatus">getServerStatus()</a> ⇒</dt>
<dd><p>Get the state of the server node and network</p></dd>
<dt><a href="#suggestFee">suggestFee()</a> ⇒ <code>Promise.&lt;SuggestedFees&gt;</code></dt>
<dd><p>Get the current suggested fees</p></dd>
<dt><a href="#broadcastTransaction">broadcastTransaction(signedTransactionPayload)</a> ⇒</dt>
<dd><p>Broadcasts a transaction to the network/blockchain</p></dd>
<dt><a href="#getTransaction">getTransaction(transactionId)</a> ⇒</dt>
<dd><p>Get a transaction from the network/blockchain</p></dd>
<dt><a href="#sendMoney">sendMoney(transaction, senderPublicKey, senderPrivateKey, recipientAddress)</a> ⇒</dt>
<dd><p><p>Sends burst to the blockchain</p></p>
<p><p>The message will be broadcasted in two steps.</p></p>
<ol>
<li>Send the sendMoney call with public key to the network</li>
<li>Take the returned unsigned message and sign it, i.e. the private key won&#39;t be transmitted.</li>
</ol></dd>
</dl>

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
    * [.send(method, args, body)](#BurstService+send) ⇒

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

### burstService.send(method, args, body) ⇒
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#BurstService)  
**Returns**: <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Description |
| --- | --- |
| method | <p>The BRS method accordinghttps://burstwiki.org/wiki/The_Burst_API#Create_Transaction.        Note that there are only a few POST methods</p> |
| args | <p>A JSON object which will be mapped to url params</p> |
| body | <p>An object with key value pairs to submit as post body</p> |

<a name="generateSendTransactionQRCode"></a>

## generateSendTransactionQRCode(receiverId, amountNQT, feeSuggestionType) ⇒ <code>Promise.&lt;ArrayBufferLike&gt;</code>
<p>Get QR Code image for a given BURST address</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| receiverId | <code>string</code> | <p>The recipient burst</p> |
| amountNQT | <code>string</code> | <p>The amount (in NQT) to request</p> |
| feeSuggestionType | <code>string</code> | <p>The fee suggestion type string</p> |

<a name="generateSendTransactionQRCodeAddress"></a>

## generateSendTransactionQRCodeAddress(receiverId, amountNQT, feeSuggestionType) ⇒ <code>Promise.&lt;string&gt;</code>
<p>Generate the URL for a QR Code for a given BURST address. Useful for IMG tags in HTML.</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| receiverId | <code>string</code> | <p>The recipient burst address</p> |
| amountNQT | <code>string</code> | <p>The amount (in NQT) to request</p> |
| feeSuggestionType | <code>string</code> | <p>The fee suggestion type string</p> |

<a name="getAccountBalance"></a>

## getAccountBalance()
<p>Submits a getBalance query given an accountId</p>

**Kind**: global function  
<a name="getAccountTransactions"></a>

## getAccountTransactions(accountId, firstIndex, lastIndex, numberOfConfirmations) ⇒ <code>Promise.&lt;TransactionList&gt;</code>
<p>Get transactions of given account</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| accountId | <code>string</code> | <p>The numeric accountId</p> |
| firstIndex | <code>number</code> | <p>The first index of the transaction list, beginning at 0</p> |
| lastIndex | <code>number</code> | <p>The last index of the transaction list</p> |
| numberOfConfirmations | <code>number</code> | <p>The minimum required number of confirmations per transaction</p> |

<a name="getAliases"></a>

## getAliases(accountId) ⇒ <code>Promise.&lt;AliasList&gt;</code>
<p>Gets the aliases of an account</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| accountId | <code>string</code> | 

<a name="getUnconfirmedAccountTransactions"></a>

## getUnconfirmedAccountTransactions(accountId) ⇒ <code>Promise.&lt;UnconfirmedTransactionList&gt;</code>
<p>Get <em>unconfirmed</em> transactions of given account</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| accountId | <code>string</code> | <p>The numeric accountId</p> |

<a name="getBlockByHeight"></a>

## getBlockByHeight(height, includeTransactions) ⇒
<p>Get a block by given height</p>

**Kind**: global function  
**Returns**: <p>The Block</p>  

| Param | Description |
| --- | --- |
| height | <p>The block height</p> |
| includeTransactions | <p><em>true</em>, if transactions shall be included</p> |

<a name="getBlockById"></a>

## getBlockById(id, includeTransactions) ⇒
<p>Get a block by given id</p>

**Kind**: global function  
**Returns**: <p>The Block</p>  

| Param | Description |
| --- | --- |
| id | <p>The block id</p> |
| includeTransactions | <p><em>true</em>, if transactions shall be included</p> |

<a name="getBlockByTimestamp"></a>

## getBlockByTimestamp()
<p>Original work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: global function  
<a name="getBlockId"></a>

## getBlockId(height) ⇒ <code>Promise.&lt;BlockId&gt;</code>
<p>Get a block id by given height</p>

**Kind**: global function  
**Returns**: <code>Promise.&lt;BlockId&gt;</code> - <p>The Block Id</p>  

| Param | Type | Description |
| --- | --- | --- |
| height | <code>number</code> | <p>The block height</p> |

<a name="constructAttachment"></a>

## constructAttachment(transactions, params) ⇒
<p>Constructs an Attachment</p>

**Kind**: global function  
**Returns**: <p>HttpParams</p>  

| Param | Description |
| --- | --- |
| transactions | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="sendTextMessage"></a>

## sendTextMessage(message, recipientId, senderPublicKey, senderPrivateKey, fee) ⇒
<p>Broadcasts a text message to the network/blockchain</p>
<p>The message will be broadcasted in two steps.</p>
<ol>
<li>Send the message with public key to the network</li>
<li>Take the returned unsigned message and sign it, i.e. the private key won't be transmitted.</li>
</ol>

**Kind**: global function  
**Returns**: <p>The Transaction Id</p>  

| Param | Description |
| --- | --- |
| message | <p>The <em>text</em> message to be sent</p> |
| recipientId | <p>The recipients Id, not RS Address</p> |
| senderPublicKey | <p>The senders public key for sending an <em>unsigned</em> message</p> |
| senderPrivateKey | <p>The senders private key to <em>sign</em> the message</p> |
| fee | <p>The optional fee (expressed in Burst) for the message, default is 0.1 Burst.</p> |

<a name="getBlockchainStatus"></a>

## getBlockchainStatus() ⇒
<p>Get the blockchain status.</p>

**Kind**: global function  
**Returns**: <p>The Blockchain Status</p>  
<a name="getServerStatus"></a>

## getServerStatus() ⇒
<p>Get the state of the server node and network</p>

**Kind**: global function  
**Returns**: <p>The server Status</p>  
<a name="suggestFee"></a>

## suggestFee() ⇒ <code>Promise.&lt;SuggestedFees&gt;</code>
<p>Get the current suggested fees</p>

**Kind**: global function  
**Returns**: <code>Promise.&lt;SuggestedFees&gt;</code> - <p>The Suggested Fees</p>  
<a name="broadcastTransaction"></a>

## broadcastTransaction(signedTransactionPayload) ⇒
<p>Broadcasts a transaction to the network/blockchain</p>

**Kind**: global function  
**Returns**: <p>The Transaction Id</p>  

| Param | Description |
| --- | --- |
| signedTransactionPayload | <p>The <em>signed</em> transaction payload encoded in base64</p> |

<a name="getTransaction"></a>

## getTransaction(transactionId) ⇒
<p>Get a transaction from the network/blockchain</p>

**Kind**: global function  
**Returns**: <p>The Transaction</p>  

| Param | Description |
| --- | --- |
| transactionId | <p>The transaction Id</p> |

<a name="sendMoney"></a>

## sendMoney(transaction, senderPublicKey, senderPrivateKey, recipientAddress) ⇒
<p>Sends burst to the blockchain</p>
<p>The message will be broadcasted in two steps.</p>
<ol>
<li>Send the sendMoney call with public key to the network</li>
<li>Take the returned unsigned message and sign it, i.e. the private key won't be transmitted.</li>
</ol>

**Kind**: global function  
**Returns**: <p>The Transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The unsigned transaction</p> |
| senderPublicKey | <p>The senders public key for sending an <em>unsigned</em> message</p> |
| senderPrivateKey | <p>The senders private key to <em>sign</em> the message</p> |
| recipientAddress | <p>The recipients RS Address</p> |

