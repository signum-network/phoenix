# @burstjs/crypto

Cryptographic functions for building Burstcoin apps.

## Installation

burstJS can be used with NodeJS or Web. Two formats are available

### Using with NodeJS and/or modern web frameworks

Install using [npm](https://www.npmjs.org/):

```
npm install @burstjs/crypto
```

or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @burstjs/crypto
```

#### Example

```js
import {encryptAES, decryptAES, hashSHA256} from '@burstjs/crypto'

const encrypted = encryptAES('test', 'key')
const decrypted = decryptAES(encrypted, 'key')
console.log(hashSHA256('test'))
console.log(decrypted)
```


### Using in classic `<script>`

Each package is available as bundled standalone library using IIFE.
This way _burstJS_ can be used also within `<script>`-Tags.
This might be useful for Wordpress and/or other PHP applications.

Just import the package using the HTML `<script>` tag.

`<script src='https://cdn.jsdelivr.net/npm/@burstjs/crypto/dist/burstjs.crypto.min.js'></script>`


#### Example

```js
const encrypted = b$crypto.encryptAES("test", "key");
const decrypted = b$crypto.decryptAES(encrypted, "key");
console.log(b$crypto.hashSHA256("test"));
console.log(decrypted);
```

See more here:

[@burstjs/crypto Online Documentation](https://burstappsteam.org/phoenix/modules/crypto.html)

---

## API Reference

## Classes

<dl>
<dt><a href="#Converter">Converter</a></dt>
<dd><p>A set of useful converter methods for crypto operations.</p></dd>
</dl>

## crypto

* [crypto](#module_crypto)
    * _static_
        * [.getAccountIdFromPublicKey](#module_crypto.getAccountIdFromPublicKey) ⇒
    * _inner_
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~decryptAES(encryptedBase64, key)](#module_crypto..decryptAES) ⇒
        * [~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptData) ⇒
        * [~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptMessage) ⇒
        * [~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptData) ⇒
        * [~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptMessage) ⇒
        * [~generateMasterKeys(passPhrase)](#module_crypto..generateMasterKeys) ⇒
        * [~generateSignature(messageHex, privateKey)](#module_crypto..generateSignature)
        * [~generateSignedTransactionBytes(unsignedTransactionHex, signature)](#module_crypto..generateSignedTransactionBytes) ⇒
        * [~getAccountIdFromPublicKey(publicKey)](#module_crypto..getAccountIdFromPublicKey) ⇒
        * [~verifySignature(signature, messageHex, publicKey)](#module_crypto..verifySignature)

<a name="module_crypto.getAccountIdFromPublicKey"></a>

### crypto.getAccountIdFromPublicKey ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: static property of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| s | <p>A hexadecimal string</p> |

<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..decryptAES"></a>

### crypto~decryptAES(encryptedBase64, key) ⇒
<p>Decrypt an encrypted message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The decrypted content</p>  

| Param | Description |
| --- | --- |
| encryptedBase64 | <p>encrypted data in base64 format</p> |
| key | <p>The secret key</p> |

<a name="module_crypto..decryptData"></a>

### crypto~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted cipher text</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original plain text</p>  

| Param | Description |
| --- | --- |
| encryptedData | <p>The encrypted data</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..decryptMessage"></a>

### crypto~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted Message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original message</p>  

| Param | Description |
| --- | --- |
| encryptedMessage | <p>The encrypted message</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..encryptData"></a>

### crypto~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts arbitrary data</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Data</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Data to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key in hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..encryptMessage"></a>

### crypto~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts a message (UTF-8 compatible)</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Message</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Message to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..generateMasterKeys"></a>

### crypto~generateMasterKeys(passPhrase) ⇒
<p>Generate the Master Public Key and Master Private Key for a new passphrase</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>EC-KCDSA sign key pair + agreement key</p>  

| Param | Description |
| --- | --- |
| passPhrase | <p>The passphrase</p> |

<a name="module_crypto..generateSignature"></a>

### crypto~generateSignature(messageHex, privateKey)
<p>Generate a signature for the transaction</p>
<p>Method:</p>
<pre class="prettyprint source"><code> s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
         sha256(sha256(transactionHex)_privateKey),
         privateKey)
 p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| messageHex | <p>The data in hexadecimal representation</p> |
| privateKey | <p>The private key for signing</p> |

<a name="module_crypto..generateSignedTransactionBytes"></a>

### crypto~generateSignedTransactionBytes(unsignedTransactionHex, signature) ⇒
<p>Generates a signed message digest</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The signed message digest</p>  

| Param | Description |
| --- | --- |
| unsignedTransactionHex | <p>The unsigned message</p> |
| signature | <p>The signature</p> |

<a name="module_crypto..getAccountIdFromPublicKey"></a>

### crypto~getAccountIdFromPublicKey(publicKey) ⇒
<p>Convert hex string of the public key to the account id</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The numeric account Id</p>  

| Param | Description |
| --- | --- |
| publicKey | <p>The public key</p> |

<a name="module_crypto..verifySignature"></a>

### crypto~verifySignature(signature, messageHex, publicKey)
<p>Verify a signature for given message</p>
<ul>
<li>Method:</li>
</ul>
<pre class="prettyprint source"><code>* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
==
sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| signature | <p>The signature to be verified</p> |
| messageHex | <p>The message data in hexadecimal representation</p> |
| publicKey | <p>The public key</p> |

<a name="module_crypto"></a>

## crypto

* [crypto](#module_crypto)
    * _static_
        * [.getAccountIdFromPublicKey](#module_crypto.getAccountIdFromPublicKey) ⇒
    * _inner_
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~decryptAES(encryptedBase64, key)](#module_crypto..decryptAES) ⇒
        * [~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptData) ⇒
        * [~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptMessage) ⇒
        * [~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptData) ⇒
        * [~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptMessage) ⇒
        * [~generateMasterKeys(passPhrase)](#module_crypto..generateMasterKeys) ⇒
        * [~generateSignature(messageHex, privateKey)](#module_crypto..generateSignature)
        * [~generateSignedTransactionBytes(unsignedTransactionHex, signature)](#module_crypto..generateSignedTransactionBytes) ⇒
        * [~getAccountIdFromPublicKey(publicKey)](#module_crypto..getAccountIdFromPublicKey) ⇒
        * [~verifySignature(signature, messageHex, publicKey)](#module_crypto..verifySignature)

<a name="module_crypto.getAccountIdFromPublicKey"></a>

### crypto.getAccountIdFromPublicKey ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: static property of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| s | <p>A hexadecimal string</p> |

<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..decryptAES"></a>

### crypto~decryptAES(encryptedBase64, key) ⇒
<p>Decrypt an encrypted message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The decrypted content</p>  

| Param | Description |
| --- | --- |
| encryptedBase64 | <p>encrypted data in base64 format</p> |
| key | <p>The secret key</p> |

<a name="module_crypto..decryptData"></a>

### crypto~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted cipher text</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original plain text</p>  

| Param | Description |
| --- | --- |
| encryptedData | <p>The encrypted data</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..decryptMessage"></a>

### crypto~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted Message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original message</p>  

| Param | Description |
| --- | --- |
| encryptedMessage | <p>The encrypted message</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..encryptData"></a>

### crypto~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts arbitrary data</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Data</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Data to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key in hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..encryptMessage"></a>

### crypto~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts a message (UTF-8 compatible)</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Message</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Message to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..generateMasterKeys"></a>

### crypto~generateMasterKeys(passPhrase) ⇒
<p>Generate the Master Public Key and Master Private Key for a new passphrase</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>EC-KCDSA sign key pair + agreement key</p>  

| Param | Description |
| --- | --- |
| passPhrase | <p>The passphrase</p> |

<a name="module_crypto..generateSignature"></a>

### crypto~generateSignature(messageHex, privateKey)
<p>Generate a signature for the transaction</p>
<p>Method:</p>
<pre class="prettyprint source"><code> s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
         sha256(sha256(transactionHex)_privateKey),
         privateKey)
 p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| messageHex | <p>The data in hexadecimal representation</p> |
| privateKey | <p>The private key for signing</p> |

<a name="module_crypto..generateSignedTransactionBytes"></a>

### crypto~generateSignedTransactionBytes(unsignedTransactionHex, signature) ⇒
<p>Generates a signed message digest</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The signed message digest</p>  

| Param | Description |
| --- | --- |
| unsignedTransactionHex | <p>The unsigned message</p> |
| signature | <p>The signature</p> |

<a name="module_crypto..getAccountIdFromPublicKey"></a>

### crypto~getAccountIdFromPublicKey(publicKey) ⇒
<p>Convert hex string of the public key to the account id</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The numeric account Id</p>  

| Param | Description |
| --- | --- |
| publicKey | <p>The public key</p> |

<a name="module_crypto..verifySignature"></a>

### crypto~verifySignature(signature, messageHex, publicKey)
<p>Verify a signature for given message</p>
<ul>
<li>Method:</li>
</ul>
<pre class="prettyprint source"><code>* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
==
sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| signature | <p>The signature to be verified</p> |
| messageHex | <p>The message data in hexadecimal representation</p> |
| publicKey | <p>The public key</p> |

<a name="module_crypto"></a>

## crypto

* [crypto](#module_crypto)
    * _static_
        * [.getAccountIdFromPublicKey](#module_crypto.getAccountIdFromPublicKey) ⇒
    * _inner_
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~decryptAES(encryptedBase64, key)](#module_crypto..decryptAES) ⇒
        * [~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptData) ⇒
        * [~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptMessage) ⇒
        * [~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptData) ⇒
        * [~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptMessage) ⇒
        * [~generateMasterKeys(passPhrase)](#module_crypto..generateMasterKeys) ⇒
        * [~generateSignature(messageHex, privateKey)](#module_crypto..generateSignature)
        * [~generateSignedTransactionBytes(unsignedTransactionHex, signature)](#module_crypto..generateSignedTransactionBytes) ⇒
        * [~getAccountIdFromPublicKey(publicKey)](#module_crypto..getAccountIdFromPublicKey) ⇒
        * [~verifySignature(signature, messageHex, publicKey)](#module_crypto..verifySignature)

<a name="module_crypto.getAccountIdFromPublicKey"></a>

### crypto.getAccountIdFromPublicKey ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: static property of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| s | <p>A hexadecimal string</p> |

<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..decryptAES"></a>

### crypto~decryptAES(encryptedBase64, key) ⇒
<p>Decrypt an encrypted message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The decrypted content</p>  

| Param | Description |
| --- | --- |
| encryptedBase64 | <p>encrypted data in base64 format</p> |
| key | <p>The secret key</p> |

<a name="module_crypto..decryptData"></a>

### crypto~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted cipher text</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original plain text</p>  

| Param | Description |
| --- | --- |
| encryptedData | <p>The encrypted data</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..decryptMessage"></a>

### crypto~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted Message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original message</p>  

| Param | Description |
| --- | --- |
| encryptedMessage | <p>The encrypted message</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..encryptData"></a>

### crypto~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts arbitrary data</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Data</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Data to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key in hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..encryptMessage"></a>

### crypto~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts a message (UTF-8 compatible)</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Message</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Message to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..generateMasterKeys"></a>

### crypto~generateMasterKeys(passPhrase) ⇒
<p>Generate the Master Public Key and Master Private Key for a new passphrase</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>EC-KCDSA sign key pair + agreement key</p>  

| Param | Description |
| --- | --- |
| passPhrase | <p>The passphrase</p> |

<a name="module_crypto..generateSignature"></a>

### crypto~generateSignature(messageHex, privateKey)
<p>Generate a signature for the transaction</p>
<p>Method:</p>
<pre class="prettyprint source"><code> s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
         sha256(sha256(transactionHex)_privateKey),
         privateKey)
 p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| messageHex | <p>The data in hexadecimal representation</p> |
| privateKey | <p>The private key for signing</p> |

<a name="module_crypto..generateSignedTransactionBytes"></a>

### crypto~generateSignedTransactionBytes(unsignedTransactionHex, signature) ⇒
<p>Generates a signed message digest</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The signed message digest</p>  

| Param | Description |
| --- | --- |
| unsignedTransactionHex | <p>The unsigned message</p> |
| signature | <p>The signature</p> |

<a name="module_crypto..getAccountIdFromPublicKey"></a>

### crypto~getAccountIdFromPublicKey(publicKey) ⇒
<p>Convert hex string of the public key to the account id</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The numeric account Id</p>  

| Param | Description |
| --- | --- |
| publicKey | <p>The public key</p> |

<a name="module_crypto..verifySignature"></a>

### crypto~verifySignature(signature, messageHex, publicKey)
<p>Verify a signature for given message</p>
<ul>
<li>Method:</li>
</ul>
<pre class="prettyprint source"><code>* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
==
sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| signature | <p>The signature to be verified</p> |
| messageHex | <p>The message data in hexadecimal representation</p> |
| publicKey | <p>The public key</p> |

<a name="module_crypto"></a>

## crypto

* [crypto](#module_crypto)
    * _static_
        * [.getAccountIdFromPublicKey](#module_crypto.getAccountIdFromPublicKey) ⇒
    * _inner_
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~decryptAES(encryptedBase64, key)](#module_crypto..decryptAES) ⇒
        * [~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptData) ⇒
        * [~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptMessage) ⇒
        * [~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptData) ⇒
        * [~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptMessage) ⇒
        * [~generateMasterKeys(passPhrase)](#module_crypto..generateMasterKeys) ⇒
        * [~generateSignature(messageHex, privateKey)](#module_crypto..generateSignature)
        * [~generateSignedTransactionBytes(unsignedTransactionHex, signature)](#module_crypto..generateSignedTransactionBytes) ⇒
        * [~getAccountIdFromPublicKey(publicKey)](#module_crypto..getAccountIdFromPublicKey) ⇒
        * [~verifySignature(signature, messageHex, publicKey)](#module_crypto..verifySignature)

<a name="module_crypto.getAccountIdFromPublicKey"></a>

### crypto.getAccountIdFromPublicKey ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: static property of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| s | <p>A hexadecimal string</p> |

<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..decryptAES"></a>

### crypto~decryptAES(encryptedBase64, key) ⇒
<p>Decrypt an encrypted message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The decrypted content</p>  

| Param | Description |
| --- | --- |
| encryptedBase64 | <p>encrypted data in base64 format</p> |
| key | <p>The secret key</p> |

<a name="module_crypto..decryptData"></a>

### crypto~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted cipher text</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original plain text</p>  

| Param | Description |
| --- | --- |
| encryptedData | <p>The encrypted data</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..decryptMessage"></a>

### crypto~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted Message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original message</p>  

| Param | Description |
| --- | --- |
| encryptedMessage | <p>The encrypted message</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..encryptData"></a>

### crypto~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts arbitrary data</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Data</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Data to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key in hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..encryptMessage"></a>

### crypto~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts a message (UTF-8 compatible)</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Message</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Message to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..generateMasterKeys"></a>

### crypto~generateMasterKeys(passPhrase) ⇒
<p>Generate the Master Public Key and Master Private Key for a new passphrase</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>EC-KCDSA sign key pair + agreement key</p>  

| Param | Description |
| --- | --- |
| passPhrase | <p>The passphrase</p> |

<a name="module_crypto..generateSignature"></a>

### crypto~generateSignature(messageHex, privateKey)
<p>Generate a signature for the transaction</p>
<p>Method:</p>
<pre class="prettyprint source"><code> s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
         sha256(sha256(transactionHex)_privateKey),
         privateKey)
 p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| messageHex | <p>The data in hexadecimal representation</p> |
| privateKey | <p>The private key for signing</p> |

<a name="module_crypto..generateSignedTransactionBytes"></a>

### crypto~generateSignedTransactionBytes(unsignedTransactionHex, signature) ⇒
<p>Generates a signed message digest</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The signed message digest</p>  

| Param | Description |
| --- | --- |
| unsignedTransactionHex | <p>The unsigned message</p> |
| signature | <p>The signature</p> |

<a name="module_crypto..getAccountIdFromPublicKey"></a>

### crypto~getAccountIdFromPublicKey(publicKey) ⇒
<p>Convert hex string of the public key to the account id</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The numeric account Id</p>  

| Param | Description |
| --- | --- |
| publicKey | <p>The public key</p> |

<a name="module_crypto..verifySignature"></a>

### crypto~verifySignature(signature, messageHex, publicKey)
<p>Verify a signature for given message</p>
<ul>
<li>Method:</li>
</ul>
<pre class="prettyprint source"><code>* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
==
sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| signature | <p>The signature to be verified</p> |
| messageHex | <p>The message data in hexadecimal representation</p> |
| publicKey | <p>The public key</p> |

<a name="module_crypto"></a>

## crypto

* [crypto](#module_crypto)
    * _static_
        * [.getAccountIdFromPublicKey](#module_crypto.getAccountIdFromPublicKey) ⇒
    * _inner_
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~decryptAES(encryptedBase64, key)](#module_crypto..decryptAES) ⇒
        * [~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptData) ⇒
        * [~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptMessage) ⇒
        * [~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptData) ⇒
        * [~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptMessage) ⇒
        * [~generateMasterKeys(passPhrase)](#module_crypto..generateMasterKeys) ⇒
        * [~generateSignature(messageHex, privateKey)](#module_crypto..generateSignature)
        * [~generateSignedTransactionBytes(unsignedTransactionHex, signature)](#module_crypto..generateSignedTransactionBytes) ⇒
        * [~getAccountIdFromPublicKey(publicKey)](#module_crypto..getAccountIdFromPublicKey) ⇒
        * [~verifySignature(signature, messageHex, publicKey)](#module_crypto..verifySignature)

<a name="module_crypto.getAccountIdFromPublicKey"></a>

### crypto.getAccountIdFromPublicKey ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: static property of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| s | <p>A hexadecimal string</p> |

<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..decryptAES"></a>

### crypto~decryptAES(encryptedBase64, key) ⇒
<p>Decrypt an encrypted message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The decrypted content</p>  

| Param | Description |
| --- | --- |
| encryptedBase64 | <p>encrypted data in base64 format</p> |
| key | <p>The secret key</p> |

<a name="module_crypto..decryptData"></a>

### crypto~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted cipher text</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original plain text</p>  

| Param | Description |
| --- | --- |
| encryptedData | <p>The encrypted data</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..decryptMessage"></a>

### crypto~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted Message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original message</p>  

| Param | Description |
| --- | --- |
| encryptedMessage | <p>The encrypted message</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..encryptData"></a>

### crypto~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts arbitrary data</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Data</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Data to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key in hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..encryptMessage"></a>

### crypto~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts a message (UTF-8 compatible)</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Message</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Message to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..generateMasterKeys"></a>

### crypto~generateMasterKeys(passPhrase) ⇒
<p>Generate the Master Public Key and Master Private Key for a new passphrase</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>EC-KCDSA sign key pair + agreement key</p>  

| Param | Description |
| --- | --- |
| passPhrase | <p>The passphrase</p> |

<a name="module_crypto..generateSignature"></a>

### crypto~generateSignature(messageHex, privateKey)
<p>Generate a signature for the transaction</p>
<p>Method:</p>
<pre class="prettyprint source"><code> s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
         sha256(sha256(transactionHex)_privateKey),
         privateKey)
 p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| messageHex | <p>The data in hexadecimal representation</p> |
| privateKey | <p>The private key for signing</p> |

<a name="module_crypto..generateSignedTransactionBytes"></a>

### crypto~generateSignedTransactionBytes(unsignedTransactionHex, signature) ⇒
<p>Generates a signed message digest</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The signed message digest</p>  

| Param | Description |
| --- | --- |
| unsignedTransactionHex | <p>The unsigned message</p> |
| signature | <p>The signature</p> |

<a name="module_crypto..getAccountIdFromPublicKey"></a>

### crypto~getAccountIdFromPublicKey(publicKey) ⇒
<p>Convert hex string of the public key to the account id</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The numeric account Id</p>  

| Param | Description |
| --- | --- |
| publicKey | <p>The public key</p> |

<a name="module_crypto..verifySignature"></a>

### crypto~verifySignature(signature, messageHex, publicKey)
<p>Verify a signature for given message</p>
<ul>
<li>Method:</li>
</ul>
<pre class="prettyprint source"><code>* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
==
sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| signature | <p>The signature to be verified</p> |
| messageHex | <p>The message data in hexadecimal representation</p> |
| publicKey | <p>The public key</p> |

<a name="module_crypto"></a>

## crypto

* [crypto](#module_crypto)
    * _static_
        * [.getAccountIdFromPublicKey](#module_crypto.getAccountIdFromPublicKey) ⇒
    * _inner_
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~decryptAES(encryptedBase64, key)](#module_crypto..decryptAES) ⇒
        * [~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptData) ⇒
        * [~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptMessage) ⇒
        * [~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptData) ⇒
        * [~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptMessage) ⇒
        * [~generateMasterKeys(passPhrase)](#module_crypto..generateMasterKeys) ⇒
        * [~generateSignature(messageHex, privateKey)](#module_crypto..generateSignature)
        * [~generateSignedTransactionBytes(unsignedTransactionHex, signature)](#module_crypto..generateSignedTransactionBytes) ⇒
        * [~getAccountIdFromPublicKey(publicKey)](#module_crypto..getAccountIdFromPublicKey) ⇒
        * [~verifySignature(signature, messageHex, publicKey)](#module_crypto..verifySignature)

<a name="module_crypto.getAccountIdFromPublicKey"></a>

### crypto.getAccountIdFromPublicKey ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: static property of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| s | <p>A hexadecimal string</p> |

<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..decryptAES"></a>

### crypto~decryptAES(encryptedBase64, key) ⇒
<p>Decrypt an encrypted message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The decrypted content</p>  

| Param | Description |
| --- | --- |
| encryptedBase64 | <p>encrypted data in base64 format</p> |
| key | <p>The secret key</p> |

<a name="module_crypto..decryptData"></a>

### crypto~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted cipher text</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original plain text</p>  

| Param | Description |
| --- | --- |
| encryptedData | <p>The encrypted data</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..decryptMessage"></a>

### crypto~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted Message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original message</p>  

| Param | Description |
| --- | --- |
| encryptedMessage | <p>The encrypted message</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..encryptData"></a>

### crypto~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts arbitrary data</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Data</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Data to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key in hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..encryptMessage"></a>

### crypto~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts a message (UTF-8 compatible)</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Message</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Message to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..generateMasterKeys"></a>

### crypto~generateMasterKeys(passPhrase) ⇒
<p>Generate the Master Public Key and Master Private Key for a new passphrase</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>EC-KCDSA sign key pair + agreement key</p>  

| Param | Description |
| --- | --- |
| passPhrase | <p>The passphrase</p> |

<a name="module_crypto..generateSignature"></a>

### crypto~generateSignature(messageHex, privateKey)
<p>Generate a signature for the transaction</p>
<p>Method:</p>
<pre class="prettyprint source"><code> s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
         sha256(sha256(transactionHex)_privateKey),
         privateKey)
 p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| messageHex | <p>The data in hexadecimal representation</p> |
| privateKey | <p>The private key for signing</p> |

<a name="module_crypto..generateSignedTransactionBytes"></a>

### crypto~generateSignedTransactionBytes(unsignedTransactionHex, signature) ⇒
<p>Generates a signed message digest</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The signed message digest</p>  

| Param | Description |
| --- | --- |
| unsignedTransactionHex | <p>The unsigned message</p> |
| signature | <p>The signature</p> |

<a name="module_crypto..getAccountIdFromPublicKey"></a>

### crypto~getAccountIdFromPublicKey(publicKey) ⇒
<p>Convert hex string of the public key to the account id</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The numeric account Id</p>  

| Param | Description |
| --- | --- |
| publicKey | <p>The public key</p> |

<a name="module_crypto..verifySignature"></a>

### crypto~verifySignature(signature, messageHex, publicKey)
<p>Verify a signature for given message</p>
<ul>
<li>Method:</li>
</ul>
<pre class="prettyprint source"><code>* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
==
sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| signature | <p>The signature to be verified</p> |
| messageHex | <p>The message data in hexadecimal representation</p> |
| publicKey | <p>The public key</p> |

<a name="module_crypto"></a>

## crypto

* [crypto](#module_crypto)
    * _static_
        * [.getAccountIdFromPublicKey](#module_crypto.getAccountIdFromPublicKey) ⇒
    * _inner_
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~decryptAES(encryptedBase64, key)](#module_crypto..decryptAES) ⇒
        * [~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptData) ⇒
        * [~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptMessage) ⇒
        * [~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptData) ⇒
        * [~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptMessage) ⇒
        * [~generateMasterKeys(passPhrase)](#module_crypto..generateMasterKeys) ⇒
        * [~generateSignature(messageHex, privateKey)](#module_crypto..generateSignature)
        * [~generateSignedTransactionBytes(unsignedTransactionHex, signature)](#module_crypto..generateSignedTransactionBytes) ⇒
        * [~getAccountIdFromPublicKey(publicKey)](#module_crypto..getAccountIdFromPublicKey) ⇒
        * [~verifySignature(signature, messageHex, publicKey)](#module_crypto..verifySignature)

<a name="module_crypto.getAccountIdFromPublicKey"></a>

### crypto.getAccountIdFromPublicKey ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: static property of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| s | <p>A hexadecimal string</p> |

<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..decryptAES"></a>

### crypto~decryptAES(encryptedBase64, key) ⇒
<p>Decrypt an encrypted message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The decrypted content</p>  

| Param | Description |
| --- | --- |
| encryptedBase64 | <p>encrypted data in base64 format</p> |
| key | <p>The secret key</p> |

<a name="module_crypto..decryptData"></a>

### crypto~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted cipher text</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original plain text</p>  

| Param | Description |
| --- | --- |
| encryptedData | <p>The encrypted data</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..decryptMessage"></a>

### crypto~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted Message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original message</p>  

| Param | Description |
| --- | --- |
| encryptedMessage | <p>The encrypted message</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..encryptData"></a>

### crypto~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts arbitrary data</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Data</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Data to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key in hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..encryptMessage"></a>

### crypto~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts a message (UTF-8 compatible)</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Message</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Message to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..generateMasterKeys"></a>

### crypto~generateMasterKeys(passPhrase) ⇒
<p>Generate the Master Public Key and Master Private Key for a new passphrase</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>EC-KCDSA sign key pair + agreement key</p>  

| Param | Description |
| --- | --- |
| passPhrase | <p>The passphrase</p> |

<a name="module_crypto..generateSignature"></a>

### crypto~generateSignature(messageHex, privateKey)
<p>Generate a signature for the transaction</p>
<p>Method:</p>
<pre class="prettyprint source"><code> s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
         sha256(sha256(transactionHex)_privateKey),
         privateKey)
 p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| messageHex | <p>The data in hexadecimal representation</p> |
| privateKey | <p>The private key for signing</p> |

<a name="module_crypto..generateSignedTransactionBytes"></a>

### crypto~generateSignedTransactionBytes(unsignedTransactionHex, signature) ⇒
<p>Generates a signed message digest</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The signed message digest</p>  

| Param | Description |
| --- | --- |
| unsignedTransactionHex | <p>The unsigned message</p> |
| signature | <p>The signature</p> |

<a name="module_crypto..getAccountIdFromPublicKey"></a>

### crypto~getAccountIdFromPublicKey(publicKey) ⇒
<p>Convert hex string of the public key to the account id</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The numeric account Id</p>  

| Param | Description |
| --- | --- |
| publicKey | <p>The public key</p> |

<a name="module_crypto..verifySignature"></a>

### crypto~verifySignature(signature, messageHex, publicKey)
<p>Verify a signature for given message</p>
<ul>
<li>Method:</li>
</ul>
<pre class="prettyprint source"><code>* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
==
sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| signature | <p>The signature to be verified</p> |
| messageHex | <p>The message data in hexadecimal representation</p> |
| publicKey | <p>The public key</p> |

<a name="module_crypto"></a>

## crypto

* [crypto](#module_crypto)
    * _static_
        * [.getAccountIdFromPublicKey](#module_crypto.getAccountIdFromPublicKey) ⇒
    * _inner_
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~decryptAES(encryptedBase64, key)](#module_crypto..decryptAES) ⇒
        * [~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptData) ⇒
        * [~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptMessage) ⇒
        * [~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptData) ⇒
        * [~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptMessage) ⇒
        * [~generateMasterKeys(passPhrase)](#module_crypto..generateMasterKeys) ⇒
        * [~generateSignature(messageHex, privateKey)](#module_crypto..generateSignature)
        * [~generateSignedTransactionBytes(unsignedTransactionHex, signature)](#module_crypto..generateSignedTransactionBytes) ⇒
        * [~getAccountIdFromPublicKey(publicKey)](#module_crypto..getAccountIdFromPublicKey) ⇒
        * [~verifySignature(signature, messageHex, publicKey)](#module_crypto..verifySignature)

<a name="module_crypto.getAccountIdFromPublicKey"></a>

### crypto.getAccountIdFromPublicKey ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: static property of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| s | <p>A hexadecimal string</p> |

<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..decryptAES"></a>

### crypto~decryptAES(encryptedBase64, key) ⇒
<p>Decrypt an encrypted message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The decrypted content</p>  

| Param | Description |
| --- | --- |
| encryptedBase64 | <p>encrypted data in base64 format</p> |
| key | <p>The secret key</p> |

<a name="module_crypto..decryptData"></a>

### crypto~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted cipher text</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original plain text</p>  

| Param | Description |
| --- | --- |
| encryptedData | <p>The encrypted data</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..decryptMessage"></a>

### crypto~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted Message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original message</p>  

| Param | Description |
| --- | --- |
| encryptedMessage | <p>The encrypted message</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..encryptData"></a>

### crypto~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts arbitrary data</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Data</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Data to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key in hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..encryptMessage"></a>

### crypto~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts a message (UTF-8 compatible)</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Message</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Message to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..generateMasterKeys"></a>

### crypto~generateMasterKeys(passPhrase) ⇒
<p>Generate the Master Public Key and Master Private Key for a new passphrase</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>EC-KCDSA sign key pair + agreement key</p>  

| Param | Description |
| --- | --- |
| passPhrase | <p>The passphrase</p> |

<a name="module_crypto..generateSignature"></a>

### crypto~generateSignature(messageHex, privateKey)
<p>Generate a signature for the transaction</p>
<p>Method:</p>
<pre class="prettyprint source"><code> s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
         sha256(sha256(transactionHex)_privateKey),
         privateKey)
 p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| messageHex | <p>The data in hexadecimal representation</p> |
| privateKey | <p>The private key for signing</p> |

<a name="module_crypto..generateSignedTransactionBytes"></a>

### crypto~generateSignedTransactionBytes(unsignedTransactionHex, signature) ⇒
<p>Generates a signed message digest</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The signed message digest</p>  

| Param | Description |
| --- | --- |
| unsignedTransactionHex | <p>The unsigned message</p> |
| signature | <p>The signature</p> |

<a name="module_crypto..getAccountIdFromPublicKey"></a>

### crypto~getAccountIdFromPublicKey(publicKey) ⇒
<p>Convert hex string of the public key to the account id</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The numeric account Id</p>  

| Param | Description |
| --- | --- |
| publicKey | <p>The public key</p> |

<a name="module_crypto..verifySignature"></a>

### crypto~verifySignature(signature, messageHex, publicKey)
<p>Verify a signature for given message</p>
<ul>
<li>Method:</li>
</ul>
<pre class="prettyprint source"><code>* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
==
sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| signature | <p>The signature to be verified</p> |
| messageHex | <p>The message data in hexadecimal representation</p> |
| publicKey | <p>The public key</p> |

<a name="module_crypto"></a>

## crypto

* [crypto](#module_crypto)
    * _static_
        * [.getAccountIdFromPublicKey](#module_crypto.getAccountIdFromPublicKey) ⇒
    * _inner_
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~decryptAES(encryptedBase64, key)](#module_crypto..decryptAES) ⇒
        * [~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptData) ⇒
        * [~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptMessage) ⇒
        * [~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptData) ⇒
        * [~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptMessage) ⇒
        * [~generateMasterKeys(passPhrase)](#module_crypto..generateMasterKeys) ⇒
        * [~generateSignature(messageHex, privateKey)](#module_crypto..generateSignature)
        * [~generateSignedTransactionBytes(unsignedTransactionHex, signature)](#module_crypto..generateSignedTransactionBytes) ⇒
        * [~getAccountIdFromPublicKey(publicKey)](#module_crypto..getAccountIdFromPublicKey) ⇒
        * [~verifySignature(signature, messageHex, publicKey)](#module_crypto..verifySignature)

<a name="module_crypto.getAccountIdFromPublicKey"></a>

### crypto.getAccountIdFromPublicKey ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: static property of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| s | <p>A hexadecimal string</p> |

<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..decryptAES"></a>

### crypto~decryptAES(encryptedBase64, key) ⇒
<p>Decrypt an encrypted message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The decrypted content</p>  

| Param | Description |
| --- | --- |
| encryptedBase64 | <p>encrypted data in base64 format</p> |
| key | <p>The secret key</p> |

<a name="module_crypto..decryptData"></a>

### crypto~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted cipher text</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original plain text</p>  

| Param | Description |
| --- | --- |
| encryptedData | <p>The encrypted data</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..decryptMessage"></a>

### crypto~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted Message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original message</p>  

| Param | Description |
| --- | --- |
| encryptedMessage | <p>The encrypted message</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..encryptData"></a>

### crypto~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts arbitrary data</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Data</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Data to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key in hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..encryptMessage"></a>

### crypto~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts a message (UTF-8 compatible)</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Message</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Message to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..generateMasterKeys"></a>

### crypto~generateMasterKeys(passPhrase) ⇒
<p>Generate the Master Public Key and Master Private Key for a new passphrase</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>EC-KCDSA sign key pair + agreement key</p>  

| Param | Description |
| --- | --- |
| passPhrase | <p>The passphrase</p> |

<a name="module_crypto..generateSignature"></a>

### crypto~generateSignature(messageHex, privateKey)
<p>Generate a signature for the transaction</p>
<p>Method:</p>
<pre class="prettyprint source"><code> s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
         sha256(sha256(transactionHex)_privateKey),
         privateKey)
 p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| messageHex | <p>The data in hexadecimal representation</p> |
| privateKey | <p>The private key for signing</p> |

<a name="module_crypto..generateSignedTransactionBytes"></a>

### crypto~generateSignedTransactionBytes(unsignedTransactionHex, signature) ⇒
<p>Generates a signed message digest</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The signed message digest</p>  

| Param | Description |
| --- | --- |
| unsignedTransactionHex | <p>The unsigned message</p> |
| signature | <p>The signature</p> |

<a name="module_crypto..getAccountIdFromPublicKey"></a>

### crypto~getAccountIdFromPublicKey(publicKey) ⇒
<p>Convert hex string of the public key to the account id</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The numeric account Id</p>  

| Param | Description |
| --- | --- |
| publicKey | <p>The public key</p> |

<a name="module_crypto..verifySignature"></a>

### crypto~verifySignature(signature, messageHex, publicKey)
<p>Verify a signature for given message</p>
<ul>
<li>Method:</li>
</ul>
<pre class="prettyprint source"><code>* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
==
sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| signature | <p>The signature to be verified</p> |
| messageHex | <p>The message data in hexadecimal representation</p> |
| publicKey | <p>The public key</p> |

<a name="module_crypto"></a>

## crypto

* [crypto](#module_crypto)
    * _static_
        * [.getAccountIdFromPublicKey](#module_crypto.getAccountIdFromPublicKey) ⇒
    * _inner_
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~decryptAES(encryptedBase64, key)](#module_crypto..decryptAES) ⇒
        * [~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptData) ⇒
        * [~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptMessage) ⇒
        * [~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptData) ⇒
        * [~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptMessage) ⇒
        * [~generateMasterKeys(passPhrase)](#module_crypto..generateMasterKeys) ⇒
        * [~generateSignature(messageHex, privateKey)](#module_crypto..generateSignature)
        * [~generateSignedTransactionBytes(unsignedTransactionHex, signature)](#module_crypto..generateSignedTransactionBytes) ⇒
        * [~getAccountIdFromPublicKey(publicKey)](#module_crypto..getAccountIdFromPublicKey) ⇒
        * [~verifySignature(signature, messageHex, publicKey)](#module_crypto..verifySignature)

<a name="module_crypto.getAccountIdFromPublicKey"></a>

### crypto.getAccountIdFromPublicKey ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: static property of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| s | <p>A hexadecimal string</p> |

<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..decryptAES"></a>

### crypto~decryptAES(encryptedBase64, key) ⇒
<p>Decrypt an encrypted message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The decrypted content</p>  

| Param | Description |
| --- | --- |
| encryptedBase64 | <p>encrypted data in base64 format</p> |
| key | <p>The secret key</p> |

<a name="module_crypto..decryptData"></a>

### crypto~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted cipher text</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original plain text</p>  

| Param | Description |
| --- | --- |
| encryptedData | <p>The encrypted data</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..decryptMessage"></a>

### crypto~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted Message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original message</p>  

| Param | Description |
| --- | --- |
| encryptedMessage | <p>The encrypted message</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..encryptData"></a>

### crypto~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts arbitrary data</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Data</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Data to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key in hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..encryptMessage"></a>

### crypto~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts a message (UTF-8 compatible)</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Message</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Message to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..generateMasterKeys"></a>

### crypto~generateMasterKeys(passPhrase) ⇒
<p>Generate the Master Public Key and Master Private Key for a new passphrase</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>EC-KCDSA sign key pair + agreement key</p>  

| Param | Description |
| --- | --- |
| passPhrase | <p>The passphrase</p> |

<a name="module_crypto..generateSignature"></a>

### crypto~generateSignature(messageHex, privateKey)
<p>Generate a signature for the transaction</p>
<p>Method:</p>
<pre class="prettyprint source"><code> s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
         sha256(sha256(transactionHex)_privateKey),
         privateKey)
 p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| messageHex | <p>The data in hexadecimal representation</p> |
| privateKey | <p>The private key for signing</p> |

<a name="module_crypto..generateSignedTransactionBytes"></a>

### crypto~generateSignedTransactionBytes(unsignedTransactionHex, signature) ⇒
<p>Generates a signed message digest</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The signed message digest</p>  

| Param | Description |
| --- | --- |
| unsignedTransactionHex | <p>The unsigned message</p> |
| signature | <p>The signature</p> |

<a name="module_crypto..getAccountIdFromPublicKey"></a>

### crypto~getAccountIdFromPublicKey(publicKey) ⇒
<p>Convert hex string of the public key to the account id</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The numeric account Id</p>  

| Param | Description |
| --- | --- |
| publicKey | <p>The public key</p> |

<a name="module_crypto..verifySignature"></a>

### crypto~verifySignature(signature, messageHex, publicKey)
<p>Verify a signature for given message</p>
<ul>
<li>Method:</li>
</ul>
<pre class="prettyprint source"><code>* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
==
sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| signature | <p>The signature to be verified</p> |
| messageHex | <p>The message data in hexadecimal representation</p> |
| publicKey | <p>The public key</p> |

<a name="module_crypto"></a>

## crypto

* [crypto](#module_crypto)
    * _static_
        * [.getAccountIdFromPublicKey](#module_crypto.getAccountIdFromPublicKey) ⇒
    * _inner_
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~decryptAES(encryptedBase64, key)](#module_crypto..decryptAES) ⇒
        * [~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptData) ⇒
        * [~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptMessage) ⇒
        * [~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptData) ⇒
        * [~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptMessage) ⇒
        * [~generateMasterKeys(passPhrase)](#module_crypto..generateMasterKeys) ⇒
        * [~generateSignature(messageHex, privateKey)](#module_crypto..generateSignature)
        * [~generateSignedTransactionBytes(unsignedTransactionHex, signature)](#module_crypto..generateSignedTransactionBytes) ⇒
        * [~getAccountIdFromPublicKey(publicKey)](#module_crypto..getAccountIdFromPublicKey) ⇒
        * [~verifySignature(signature, messageHex, publicKey)](#module_crypto..verifySignature)

<a name="module_crypto.getAccountIdFromPublicKey"></a>

### crypto.getAccountIdFromPublicKey ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: static property of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| s | <p>A hexadecimal string</p> |

<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..decryptAES"></a>

### crypto~decryptAES(encryptedBase64, key) ⇒
<p>Decrypt an encrypted message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The decrypted content</p>  

| Param | Description |
| --- | --- |
| encryptedBase64 | <p>encrypted data in base64 format</p> |
| key | <p>The secret key</p> |

<a name="module_crypto..decryptData"></a>

### crypto~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted cipher text</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original plain text</p>  

| Param | Description |
| --- | --- |
| encryptedData | <p>The encrypted data</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..decryptMessage"></a>

### crypto~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted Message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original message</p>  

| Param | Description |
| --- | --- |
| encryptedMessage | <p>The encrypted message</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..encryptData"></a>

### crypto~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts arbitrary data</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Data</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Data to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key in hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..encryptMessage"></a>

### crypto~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts a message (UTF-8 compatible)</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Message</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Message to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..generateMasterKeys"></a>

### crypto~generateMasterKeys(passPhrase) ⇒
<p>Generate the Master Public Key and Master Private Key for a new passphrase</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>EC-KCDSA sign key pair + agreement key</p>  

| Param | Description |
| --- | --- |
| passPhrase | <p>The passphrase</p> |

<a name="module_crypto..generateSignature"></a>

### crypto~generateSignature(messageHex, privateKey)
<p>Generate a signature for the transaction</p>
<p>Method:</p>
<pre class="prettyprint source"><code> s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
         sha256(sha256(transactionHex)_privateKey),
         privateKey)
 p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| messageHex | <p>The data in hexadecimal representation</p> |
| privateKey | <p>The private key for signing</p> |

<a name="module_crypto..generateSignedTransactionBytes"></a>

### crypto~generateSignedTransactionBytes(unsignedTransactionHex, signature) ⇒
<p>Generates a signed message digest</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The signed message digest</p>  

| Param | Description |
| --- | --- |
| unsignedTransactionHex | <p>The unsigned message</p> |
| signature | <p>The signature</p> |

<a name="module_crypto..getAccountIdFromPublicKey"></a>

### crypto~getAccountIdFromPublicKey(publicKey) ⇒
<p>Convert hex string of the public key to the account id</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The numeric account Id</p>  

| Param | Description |
| --- | --- |
| publicKey | <p>The public key</p> |

<a name="module_crypto..verifySignature"></a>

### crypto~verifySignature(signature, messageHex, publicKey)
<p>Verify a signature for given message</p>
<ul>
<li>Method:</li>
</ul>
<pre class="prettyprint source"><code>* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
==
sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| signature | <p>The signature to be verified</p> |
| messageHex | <p>The message data in hexadecimal representation</p> |
| publicKey | <p>The public key</p> |

<a name="module_crypto"></a>

## crypto

* [crypto](#module_crypto)
    * _static_
        * [.getAccountIdFromPublicKey](#module_crypto.getAccountIdFromPublicKey) ⇒
    * _inner_
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~decryptAES(encryptedBase64, key)](#module_crypto..decryptAES) ⇒
        * [~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptData) ⇒
        * [~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptMessage) ⇒
        * [~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptData) ⇒
        * [~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptMessage) ⇒
        * [~generateMasterKeys(passPhrase)](#module_crypto..generateMasterKeys) ⇒
        * [~generateSignature(messageHex, privateKey)](#module_crypto..generateSignature)
        * [~generateSignedTransactionBytes(unsignedTransactionHex, signature)](#module_crypto..generateSignedTransactionBytes) ⇒
        * [~getAccountIdFromPublicKey(publicKey)](#module_crypto..getAccountIdFromPublicKey) ⇒
        * [~verifySignature(signature, messageHex, publicKey)](#module_crypto..verifySignature)

<a name="module_crypto.getAccountIdFromPublicKey"></a>

### crypto.getAccountIdFromPublicKey ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: static property of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| s | <p>A hexadecimal string</p> |

<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..decryptAES"></a>

### crypto~decryptAES(encryptedBase64, key) ⇒
<p>Decrypt an encrypted message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The decrypted content</p>  

| Param | Description |
| --- | --- |
| encryptedBase64 | <p>encrypted data in base64 format</p> |
| key | <p>The secret key</p> |

<a name="module_crypto..decryptData"></a>

### crypto~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted cipher text</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original plain text</p>  

| Param | Description |
| --- | --- |
| encryptedData | <p>The encrypted data</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..decryptMessage"></a>

### crypto~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted Message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original message</p>  

| Param | Description |
| --- | --- |
| encryptedMessage | <p>The encrypted message</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..encryptData"></a>

### crypto~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts arbitrary data</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Data</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Data to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key in hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..encryptMessage"></a>

### crypto~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts a message (UTF-8 compatible)</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Message</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Message to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..generateMasterKeys"></a>

### crypto~generateMasterKeys(passPhrase) ⇒
<p>Generate the Master Public Key and Master Private Key for a new passphrase</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>EC-KCDSA sign key pair + agreement key</p>  

| Param | Description |
| --- | --- |
| passPhrase | <p>The passphrase</p> |

<a name="module_crypto..generateSignature"></a>

### crypto~generateSignature(messageHex, privateKey)
<p>Generate a signature for the transaction</p>
<p>Method:</p>
<pre class="prettyprint source"><code> s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
         sha256(sha256(transactionHex)_privateKey),
         privateKey)
 p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| messageHex | <p>The data in hexadecimal representation</p> |
| privateKey | <p>The private key for signing</p> |

<a name="module_crypto..generateSignedTransactionBytes"></a>

### crypto~generateSignedTransactionBytes(unsignedTransactionHex, signature) ⇒
<p>Generates a signed message digest</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The signed message digest</p>  

| Param | Description |
| --- | --- |
| unsignedTransactionHex | <p>The unsigned message</p> |
| signature | <p>The signature</p> |

<a name="module_crypto..getAccountIdFromPublicKey"></a>

### crypto~getAccountIdFromPublicKey(publicKey) ⇒
<p>Convert hex string of the public key to the account id</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The numeric account Id</p>  

| Param | Description |
| --- | --- |
| publicKey | <p>The public key</p> |

<a name="module_crypto..verifySignature"></a>

### crypto~verifySignature(signature, messageHex, publicKey)
<p>Verify a signature for given message</p>
<ul>
<li>Method:</li>
</ul>
<pre class="prettyprint source"><code>* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
==
sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| signature | <p>The signature to be verified</p> |
| messageHex | <p>The message data in hexadecimal representation</p> |
| publicKey | <p>The public key</p> |

<a name="module_crypto"></a>

## crypto

* [crypto](#module_crypto)
    * _static_
        * [.getAccountIdFromPublicKey](#module_crypto.getAccountIdFromPublicKey) ⇒
    * _inner_
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~decryptAES(encryptedBase64, key)](#module_crypto..decryptAES) ⇒
        * [~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptData) ⇒
        * [~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptMessage) ⇒
        * [~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptData) ⇒
        * [~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptMessage) ⇒
        * [~generateMasterKeys(passPhrase)](#module_crypto..generateMasterKeys) ⇒
        * [~generateSignature(messageHex, privateKey)](#module_crypto..generateSignature)
        * [~generateSignedTransactionBytes(unsignedTransactionHex, signature)](#module_crypto..generateSignedTransactionBytes) ⇒
        * [~getAccountIdFromPublicKey(publicKey)](#module_crypto..getAccountIdFromPublicKey) ⇒
        * [~verifySignature(signature, messageHex, publicKey)](#module_crypto..verifySignature)

<a name="module_crypto.getAccountIdFromPublicKey"></a>

### crypto.getAccountIdFromPublicKey ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: static property of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| s | <p>A hexadecimal string</p> |

<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..decryptAES"></a>

### crypto~decryptAES(encryptedBase64, key) ⇒
<p>Decrypt an encrypted message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The decrypted content</p>  

| Param | Description |
| --- | --- |
| encryptedBase64 | <p>encrypted data in base64 format</p> |
| key | <p>The secret key</p> |

<a name="module_crypto..decryptData"></a>

### crypto~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted cipher text</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original plain text</p>  

| Param | Description |
| --- | --- |
| encryptedData | <p>The encrypted data</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..decryptMessage"></a>

### crypto~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted Message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original message</p>  

| Param | Description |
| --- | --- |
| encryptedMessage | <p>The encrypted message</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..encryptData"></a>

### crypto~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts arbitrary data</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Data</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Data to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key in hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..encryptMessage"></a>

### crypto~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts a message (UTF-8 compatible)</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Message</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Message to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..generateMasterKeys"></a>

### crypto~generateMasterKeys(passPhrase) ⇒
<p>Generate the Master Public Key and Master Private Key for a new passphrase</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>EC-KCDSA sign key pair + agreement key</p>  

| Param | Description |
| --- | --- |
| passPhrase | <p>The passphrase</p> |

<a name="module_crypto..generateSignature"></a>

### crypto~generateSignature(messageHex, privateKey)
<p>Generate a signature for the transaction</p>
<p>Method:</p>
<pre class="prettyprint source"><code> s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
         sha256(sha256(transactionHex)_privateKey),
         privateKey)
 p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| messageHex | <p>The data in hexadecimal representation</p> |
| privateKey | <p>The private key for signing</p> |

<a name="module_crypto..generateSignedTransactionBytes"></a>

### crypto~generateSignedTransactionBytes(unsignedTransactionHex, signature) ⇒
<p>Generates a signed message digest</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The signed message digest</p>  

| Param | Description |
| --- | --- |
| unsignedTransactionHex | <p>The unsigned message</p> |
| signature | <p>The signature</p> |

<a name="module_crypto..getAccountIdFromPublicKey"></a>

### crypto~getAccountIdFromPublicKey(publicKey) ⇒
<p>Convert hex string of the public key to the account id</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The numeric account Id</p>  

| Param | Description |
| --- | --- |
| publicKey | <p>The public key</p> |

<a name="module_crypto..verifySignature"></a>

### crypto~verifySignature(signature, messageHex, publicKey)
<p>Verify a signature for given message</p>
<ul>
<li>Method:</li>
</ul>
<pre class="prettyprint source"><code>* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
==
sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| signature | <p>The signature to be verified</p> |
| messageHex | <p>The message data in hexadecimal representation</p> |
| publicKey | <p>The public key</p> |

<a name="module_crypto"></a>

## crypto

* [crypto](#module_crypto)
    * _static_
        * [.getAccountIdFromPublicKey](#module_crypto.getAccountIdFromPublicKey) ⇒
    * _inner_
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~decryptAES(encryptedBase64, key)](#module_crypto..decryptAES) ⇒
        * [~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptData) ⇒
        * [~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptMessage) ⇒
        * [~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptData) ⇒
        * [~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptMessage) ⇒
        * [~generateMasterKeys(passPhrase)](#module_crypto..generateMasterKeys) ⇒
        * [~generateSignature(messageHex, privateKey)](#module_crypto..generateSignature)
        * [~generateSignedTransactionBytes(unsignedTransactionHex, signature)](#module_crypto..generateSignedTransactionBytes) ⇒
        * [~getAccountIdFromPublicKey(publicKey)](#module_crypto..getAccountIdFromPublicKey) ⇒
        * [~verifySignature(signature, messageHex, publicKey)](#module_crypto..verifySignature)

<a name="module_crypto.getAccountIdFromPublicKey"></a>

### crypto.getAccountIdFromPublicKey ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: static property of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| s | <p>A hexadecimal string</p> |

<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..decryptAES"></a>

### crypto~decryptAES(encryptedBase64, key) ⇒
<p>Decrypt an encrypted message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The decrypted content</p>  

| Param | Description |
| --- | --- |
| encryptedBase64 | <p>encrypted data in base64 format</p> |
| key | <p>The secret key</p> |

<a name="module_crypto..decryptData"></a>

### crypto~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted cipher text</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original plain text</p>  

| Param | Description |
| --- | --- |
| encryptedData | <p>The encrypted data</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..decryptMessage"></a>

### crypto~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted Message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original message</p>  

| Param | Description |
| --- | --- |
| encryptedMessage | <p>The encrypted message</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..encryptData"></a>

### crypto~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts arbitrary data</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Data</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Data to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key in hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..encryptMessage"></a>

### crypto~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts a message (UTF-8 compatible)</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Message</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Message to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..generateMasterKeys"></a>

### crypto~generateMasterKeys(passPhrase) ⇒
<p>Generate the Master Public Key and Master Private Key for a new passphrase</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>EC-KCDSA sign key pair + agreement key</p>  

| Param | Description |
| --- | --- |
| passPhrase | <p>The passphrase</p> |

<a name="module_crypto..generateSignature"></a>

### crypto~generateSignature(messageHex, privateKey)
<p>Generate a signature for the transaction</p>
<p>Method:</p>
<pre class="prettyprint source"><code> s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
         sha256(sha256(transactionHex)_privateKey),
         privateKey)
 p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| messageHex | <p>The data in hexadecimal representation</p> |
| privateKey | <p>The private key for signing</p> |

<a name="module_crypto..generateSignedTransactionBytes"></a>

### crypto~generateSignedTransactionBytes(unsignedTransactionHex, signature) ⇒
<p>Generates a signed message digest</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The signed message digest</p>  

| Param | Description |
| --- | --- |
| unsignedTransactionHex | <p>The unsigned message</p> |
| signature | <p>The signature</p> |

<a name="module_crypto..getAccountIdFromPublicKey"></a>

### crypto~getAccountIdFromPublicKey(publicKey) ⇒
<p>Convert hex string of the public key to the account id</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The numeric account Id</p>  

| Param | Description |
| --- | --- |
| publicKey | <p>The public key</p> |

<a name="module_crypto..verifySignature"></a>

### crypto~verifySignature(signature, messageHex, publicKey)
<p>Verify a signature for given message</p>
<ul>
<li>Method:</li>
</ul>
<pre class="prettyprint source"><code>* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
==
sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| signature | <p>The signature to be verified</p> |
| messageHex | <p>The message data in hexadecimal representation</p> |
| publicKey | <p>The public key</p> |

<a name="module_crypto"></a>

## crypto

* [crypto](#module_crypto)
    * _static_
        * [.getAccountIdFromPublicKey](#module_crypto.getAccountIdFromPublicKey) ⇒
    * _inner_
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~IV_LENGTH](#module_crypto..IV_LENGTH)
        * [~decryptAES(encryptedBase64, key)](#module_crypto..decryptAES) ⇒
        * [~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptData) ⇒
        * [~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex)](#module_crypto..decryptMessage) ⇒
        * [~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptData) ⇒
        * [~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex)](#module_crypto..encryptMessage) ⇒
        * [~generateMasterKeys(passPhrase)](#module_crypto..generateMasterKeys) ⇒
        * [~generateSignature(messageHex, privateKey)](#module_crypto..generateSignature)
        * [~generateSignedTransactionBytes(unsignedTransactionHex, signature)](#module_crypto..generateSignedTransactionBytes) ⇒
        * [~getAccountIdFromPublicKey(publicKey)](#module_crypto..getAccountIdFromPublicKey) ⇒
        * [~verifySignature(signature, messageHex, publicKey)](#module_crypto..verifySignature)

<a name="module_crypto.getAccountIdFromPublicKey"></a>

### crypto.getAccountIdFromPublicKey ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: static property of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| s | <p>A hexadecimal string</p> |

<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..IV_LENGTH"></a>

### crypto~IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: inner constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto..decryptAES"></a>

### crypto~decryptAES(encryptedBase64, key) ⇒
<p>Decrypt an encrypted message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The decrypted content</p>  

| Param | Description |
| --- | --- |
| encryptedBase64 | <p>encrypted data in base64 format</p> |
| key | <p>The secret key</p> |

<a name="module_crypto..decryptData"></a>

### crypto~decryptData(encryptedData, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted cipher text</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original plain text</p>  

| Param | Description |
| --- | --- |
| encryptedData | <p>The encrypted data</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..decryptMessage"></a>

### crypto~decryptMessage(encryptedMessage, senderPublicKeyHex, recipientPrivateKeyHex) ⇒
<p>Decrypts an encrypted Message</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The original message</p>  

| Param | Description |
| --- | --- |
| encryptedMessage | <p>The encrypted message</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto..encryptData"></a>

### crypto~encryptData(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts arbitrary data</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Data</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Data to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key in hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..encryptMessage"></a>

### crypto~encryptMessage(plaintext, recipientPublicKeyHex, senderPrivateKeyHex) ⇒
<p>Encrypts a message (UTF-8 compatible)</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The encrypted Message</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Message to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto..generateMasterKeys"></a>

### crypto~generateMasterKeys(passPhrase) ⇒
<p>Generate the Master Public Key and Master Private Key for a new passphrase</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>EC-KCDSA sign key pair + agreement key</p>  

| Param | Description |
| --- | --- |
| passPhrase | <p>The passphrase</p> |

<a name="module_crypto..generateSignature"></a>

### crypto~generateSignature(messageHex, privateKey)
<p>Generate a signature for the transaction</p>
<p>Method:</p>
<pre class="prettyprint source"><code> s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
         sha256(sha256(transactionHex)_privateKey),
         privateKey)
 p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| messageHex | <p>The data in hexadecimal representation</p> |
| privateKey | <p>The private key for signing</p> |

<a name="module_crypto..generateSignedTransactionBytes"></a>

### crypto~generateSignedTransactionBytes(unsignedTransactionHex, signature) ⇒
<p>Generates a signed message digest</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The signed message digest</p>  

| Param | Description |
| --- | --- |
| unsignedTransactionHex | <p>The unsigned message</p> |
| signature | <p>The signature</p> |

<a name="module_crypto..getAccountIdFromPublicKey"></a>

### crypto~getAccountIdFromPublicKey(publicKey) ⇒
<p>Convert hex string of the public key to the account id</p>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  
**Returns**: <p>The numeric account Id</p>  

| Param | Description |
| --- | --- |
| publicKey | <p>The public key</p> |

<a name="module_crypto..verifySignature"></a>

### crypto~verifySignature(signature, messageHex, publicKey)
<p>Verify a signature for given message</p>
<ul>
<li>Method:</li>
</ul>
<pre class="prettyprint source"><code>* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
==
sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
</code></pre>

**Kind**: inner method of [<code>crypto</code>](#module_crypto)  

| Param | Description |
| --- | --- |
| signature | <p>The signature to be verified</p> |
| messageHex | <p>The message data in hexadecimal representation</p> |
| publicKey | <p>The public key</p> |

<a name="Converter"></a>

## Converter
<p>A set of useful converter methods for crypto operations.</p>

**Kind**: global class  

* [Converter](#Converter)
    * [.intToBytes_()](#Converter.intToBytes_)
    * [.convertStringToBase64(text)](#Converter.convertStringToBase64) ⇒
    * [.convertBase64ToString(base64)](#Converter.convertBase64ToString) ⇒

<a name="Converter.intToBytes_"></a>

### Converter.intToBytes\_()
<p>Produces an array of the specified number of bytes to represent the integer
value. Default output encodes ints in little endian format. Handles signed
as well as unsigned integers. Due to limitations in JavaScript's number
format, x cannot be a true 64 bit integer (8 bytes).</p>

**Kind**: static method of [<code>Converter</code>](#Converter)  
<a name="Converter.convertStringToBase64"></a>

### Converter.convertStringToBase64(text) ⇒
<p>Converts a string to base64</p>

**Kind**: static method of [<code>Converter</code>](#Converter)  
**Returns**: <p>the converted base64 string</p>  

| Param | Description |
| --- | --- |
| text | <p>The string to be converted</p> |

<a name="Converter.convertBase64ToString"></a>

### Converter.convertBase64ToString(base64) ⇒
<p>Converts a base64 string to clear text</p>

**Kind**: static method of [<code>Converter</code>](#Converter)  
**Returns**: <p>the clear text string</p>  

| Param | Description |
| --- | --- |
| base64 | <p>The base64 string to be converted</p> |

