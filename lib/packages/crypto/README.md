# @signumjs/crypto

Cryptographic functions for building Signum apps.

## Installation

SignumJS can be used with NodeJS or Web. Two formats are available

### Using with NodeJS and/or modern web frameworks

Install using [npm](https://www.npmjs.org/):

```
npm install @signumjs/crypto
```

or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @signumjs/crypto
```

#### Example

```js
import {encryptAES, decryptAES, hashSHA256} from '@signumjs/crypto'

const encrypted = encryptAES('test', 'key')
const decrypted = decryptAES(encrypted, 'key')
console.log(hashSHA256('test'))
console.log(decrypted)
```


### Using in classic `<script>`

Each package is available as bundled standalone library using UMD.
This way _signumJS_ can be used also within `<script>`-Tags.
This might be useful for Wordpress and/or other PHP applications.

Just import the package using the HTML `<script>` tag.

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/crypto/dist/signumjs.crypto.min.js'></script>`


#### Example

```js
const encrypted = b$crypto.encryptAES("test", "key");
const decrypted = b$crypto.decryptAES(encrypted, "key");
console.log(b$crypto.hashSHA256("test"));
console.log(decrypted);
```

See more here:

[@signumjs/crypto Online Documentation](https://burst-apps-team.github.io/phoenix/modules/crypto.html)

---

## API Reference
## Modules

<dl>
<dt><a href="#module_crypto">crypto</a> ⇒</dt>
<dd><p>Decrypt an encrypted message</p></dd>
<dt><a href="#module_crypto">crypto</a> ⇒</dt>
<dd><p>Decrypts an encrypted cipher text</p></dd>
<dt><a href="#module_crypto">crypto</a> ⇒</dt>
<dd><p>Decrypts an encrypted Message</p></dd>
<dt><a href="#module_crypto">crypto</a> ⇒</dt>
<dd><p>Symmetrically encrypts a text using an arbitrary key</p></dd>
<dt><a href="#module_crypto">crypto</a> ⇒</dt>
<dd><p>Encrypts arbitrary data for P2P message/data exchange using asymmetric encryption</p></dd>
<dt><a href="#module_crypto">crypto</a> ⇒</dt>
<dd><p>Encrypts arbitrary message (UTF-8 compatible) for P2P message/data exchange using asymmetric encryption</p></dd>
<dt><a href="#module_crypto">crypto</a> ⇒</dt>
<dd><p>Generate the Master Public Key and Master Private Keys for a new passphrase</p></dd>
<dt><a href="#module_crypto">crypto</a> ⇒</dt>
<dd><p>Generate a signature for a transaction</p>
<p>Method:</p>
<pre class="prettyprint source"><code> s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
         sha256(sha256(transactionHex)_privateKey),
         privateKey)
 p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
</code></pre></dd>
<dt><a href="#module_crypto">crypto</a> ⇒</dt>
<dd><p>Generates a signed message digest, which can be sent to BRS API then</p></dd>
<dt><a href="#module_crypto">crypto</a> ⇒</dt>
<dd><p>Convert hex string of the public key to the account id</p></dd>
<dt><a href="#module_crypto">crypto</a> ⇒</dt>
<dd></dd>
<dt><a href="#module_crypto">crypto</a> ⇒</dt>
<dd><p>Hash string into hex string</p></dd>
<dt><a href="#module_crypto">crypto</a></dt>
<dd><p>A secure random passphrase generator</p></dd>
<dt><a href="#module_crypto">crypto</a> ⇒</dt>
<dd><p>Verify a signature for given message</p>
<ul>
<li>Method:</li>
</ul>
<pre class="prettyprint source"><code>* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
==
sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
</code></pre></dd>
<dt><a href="#module_crypto">crypto</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#Converter">Converter</a></dt>
<dd><p>A set of useful converter methods for crypto operations.</p></dd>
</dl>

## Constants

<dl>
<dt><a href="#IV_LENGTH">IV_LENGTH</a></dt>
<dd><p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p></dd>
<dt><a href="#IV_LENGTH">IV_LENGTH</a></dt>
<dd><p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p></dd>
</dl>

<a name="module_crypto"></a>

## crypto ⇒
<p>Decrypt an encrypted message</p>

**Returns**: <p>The decrypted content, or <code>undefined</code> if failed</p>  
**See**: <p>[[encryptAES]]</p>  

| Param | Description |
| --- | --- |
| encryptedBase64 | <p>encrypted data in base64 format</p> |
| key | <p>The secret key</p> |

<a name="module_crypto"></a>

## crypto ⇒
<p>Decrypts an encrypted cipher text</p>

**Returns**: <p>The original plain text</p>  

| Param | Description |
| --- | --- |
| encryptedData | <p>The encrypted data</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto"></a>

## crypto ⇒
<p>Decrypts an encrypted Message</p>

**Returns**: <p>The original message</p>  

| Param | Description |
| --- | --- |
| encryptedMessage | <p>The encrypted message</p> |
| senderPublicKeyHex | <p>The senders public key in hex format</p> |
| recipientPrivateKeyHex | <p>The recipients private (agreement) key in hex format</p> |

<a name="module_crypto"></a>

## crypto ⇒
<p>Symmetrically encrypts a text using an arbitrary key</p>

**Returns**: <p>The encrypted message as Base64 string</p>  
**See**: <p>[[decryptAES]]</p>  

| Param | Description |
| --- | --- |
| text | <p>The message/text to be encrypted</p> |
| key | <p>The key used</p> |

<a name="module_crypto"></a>

## crypto ⇒
<p>Encrypts arbitrary data for P2P message/data exchange using asymmetric encryption</p>

**Returns**: <p>The encrypted Data</p>  
**See**: <p>[[decryptData]]</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Data to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key in hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto"></a>

## crypto ⇒
<p>Encrypts arbitrary message (UTF-8 compatible) for P2P message/data exchange using asymmetric encryption</p>

**Returns**: <p>The encrypted Message</p>  
**See**: <p>[[decryptMessage]]</p>  

| Param | Description |
| --- | --- |
| plaintext | <p>Message to be encrypted</p> |
| recipientPublicKeyHex | <p>The recipients public key hexadecimal format</p> |
| senderPrivateKeyHex | <p>The senders private (agreement) key hexadecimal format</p> |

<a name="module_crypto"></a>

## crypto ⇒
<p>Generate the Master Public Key and Master Private Keys for a new passphrase</p>

**Returns**: <p>EC-KCDSA sign key pair + agreement key</p>  

| Param | Description |
| --- | --- |
| passPhrase | <p>The passphrase</p> |

<a name="module_crypto"></a>

## crypto ⇒
<p>Generate a signature for a transaction</p>
<p>Method:</p>
<pre class="prettyprint source"><code> s = sign(sha256(sha256(transactionHex)_keygen(sha256(sha256(transactionHex)_privateKey)).publicKey),
         sha256(sha256(transactionHex)_privateKey),
         privateKey)
 p = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
</code></pre>

**Returns**: <p>The signature in hexadecimal format</p>  

| Param | Description |
| --- | --- |
| messageHex | <p>The data in hexadecimal representation</p> |
| privateKey | <p>The private key for signing</p> |

<a name="module_crypto"></a>

## crypto ⇒
<p>Generates a signed message digest, which can be sent to BRS API then</p>

**Returns**: <p>The signed message digest</p>  

| Param | Description |
| --- | --- |
| unsignedTransactionHex | <p>The unsigned message</p> |
| signature | <p>The signature</p> |

<a name="module_crypto"></a>

## crypto ⇒
<p>Convert hex string of the public key to the account id</p>

**Returns**: <p>The numeric account Id</p>  

| Param | Description |
| --- | --- |
| publicKey | <p>The public key</p> |

<a name="module_crypto"></a>

## crypto ⇒
**Returns**: <p>A decimal string</p>  
**Internal**: Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string  

| Param | Description |
| --- | --- |
| s | <p>A hexadecimal string</p> |

<a name="module_crypto"></a>

## crypto ⇒
<p>Hash string into hex string</p>

**Returns**: <p>the hash for that string in hex format</p>  

| Param | Description |
| --- | --- |
| input | <p>An arbitrary text</p> |

<a name="module_crypto"></a>

## crypto
<p>A secure random passphrase generator</p>

**Note**: For secure randomization [seedrandom](https://www.npmjs.com/package/seedrandom) is used.  
<a name="module_crypto"></a>

## crypto ⇒
<p>Verify a signature for given message</p>
<ul>
<li>Method:</li>
</ul>
<pre class="prettyprint source"><code>* h1 = sha256(sha256(transactionHex)_keygen(sha256(transactionHex_privateKey)).publicKey)
==
sha256(sha256(transactionHex)_verify(v, h1, publickey)) = h2
</code></pre>

**Returns**: <p><em>true</em>, if signature is valid, otherwise <em>false</em></p>  
**See**: <p>[[generateSignature]]</p>  

| Param | Description |
| --- | --- |
| signature | <p>The signature to be verified</p> |
| messageHex | <p>The message data in hexadecimal representation</p> |
| publicKey | <p>The public key</p> |

<a name="module_crypto"></a>

## crypto
<a name="Converter"></a>

## Converter
<p>A set of useful converter methods for crypto operations.</p>

**Kind**: global class  
<a name="IV_LENGTH"></a>

## IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: global constant  
<a name="IV_LENGTH"></a>

## IV\_LENGTH
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: global constant  
