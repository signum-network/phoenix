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
<dt><a href="#Converter">Converter</a></dt>
<dd><p>A set of useful converter methods for crypto operations.</p></dd>
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

<a name="Converter"></a>

## Converter
<p>A set of useful converter methods for crypto operations.</p>

**Kind**: global class  
<a name="Converter.intToBytes_"></a>

### Converter.intToBytes\_()
<p>Produces an array of the specified number of bytes to represent the integer
value. Default output encodes ints in little endian format. Handles signed
as well as unsigned integers. Due to limitations in JavaScript's number
format, x cannot be a true 64 bit integer (8 bytes).</p>

**Kind**: static method of [<code>Converter</code>](#Converter)  
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

