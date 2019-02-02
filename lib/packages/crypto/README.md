# @burstjs/crypto

Cryptographic functions for building Burstcoin apps.

## Installation

Install using [npm](https://www.npmjs.org/):

```
npm install @burstjs/crypto
```

or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @burstjs/crypto
```

## API Reference
## Classes

<dl>
<dt><a href="#BurstUtil">BurstUtil</a></dt>
<dd><p>The BurstUtil class provides static methods for encoding and decoding numeric ids.
In addition, addresses can be checked for validity.</p></dd>
</dl>

## Members

<dl>
<dt><a href="#BN">BN</a></dt>
<dd><p>Original work Copyright (c) 2018 PoC-Consortium<br>Modified work Copyright (c) 2019 Burst Apps Team</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#decryptAES">decryptAES(encryptedBase64, key)</a> ⇒</dt>
<dd><p>Decrypt an encrypted message</p></dd>
<dt><a href="#generateMasterKeys">generateMasterKeys(passPhrase)</a> ⇒</dt>
<dd><p>Generate the Master Public Key and Master Private Key for a new passphrase</p></dd>
<dt><a href="#generateSignature">generateSignature(messageHex, privateKey)</a></dt>
<dd><p><p>Generate a signature for the transaction</p></p>
<p><p>Method:</p></p>
<pre class="prettyprint source"><code> s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
         sha256(sha256(transactionHex)_privateKey),
         privateKey)
 p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)</code></pre></dd>
<dt><a href="#generateSignedTransactionBytes">generateSignedTransactionBytes(unsignedTransactionHex, signature)</a> ⇒</dt>
<dd><p>Generates a signed message digest</p></dd>
<dt><a href="#getAccountIdFromPublicKey">getAccountIdFromPublicKey(publicKey)</a> ⇒</dt>
<dd><p>Convert hex string of the public key to the account id</p></dd>
<dt><a href="#verifySignature">verifySignature(signature, messageHex, publicKey)</a></dt>
<dd><p><p>Verify a signature for given message</p></p>
<ul>
<li>Method:<pre class="prettyprint source"><code>* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
==
sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2</code></pre></li>
</ul></dd>
</dl>

<a name="BurstUtil"></a>

## BurstUtil
<p>The BurstUtil class provides static methods for encoding and decoding numeric ids.
In addition, addresses can be checked for validity.</p>

**Kind**: global class  

* [BurstUtil](#BurstUtil)
    * [.encode(numericId)](#BurstUtil.encode)
    * [.decode(address)](#BurstUtil.decode)
    * [.isValid(address)](#BurstUtil.isValid)
    * [.splitBurstAddress(address)](#BurstUtil.splitBurstAddress)
    * [.constructBurstAddress(parts)](#BurstUtil.constructBurstAddress)
    * [.isBurstcoinAddress(address)](#BurstUtil.isBurstcoinAddress)
    * [.convertStringToNumber(amount)](#BurstUtil.convertStringToNumber) ⇒
    * [.convertNumberToString(n)](#BurstUtil.convertNumberToString) ⇒

<a name="BurstUtil.encode"></a>

### BurstUtil.encode(numericId)
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: static method of [<code>BurstUtil</code>](#BurstUtil)  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="BurstUtil.decode"></a>

### BurstUtil.decode(address)
<p>Decode BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: static method of [<code>BurstUtil</code>](#BurstUtil)  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="BurstUtil.isValid"></a>

### BurstUtil.isValid(address)
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: static method of [<code>BurstUtil</code>](#BurstUtil)  

| Param | Description |
| --- | --- |
| address | <p>The address</p> |

<a name="BurstUtil.splitBurstAddress"></a>

### BurstUtil.splitBurstAddress(address)
<p>Split the Burst address string into an array of 4 parts</p>

**Kind**: static method of [<code>BurstUtil</code>](#BurstUtil)  

| Param | Description |
| --- | --- |
| address | <p>A valid Burst address</p> |

<a name="BurstUtil.constructBurstAddress"></a>

### BurstUtil.constructBurstAddress(parts)
<p>Construct a Burst address from a string array</p>

**Kind**: static method of [<code>BurstUtil</code>](#BurstUtil)  

| Param | Description |
| --- | --- |
| parts | <p>4 parts string array</p> |

<a name="BurstUtil.isBurstcoinAddress"></a>

### BurstUtil.isBurstcoinAddress(address)
<p>Validation Check. Quick validation of Burst addresses included</p>

**Kind**: static method of [<code>BurstUtil</code>](#BurstUtil)  

| Param | Description |
| --- | --- |
| address | <p>Burst Address</p> |

<a name="BurstUtil.convertStringToNumber"></a>

### BurstUtil.convertStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: static method of [<code>BurstUtil</code>](#BurstUtil)  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  

| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="BurstUtil.convertNumberToString"></a>

### BurstUtil.convertNumberToString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: static method of [<code>BurstUtil</code>](#BurstUtil)  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="BN"></a>

## BN
<p>Original work Copyright (c) 2018 PoC-Consortium<br>Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: global variable  
<a name="decryptAES"></a>

## decryptAES(encryptedBase64, key) ⇒
<p>Decrypt an encrypted message</p>

**Kind**: global function  
**Returns**: <p>The decrypted content</p>  

| Param | Description |
| --- | --- |
| encryptedBase64 | <p>encryprts data in base64 format</p> |
| key | <p>The secret key</p> |

<a name="generateMasterKeys"></a>

## generateMasterKeys(passPhrase) ⇒
<p>Generate the Master Public Key and Master Private Key for a new passphrase</p>

**Kind**: global function  
**Returns**: <p>EC-KCDSA sign key pair + agreement key</p>  

| Param | Description |
| --- | --- |
| passPhrase | <p>The passphrase</p> |

<a name="generateSignature"></a>

## generateSignature(messageHex, privateKey)
<p>Generate a signature for the transaction</p>
<p>Method:</p>
<pre class="prettyprint source"><code> s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
         sha256(sha256(transactionHex)_privateKey),
         privateKey)
 p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)</code></pre>

**Kind**: global function  

| Param | Description |
| --- | --- |
| messageHex | <p>The data in hexadecimal representation</p> |
| privateKey | <p>The private key for signing</p> |

<a name="generateSignedTransactionBytes"></a>

## generateSignedTransactionBytes(unsignedTransactionHex, signature) ⇒
<p>Generates a signed message digest</p>

**Kind**: global function  
**Returns**: <p>The signed message digest</p>  

| Param | Description |
| --- | --- |
| unsignedTransactionHex | <p>The unsigned message</p> |
| signature | <p>The signature</p> |

<a name="getAccountIdFromPublicKey"></a>

## getAccountIdFromPublicKey(publicKey) ⇒
<p>Convert hex string of the public key to the account id</p>

**Kind**: global function  
**Returns**: <p>The numeric account Id</p>  

| Param | Description |
| --- | --- |
| publicKey | <p>The public key</p> |

<a name="verifySignature"></a>

## verifySignature(signature, messageHex, publicKey)
<p>Verify a signature for given message</p>
<ul>
<li>Method:<pre class="prettyprint source"><code>* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
==
sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2</code></pre></li>
</ul>

**Kind**: global function  

| Param | Description |
| --- | --- |
| signature | <p>The signature to be verified</p> |
| messageHex | <p>The message data in hexadecimal representation</p> |
| publicKey | <p>The public key</p> |

