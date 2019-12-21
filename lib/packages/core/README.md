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
<dd><p>Settings for API used in [[composeApi]]</p></dd>
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
})
</code></pre>
<blockquote>
<p>Note, that this method mounts the <strong>entire</strong> API, i.e. all available methods. One may also customize the API composition
using [[ApiComposer]].</p>
</blockquote></dd>
</dl>

## Functions

<dl>
<dt><a href="#createParametersFromAttachment">createParametersFromAttachment(attachment, params)</a> ⇒</dt>
<dd><p>Creates BRS Http send parameters for a transaction from attachment data</p></dd>
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
            * [.withAssetApi(creatorMap)](#core.module_api..ApiComposer+withAssetApi)
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
<p>The <code>with&lt;section&gt;Api</code> uses factory methods from the <a href="/phoenix/docs/modules/core.api.factories.html">api.core.factories</a> package</p>

**Kind**: inner class of [<code>api</code>](#core.module_api)  

* [~ApiComposer](#core.module_api..ApiComposer)
    * _instance_
        * [.withBlockApi(creatorMap)](#core.module_api..ApiComposer+withBlockApi)
        * [.withAccountApi(creatorMap)](#core.module_api..ApiComposer+withAccountApi)
        * [.withNetworkApi(creatorMap)](#core.module_api..ApiComposer+withNetworkApi)
        * [.withMessageApi(creatorMap)](#core.module_api..ApiComposer+withMessageApi)
        * [.withTransactionApi(creatorMap)](#core.module_api..ApiComposer+withTransactionApi)
        * [.withAliasApi(creatorMap)](#core.module_api..ApiComposer+withAliasApi)
        * [.withAssetApi(creatorMap)](#core.module_api..ApiComposer+withAssetApi)
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

<a name="core.module_api..ApiComposer+withAssetApi"></a>

#### apiComposer.withAssetApi(creatorMap)
<p>Adds the [[AssetApi]]  to be composed</p>

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
    * _static_
        * [.FeeQuantPlanck](#module_core.FeeQuantPlanck)
        * [.DefaultDeadline](#module_core.DefaultDeadline)
        * [.Attachment](#module_core.Attachment)
        * [.AttachmentMessage](#module_core.AttachmentMessage)
    * _inner_
        * [~Account](#module_core..Account)
        * [~Attachment](#module_core..Attachment)
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
        * [~FeeQuantPlanck](#module_core..FeeQuantPlanck)
        * [~getAttachmentVersion(transaction)](#module_core..getAttachmentVersion) ⇒
        * [~isAttachmentVersion(transaction, versionIdentifier)](#module_core..isAttachmentVersion) ⇒
        * ~~[~constructAttachment(transaction, params)](#module_core..constructAttachment) ⇒~~
        * [~signAndBroadcastTransaction(unsignedTransaction, service)](#module_core..signAndBroadcastTransaction) ⇒
        * [~getRecipientAmountsFromMultiOutPayment(transaction)](#module_core..getRecipientAmountsFromMultiOutPayment) ⇒
        * [~getRecipientsAmount(recipientId, transaction)](#module_core..getRecipientsAmount) ⇒
        * [~isMultiOutSameTransaction(transaction)](#module_core..isMultiOutSameTransaction) ⇒
        * [~isMultiOutTransaction(transaction)](#module_core..isMultiOutTransaction) ⇒

<a name="module_core.FeeQuantPlanck"></a>

### core.FeeQuantPlanck
<p>The default deadline (in minutes) for Transactions</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.DefaultDeadline"></a>

### core.DefaultDeadline
<p>The default endpoint for [[ApiSettings]]</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.Attachment"></a>

### core.Attachment
<p>Message class</p>
<p>The Message class is used to model a plain message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core.AttachmentMessage"></a>

### core.AttachmentMessage
<p>EncryptedMessage class</p>
<p>The EncryptedMessage class is a model for a encrypted message attached to a transaction.</p>

**Kind**: static property of [<code>core</code>](#module_core)  
<a name="module_core..Account"></a>

### core~Account
<p>Account class</p>
<p>The account class serves as a model for a Burstcoin account.
It's meant to model the response from BRS API, except publicKey
has been moved into the keys object.</p>

**Kind**: inner class of [<code>core</code>](#module_core)  
<a name="module_core..Attachment"></a>

### core~Attachment
<p>Attachment class</p>
<p>The attachment class is used to appended to transaction where appropriate.
It is a super class for Message and EncryptedMessage.</p>

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
<a name="module_core..FeeQuantPlanck"></a>

### core~FeeQuantPlanck
<p>The smallest possible fee</p>

**Kind**: inner constant of [<code>core</code>](#module_core)  
<a name="module_core..getAttachmentVersion"></a>

### core~getAttachmentVersion(transaction) ⇒
<p>Get the transaction attachment version identifier</p>
<p>Attachment types are identified by a field <em>version.<Identifier></em></p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>return <em>Identifier</em>, if exists, otherwise <code>undefined</code></p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |

<a name="module_core..isAttachmentVersion"></a>

### core~isAttachmentVersion(transaction, versionIdentifier) ⇒
<p>Checks if a transaction attachment is of specific version</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p><em>true</em>, if version string matches</p>  

| Param | Description |
| --- | --- |
| transaction | <p>The transaction to be checked</p> |
| versionIdentifier | <p>The version string, i.e. MultiOutCreation</p> |

<a name="module_core..constructAttachment"></a>

### ~~core~constructAttachment(transaction, params) ⇒~~
***Deprecated***

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| transaction | <p>The transaction with the attachment</p> |
| params | <p>Some HttpParams</p> |

<a name="module_core..signAndBroadcastTransaction"></a>

### core~signAndBroadcastTransaction(unsignedTransaction, service) ⇒
<p>Signs and broadcasts a transaction</p>

**Kind**: inner method of [<code>core</code>](#module_core)  
**Returns**: <p>The transaction Id</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| unsignedTransaction | <p>The unsigned transaction context</p> |
| service | <p>The service used for</p> |

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
<p>Settings for API used in [[composeApi]]</p>

**Kind**: global class  
<a name="new_ApiSettings_new"></a>

### new ApiSettings(nodeHost, apiVersion, httpClientOptions)

| Param | Type | Description |
| --- | --- | --- |
| nodeHost | <code>string</code> | <p>The url of the Burst peer</p> |
| apiVersion | <code>ApiVersion</code> | <p>For future usage.</p> |
| httpClientOptions | <code>any</code> \| <code>AxiosRequestSettings</code> | <p>Optional http options, like additional header. The default implementation uses axios. In case of a custom client pass your own options. see <a href="https://github.com/axios/axios#request-config">Axios Configuration</a></p> |

<a name="BurstService"></a>

## BurstService
<p>Generic BRS Web Service class.</p>

**Kind**: global class  

* [BurstService](#BurstService)
    * [new BurstService(settings)](#new_BurstService_new)
    * [.toBRSEndpoint(method, data)](#BurstService+toBRSEndpoint) ⇒ <code>string</code>
    * [.query(method, args, options)](#BurstService+query) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.send(method, args, body, options)](#BurstService+send) ⇒ <code>Promise.&lt;T&gt;</code>

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

### burstService.query(method, args, options) ⇒ <code>Promise.&lt;T&gt;</code>
<p>Requests a query to BRS</p>

**Kind**: instance method of [<code>BurstService</code>](#BurstService)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The response data of success</p>  
**Throws**:

- <p>HttpError in case of failure</p>


| Param | Type | Description |
| --- | --- | --- |
| method | <code>string</code> | <p>The BRS method according https://burstwiki.org/wiki/The_Burst_API</p> |
| args | <code>any</code> | <p>A JSON object which will be mapped to url params</p> |
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="BurstService+send"></a>

### burstService.send(method, args, body, options) ⇒ <code>Promise.&lt;T&gt;</code>
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
| options | <code>any</code> \| <code>AxiosRequestConfig</code> | <p>The optional request configuration for the passed Http client</p> |

<a name="ApiSettings"></a>

## ApiSettings ⇒
<p>Composes the API, i.e. setup the environment and mounts the API structure
with its functions.</p>
<pre class="prettyprint source lang-ts"><code>const api = composeApi({
  nodeHost: 'https://wallet1.burst-team.us:2083', // one of the mainnet nodes
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

<a name="new_ApiSettings_new"></a>

### new ApiSettings(nodeHost, apiVersion, httpClientOptions)

| Param | Type | Description |
| --- | --- | --- |
| nodeHost | <code>string</code> | <p>The url of the Burst peer</p> |
| apiVersion | <code>ApiVersion</code> | <p>For future usage.</p> |
| httpClientOptions | <code>any</code> \| <code>AxiosRequestSettings</code> | <p>Optional http options, like additional header. The default implementation uses axios. In case of a custom client pass your own options. see <a href="https://github.com/axios/axios#request-config">Axios Configuration</a></p> |

<a name="createParametersFromAttachment"></a>

## createParametersFromAttachment(attachment, params) ⇒
<p>Creates BRS Http send parameters for a transaction from attachment data</p>

**Kind**: global function  
**Returns**: <p>HttpParams</p>  
**Hidden**:   

| Param | Description |
| --- | --- |
| attachment | <p>The attachment</p> |
| params | <p>Any object</p> |

