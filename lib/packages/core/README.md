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
import {convertNQTStringToNumber} from '@burstjs/util'

const apiSettings = new ApiSettings('http://at-testnet.burst-alliance.org:6876', 'burst');
const api = composeApi(apiSettings);

// this self-executing file makes turns this file into a starting point of your app

(async () => {
try{
const {balanceNQT} = await api.account.getAccountBalance('13036514135565182944')
console.log(`Account Balance: ${convertNQTStringToNumber(balanceNQT)} BURST`)
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
const api = b$.composeApi({
nodeHost: "http://at-testnet.burst-alliance.org:6876",
apiRootUrl: "/burst"
});

api.network.getBlockchainStatus().then(console.log).catch(console.error);
})()
```


See more here:

[@burstjs/core Online Documentation](https://burstappsteam.org/phoenix/modules/core.html)

---

## API Reference
## Modules

<dl>
<dt><a href="#core.module_api">api</a></dt>
<dd></dd>
<dt><a href="#module_core">core</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#ApiSettings">ApiSettings</a></dt>
<dd><p>Context for API used in [[composeApi]]</p></dd>
<dt><a href="#ContractHelper">ContractHelper</a></dt>
<dd><p>Helper class for contracts</p>
<p>A contract owns additional data, which is splitted in 8 byte blocks.
The content is encoded in hexadecimal representation and big endianness.
This helper class facilitates access to these data</p></dd>
<dt><a href="#BurstService">BurstService</a></dt>
<dd><p>Generic BRS Web Service class.</p></dd>
</dl>

## Members

<dl>
<dt><a href="#ApiSettings">ApiSettings</a> ⇒</dt>
<dd><p>Composes the API, i.e. setup the environment and mounts the API structure
with its functions.</p>
<pre class="prettyprint source lang-ts"><code>const api = composeApi({
  nodeHost: 'https://wallet1.burst-team.us:2083', // one of the mainnet nodes
  apiRootUrl: '/burst' // endpoint to the BURST API
})
</code></pre>
<blockquote>
<p>Note, that this method mounts the <strong>entire</strong> API, i.e. all available methods. One may also customize the API composition
using [[ApiComposer]].</p>
</blockquote></dd>
</dl>

<a name="core.module_api"></a>

## api

* [api](#core.module_api)
    * [~ApiImpl](#core.module_api..ApiImpl)
    * [~ApiComposer](#core.module_api..ApiComposer)
        * _instance_
            * [.withBlockApi(creatorMap)](#core.module_api..ApiComposer+withBlockApi)
            * [.withAccountApi(creatorMap)](#core.module_api..ApiComposer+withAccountApi)
            * [.withNetworkApi(creatorMap)](#core.module_api..ApiComposer+withNetworkApi)
            * [.withMessageApi(creatorMap)](#core.module_api..ApiComposer+withMessageApi)
            * [.withTransactionApi(creatorMap)](#core.module_api..ApiComposer+withTransactionApi)
            * [.withAliasApi(creatorMap)](#core.module_api..ApiComposer+withAliasApi)
            * [.withContractApi(creatorMap)](#core.module_api..ApiComposer+withContractApi)
            * [.compose()](#core.module_api..ApiComposer+compose)
        * _static_
            * [.create(service)](#core.module_api..ApiComposer.create) ⇒

<a name="core.module_api..ApiImpl"></a>

### api~ApiImpl
<p>Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>api</code>](#core.module_api)  
<a name="core.module_api..ApiComposer"></a>

### api~ApiComposer
<p>The API composer mounts the API for given service and selected methods</p>
<p>Usually you would use [[composeApi]], which gives you <em>all</em> available API methods.
Unfortunately, this will import almost all dependencies, even if you need only a fraction
of the methods. To take advantage of tree-shaking (dead code elimination) you can
compose your own API with the methods you need. This can reduce your final bundle significantly.</p>
<p>Usage:</p>
<pre class="prettyprint source lang-typescript"><code>
const burstService = new BurstService({
    nodeHost: 'https://testnet.burst.fun',
    apiRootUrl: '/burst'
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

**Kind**: inner class of [<code>api</code>](#core.module_api)  

* [~ApiComposer](#core.module_api..ApiComposer)
    * _instance_
        * [.withBlockApi(creatorMap)](#core.module_api..ApiComposer+withBlockApi)
        * [.withAccountApi(creatorMap)](#core.module_api..ApiComposer+withAccountApi)
        * [.withNetworkApi(creatorMap)](#core.module_api..ApiComposer+withNetworkApi)
        * [.withMessageApi(creatorMap)](#core.module_api..ApiComposer+withMessageApi)
        * [.withTransactionApi(creatorMap)](#core.module_api..ApiComposer+withTransactionApi)
        * [.withAliasApi(creatorMap)](#core.module_api..ApiComposer+withAliasApi)
        * [.withContractApi(creatorMap)](#core.module_api..ApiComposer+withContractApi)
        * [.compose()](#core.module_api..ApiComposer+compose)
    * _static_
        * [.create(service)](#core.module_api..ApiComposer.create) ⇒

<a name="core.module_api..ApiComposer+withBlockApi"></a>

#### apiComposer.withBlockApi(creatorMap)
<p>Adds the [[BlockApi]] to be composed</p>

**Kind**: instance method of [<code>ApiComposer</code>](#core.module_api..ApiComposer)  

| Param | Description |
| --- | --- |
| creatorMap | <p>A map of creator/factory functions for the endpoints</p> |

<a name="core.module_api..ApiComposer+withAccountApi"></a>

#### apiComposer.withAccountApi(creatorMap)
<p>Adds the [[AccountApi]]  to be composed</p>

**Kind**: instance method of [<code>ApiComposer</code>](#core.module_api..ApiComposer)  

| Param | Description |
| --- | --- |
| creatorMap | <p>A map of creator/factory functions for the endpoints</p> |

<a name="core.module_api..ApiComposer+withNetworkApi"></a>

#### apiComposer.withNetworkApi(creatorMap)
<p>Adds the [[NetworkApi]]  to be composed</p>

**Kind**: instance method of [<code>ApiComposer</code>](#core.module_api..ApiComposer)  

| Param | Description |
| --- | --- |
| creatorMap | <p>A map of creator/factory functions for the endpoints</p> |

<a name="core.module_api..ApiComposer+withMessageApi"></a>

#### apiComposer.withMessageApi(creatorMap)
<p>Adds the [[MessageApi]]  to be composed</p>

**Kind**: instance method of [<code>ApiComposer</code>](#core.module_api..ApiComposer)  

| Param | Description |
| --- | --- |
| creatorMap | <p>A map of creator/factory functions for the endpoints</p> |

<a name="core.module_api..ApiComposer+withTransactionApi"></a>

#### apiComposer.withTransactionApi(creatorMap)
<p>Adds the [[TransactionApi]]  to be composed</p>

**Kind**: instance method of [<code>ApiComposer</code>](#core.module_api..ApiComposer)  

| Param | Description |
| --- | --- |
| creatorMap | <p>A map of creator/factory functions for the endpoints</p> |

<a name="core.module_api..ApiComposer+withAliasApi"></a>

#### apiComposer.withAliasApi(creatorMap)
<p>Adds the [[AliasApi]]  to be composed</p>

**Kind**: instance method of [<code>ApiComposer</code>](#core.module_api..ApiComposer)  

| Param | Description |
| --- | --- |
| creatorMap | <p>A map of creator/factory functions for the endpoints</p> |

<a name="core.module_api..ApiComposer+withContractApi"></a>

#### apiComposer.withContractApi(creatorMap)
<p>Adds the [[ContractApi]]  to be composed</p>

**Kind**: instance method of [<code>ApiComposer</code>](#core.module_api..ApiComposer)  

| Param | Description |
| --- | --- |
| creatorMap | <p>A map of creator/factory functions for the endpoints</p> |

<a name="core.module_api..ApiComposer+compose"></a>

#### apiComposer.compose()
<p>Composes the API
Note: As of being a builder pattern, this need to call this method as last</p>

**Kind**: instance method of [<code>ApiComposer</code>](#core.module_api..ApiComposer)  
<a name="core.module_api..ApiComposer.create"></a>

#### ApiComposer.create(service) ⇒
<p>Creates the composer instance</p>

**Kind**: static method of [<code>ApiComposer</code>](#core.module_api..ApiComposer)  
**Returns**: <p>the composer instance</p>  

| Param |
| --- |
| service | 

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core"></a>

## core

* [core](#module_core)
    * [~Account](#module_core..Account)
    * [~BurstNode](#module_core..BurstNode)
    * [~TransactionArbitrarySubtype](#module_core..TransactionArbitrarySubtype)
    * [~TransactionAssetSubtype](#module_core..TransactionAssetSubtype)
    * [~TransactionEscrowSubtype](#module_core..TransactionEscrowSubtype)
    * [~TransactionLeasingSubtype](#module_core..TransactionLeasingSubtype)
    * [~TransactionMarketplaceSubtype](#module_core..TransactionMarketplaceSubtype)
    * [~TransactionPaymentSubtype](#module_core..TransactionPaymentSubtype)
    * [~TransactionRewardRecipientSubtype](#module_core..TransactionRewardRecipientSubtype)
    * [~TransactionSmartContractSubtype](#module_core..TransactionSmartContractSubtype)
    * [~TransactionType](#module_core..TransactionType)
    * [~FeeQuantNQT](#module_core..FeeQuantNQT)
    * [~assertAttachmentVersion(transaction, versionIdentifier)](#module_core..assertAttachmentVersion)
    * [~getContractDatablock(position, length)](#module_core..getContractDatablock) ⇒
    * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
    * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
    * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
    * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..BurstNode"></a>

### core~BurstNode
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..TransactionArbitrarySubtype"></a>

### core~TransactionArbitrarySubtype
<p>Constants for arbitrary subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionAssetSubtype"></a>

### core~TransactionAssetSubtype
<p>Constants for asset subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionEscrowSubtype"></a>

### core~TransactionEscrowSubtype
<p>Constants for escrow subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionLeasingSubtype"></a>

### core~TransactionLeasingSubtype
<p>Constants for leasing subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionMarketplaceSubtype"></a>

### core~TransactionMarketplaceSubtype
<p>Constants for marketplace subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionPaymentSubtype"></a>

### core~TransactionPaymentSubtype
<p>Constants for payment subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionRewardRecipientSubtype"></a>

### core~TransactionRewardRecipientSubtype
<p>Constants for reward recipient subtypes (Pool Operation)</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionSmartContractSubtype"></a>

### core~TransactionSmartContractSubtype
<p>Constants for smart contract (aka AT) subtypes</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..TransactionType"></a>

### core~TransactionType
<p>Constants for transaction types</p>
<p>The transaction type is part of every [[Transaction]] object
and used to distinguish block data. Additionally, to the transaction type
a subtype is sent, that specifies the kind of transaction more detailly.</p>

**Kind**: inner property of [<code>core</code>](#module_core)  
<a name="module_core..FeeQuantNQT"></a>

### core~FeeQuantNQT
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..assertAttachmentVersion"></a>

### core~assertAttachmentVersion(transaction, versionIdentifier)
<p>Asserts a specific version of a transactions attachment</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Throws**:

- <p>An exception in case of wrong version</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..getContractDatablock"></a>

### core~getContractDatablock(position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_core..getRecipientAmountsFromMultiOutPayment"></a>

### core~getRecipientAmountsFromMultiOutPayment(transaction) ⇒
<p>Tries to extract recipients and its amounts for multi out payments (different and same amount)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>A list of recipients and their payed amount (in NQT)</p>  
**Throws**:

- <p>An exception in case of wrong transaction types</p>


| Param | Description |
| --- | --- |
| transaction | <p>The transaction</p> |

<a name="module_core..getRecipientsAmount"></a>

### core~getRecipientsAmount(recipientId, transaction) ⇒
<p>Gets the amount from a transaction, considering ordinary and multi out transactions (with same and different payments)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>the amount in BURST (not NQT)</p>  

| Param | Description |
| --- | --- |
| recipientId | <p>The numeric id of the recipient</p> |
| transaction | <p>The payment transaction</p> |

<a name="module_core..isMultiOutSameTransaction"></a>

### core~isMultiOutSameTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction with same amounts for each recipient</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="module_core..isMultiOutTransaction"></a>

### core~isMultiOutTransaction(transaction) ⇒
<p>Checks if a transaction is a multi out transaction (with different amounts)</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>true, if is a multi out transaction</p>  

| Param | Description |
| --- | --- |
| transaction | <p>Transaction to be checked</p> |

<a name="ApiSettings"></a>

## ApiSettings
<p>Context for API used in [[composeApi]]</p>

**Kind**: global class  
<a name="ContractHelper"></a>

## ContractHelper
<p>Helper class for contracts</p>
<p>A contract owns additional data, which is splitted in 8 byte blocks.
The content is encoded in hexadecimal representation and big endianness.
This helper class facilitates access to these data</p>

**Kind**: global class  

* [ContractHelper](#ContractHelper)
    * [.contract](#ContractHelper+contract) ⇒
    * [.getVariableAsString(index)](#ContractHelper+getVariableAsString) ⇒
    * [.getDataBlocksAsString(index, count)](#ContractHelper+getDataBlocksAsString) ⇒
    * [.getVariableAsDecimal(index)](#ContractHelper+getVariableAsDecimal) ⇒
    * [.getVariable(index)](#ContractHelper+getVariable) ⇒
    * [.getHexDataAt(index, length)](#ContractHelper+getHexDataAt) ⇒

<a name="ContractHelper+contract"></a>

### contractHelper.contract ⇒
**Kind**: instance property of [<code>ContractHelper</code>](#ContractHelper)  
**Returns**: <p>Get the contract</p>  
<a name="ContractHelper+getVariableAsString"></a>

### contractHelper.getVariableAsString(index) ⇒
<p>Get a variable as string</p>

**Kind**: instance method of [<code>ContractHelper</code>](#ContractHelper)  
**Returns**: <p>The data as string (Utf-8)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="ContractHelper+getDataBlocksAsString"></a>

### contractHelper.getDataBlocksAsString(index, count) ⇒
<p>Get multiple data blocks as string</p>

**Kind**: instance method of [<code>ContractHelper</code>](#ContractHelper)  
**Returns**: <p>The data as string (Utf-8)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |
| count | <p>Number of blocks</p> |

<a name="ContractHelper+getVariableAsDecimal"></a>

### contractHelper.getVariableAsDecimal(index) ⇒
<p>Get a variable as decimal (string)</p>

**Kind**: instance method of [<code>ContractHelper</code>](#ContractHelper)  
**Returns**: <p>The data as a decimal string sequence</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="ContractHelper+getVariable"></a>

### contractHelper.getVariable(index) ⇒
<p>Get a variable at given position/index</p>

**Kind**: instance method of [<code>ContractHelper</code>](#ContractHelper)  
**Returns**: <p>The data as hexadecimal string (in little endianness)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="ContractHelper+getHexDataAt"></a>

### contractHelper.getHexDataAt(index, length) ⇒
<p>Get a hexadecimal data block of arbitrary length at given position/index</p>

**Kind**: instance method of [<code>ContractHelper</code>](#ContractHelper)  
**Returns**: <p>The data as hexadecimal string (in little endianness)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |
| length | <p>The length of the data block (must be a multiple of 2)</p> |

<a name="BurstService"></a>

## BurstService
<p>Generic BRS Web Service class.</p>

**Kind**: global class  

* [BurstService](#BurstService)
    * [new BurstService(settings)](#new_BurstService_new)
    * [.toBRSEndpoint(method, data)](#BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args)](#BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body)](#BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

<a name="new_BurstService_new"></a>

### new BurstService(settings)
<p>Creates Service instance</p>


| Param | Description |
| --- | --- |
| settings | <p>The settings for the service</p> |

<a name="BurstService+toBRSEndpoint"></a>

### burstService.toBRSEndpoint(method, data) ⇒ <code>string</code>
<p>Mounts a BRS conform API (V1) endpoint of format <code>&lt;host&gt;?requestType=getBlock&amp;height=123</code></p>

**Kind**: instance method of [<code>BurstService</code>](#BurstService)  
**Returns**: <code>string</code> - <p>The mounted url (without host)</p>  
**See**: https://burstwiki.org/wiki/The_Burst_API  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The method name for <code>requestType</code></p> |
| data | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="BurstService+query"></a>

### burstService.query(method, args) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |

<a name="BurstService+send"></a>

### burstService.send(method, args, body) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Send data to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API. Note that there are only a few POST methods</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| body | <code>any</code> | <p>An object with key value pairs to submit as post body</p> |

<a name="ApiSettings"></a>

## ApiSettings ⇒
<p>Composes the API, i.e. setup the environment and mounts the API structure
with its functions.</p>
<pre class="prettyprint source lang-ts"><code>const api = composeApi({
  nodeHost: 'https://wallet1.burst-team.us:2083', // one of the mainnet nodes
  apiRootUrl: '/burst' // endpoint to the BURST API
})
</code></pre>
<blockquote>
<p>Note, that this method mounts the <strong>entire</strong> API, i.e. all available methods. One may also customize the API composition
using [[ApiComposer]].</p>
</blockquote>

**Kind**: global variable  
**Returns**: <p>The <em>complete</em> API</p>  

| Param | Description |
| --- | --- |
| settings | <p>necessary execution context</p> |

