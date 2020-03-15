# @burstjs/util

Useful utilities and tools for building Burstcoin applications

## Installation

`@burstjs/http` can be used with NodeJS or Web. Two formats are available

### Using with NodeJS and/or modern web frameworks

Install using [npm](https://www.npmjs.org/):

```
npm install @burstjs/util
```

or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @burstjs/util
```

#### Example

```js
import {convertNumberToNQTString} from '@burstjs/util'

const value = convertNumberToNQTString(1000)
console.log(value)
```

### Using in classic `<script>`

Each package is available as bundled standalone library using IIFE.
This way _burstJS_ can be used also within `<script>`-Tags.
This might be useful for Wordpress and/or other PHP applications.

Just import the package using the HTML `<script>` tag.

`<script src='https://cdn.jsdelivr.net/npm/@burstjs/util/dist/util.crypto.min.js'></script>`

#### Example

```js
const value = b$util.convertNumberToNQTString(1000)
console.log(value)
```

See more here:

[@burstjs/util Online Documentation](https://burst-apps-team.github.io/phoenix/modules/util.html)

---

## API Reference
## Modules

<dl>
<dt><a href="#module_util">util</a></dt>
<dd></dd>
</dl>

<a name="module_util"></a>

## util

* [util](#module_util)
    * _static_
        * [.isValid](#module_util.isValid) ⇒ <code>boolean</code>
    * _inner_
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertByteArrayToHexString(bytes, uppercase)](#module_util..convertByteArrayToHexString) ⇒ <code>string</code>
        * [~convertByteArrayToString(byteArray, startIndex, length)](#module_util..convertByteArrayToString) ⇒ <code>string</code>
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertHexEndianess(hexString)](#module_util..convertHexEndianess) ⇒
        * [~convertHexStringToByteArray(hex)](#module_util..convertHexStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertHexStringToDecString(hexStr)](#module_util..convertHexStringToDecString) ⇒
        * [~convertHexStringToString(hex)](#module_util..convertHexStringToString) ⇒ <code>string</code>
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~convertStringToByteArray(str)](#module_util..convertStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertStringToHexString(str)](#module_util..convertStringToHexString) ⇒ <code>string</code>
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~sumNQTStringToNumber(...nqts)](#module_util..sumNQTStringToNumber) ⇒

<a name="module_util.isValid"></a>

### util.isValid ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: static property of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  
**Note**: This is with prior quick check  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..convertAddressToNumericId"></a>

### util~convertAddressToNumericId(address) ⇒
<p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The numeric id, or undefined if address is invalid</p>  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="module_util..convertBurstTimeToDate"></a>

### util~convertBurstTimeToDate(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Date</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Date</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertBurstTimeToEpochTime"></a>

### util~convertBurstTimeToEpochTime(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Unix Epoch Time (milliseconds since 01.01.1970)</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertByteArrayToHexString"></a>

### util~convertByteArrayToHexString(bytes, uppercase) ⇒ <code>string</code>
<p>Converts byte array to hexadecimal string
Inverse operation of [[convertHexStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>A hex string representing the byte array input</p>  

| Param | Default | Description |
| --- | --- | --- |
| bytes |  | <p>The (unsigned) byte array to be converted</p> |
| uppercase | <code>false</code> | <p>If <em>true</em>, converts hex string with uppercase characters (Default: false)</p> |

<a name="module_util..convertByteArrayToString"></a>

### util~convertByteArrayToString(byteArray, startIndex, length) ⇒ <code>string</code>
<p>Converts a byte array into string
Inverse function [[convertStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The converted string</p>  

| Param | Default | Description |
| --- | --- | --- |
| byteArray |  | <p>The byte array to be converted</p> |
| startIndex | <code>0</code> | <p>The starting index of array to be converted (Default: 0)</p> |
| length | <code></code> | <p>The number of bytes to be considered, <em>iff</em> startIndex is given. If <em>null</em> the byte array's length is considered</p> |

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

<a name="module_util..convertHexEndianess"></a>

### util~convertHexEndianess(hexString) ⇒
<p>Converts the endianess of a hex string.
If string is little Endianess it turns into Big Endianess, and vice versa</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The converted string as hex string</p>  

| Param | Description |
| --- | --- |
| hexString | <p>The hex string to be converted</p> |

<a name="module_util..convertHexStringToByteArray"></a>

### util~convertHexStringToByteArray(hex) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts an hexadecimal string to byte array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An byte array representing the hexadecimal input</p>  

| Param | Description |
| --- | --- |
| hex | <p>The hexadecimal string to be converted</p> |

<a name="module_util..convertHexStringToDecString"></a>

### util~convertHexStringToDecString(hexStr) ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| hexStr | <p>A hexadecimal string</p> |

<a name="module_util..convertHexStringToString"></a>

### util~convertHexStringToString(hex) ⇒ <code>string</code>
<p>Converts a Hexadecimally encoded string into String
Inverse function [[convertStringToHexString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The string represented by the Hex String</p>  

| Param | Description |
| --- | --- |
| hex | <p>The Hex string to be converted</p> |

<a name="module_util..convertNQTStringToNumber"></a>

### util~convertNQTStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  
**Throws**:

- <p>exception if argument is invalid</p>


| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="module_util..convertNumberToNQTString"></a>

### util~convertNumberToNQTString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="module_util..convertNumericIdToAddress"></a>

### util~convertNumericIdToAddress(numericId) ⇒
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined</p>  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="module_util..convertStringToByteArray"></a>

### util~convertStringToByteArray(str) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts a string into byte array
Inverse function [[convertByteArrayToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>A byte array representing the string input</p>  

| Param | Description |
| --- | --- |
| str | <p>The string  to be converted</p> |

<a name="module_util..convertStringToHexString"></a>

### util~convertStringToHexString(str) ⇒ <code>string</code>
<p>Converts/Encode a String into Hexadecimally encoded
Inverse function [[convertHexStringToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The Hex String representing the input string</p>  

| Param | Description |
| --- | --- |
| str | <p>The Hex string to be converted</p> |

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..sumNQTStringToNumber"></a>

### util~sumNQTStringToNumber(...nqts) ⇒
<p>Sums various NQT values and returns in Burst</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The sum of all amounts in BURST</p>  

| Param | Description |
| --- | --- |
| ...nqts | <p>Variable amount list with NQT string</p> |

<a name="module_util"></a>

## util

* [util](#module_util)
    * _static_
        * [.isValid](#module_util.isValid) ⇒ <code>boolean</code>
    * _inner_
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertByteArrayToHexString(bytes, uppercase)](#module_util..convertByteArrayToHexString) ⇒ <code>string</code>
        * [~convertByteArrayToString(byteArray, startIndex, length)](#module_util..convertByteArrayToString) ⇒ <code>string</code>
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertHexEndianess(hexString)](#module_util..convertHexEndianess) ⇒
        * [~convertHexStringToByteArray(hex)](#module_util..convertHexStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertHexStringToDecString(hexStr)](#module_util..convertHexStringToDecString) ⇒
        * [~convertHexStringToString(hex)](#module_util..convertHexStringToString) ⇒ <code>string</code>
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~convertStringToByteArray(str)](#module_util..convertStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertStringToHexString(str)](#module_util..convertStringToHexString) ⇒ <code>string</code>
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~sumNQTStringToNumber(...nqts)](#module_util..sumNQTStringToNumber) ⇒

<a name="module_util.isValid"></a>

### util.isValid ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: static property of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  
**Note**: This is with prior quick check  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..convertAddressToNumericId"></a>

### util~convertAddressToNumericId(address) ⇒
<p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The numeric id, or undefined if address is invalid</p>  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="module_util..convertBurstTimeToDate"></a>

### util~convertBurstTimeToDate(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Date</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Date</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertBurstTimeToEpochTime"></a>

### util~convertBurstTimeToEpochTime(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Unix Epoch Time (milliseconds since 01.01.1970)</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertByteArrayToHexString"></a>

### util~convertByteArrayToHexString(bytes, uppercase) ⇒ <code>string</code>
<p>Converts byte array to hexadecimal string
Inverse operation of [[convertHexStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>A hex string representing the byte array input</p>  

| Param | Default | Description |
| --- | --- | --- |
| bytes |  | <p>The (unsigned) byte array to be converted</p> |
| uppercase | <code>false</code> | <p>If <em>true</em>, converts hex string with uppercase characters (Default: false)</p> |

<a name="module_util..convertByteArrayToString"></a>

### util~convertByteArrayToString(byteArray, startIndex, length) ⇒ <code>string</code>
<p>Converts a byte array into string
Inverse function [[convertStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The converted string</p>  

| Param | Default | Description |
| --- | --- | --- |
| byteArray |  | <p>The byte array to be converted</p> |
| startIndex | <code>0</code> | <p>The starting index of array to be converted (Default: 0)</p> |
| length | <code></code> | <p>The number of bytes to be considered, <em>iff</em> startIndex is given. If <em>null</em> the byte array's length is considered</p> |

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

<a name="module_util..convertHexEndianess"></a>

### util~convertHexEndianess(hexString) ⇒
<p>Converts the endianess of a hex string.
If string is little Endianess it turns into Big Endianess, and vice versa</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The converted string as hex string</p>  

| Param | Description |
| --- | --- |
| hexString | <p>The hex string to be converted</p> |

<a name="module_util..convertHexStringToByteArray"></a>

### util~convertHexStringToByteArray(hex) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts an hexadecimal string to byte array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An byte array representing the hexadecimal input</p>  

| Param | Description |
| --- | --- |
| hex | <p>The hexadecimal string to be converted</p> |

<a name="module_util..convertHexStringToDecString"></a>

### util~convertHexStringToDecString(hexStr) ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| hexStr | <p>A hexadecimal string</p> |

<a name="module_util..convertHexStringToString"></a>

### util~convertHexStringToString(hex) ⇒ <code>string</code>
<p>Converts a Hexadecimally encoded string into String
Inverse function [[convertStringToHexString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The string represented by the Hex String</p>  

| Param | Description |
| --- | --- |
| hex | <p>The Hex string to be converted</p> |

<a name="module_util..convertNQTStringToNumber"></a>

### util~convertNQTStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  
**Throws**:

- <p>exception if argument is invalid</p>


| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="module_util..convertNumberToNQTString"></a>

### util~convertNumberToNQTString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="module_util..convertNumericIdToAddress"></a>

### util~convertNumericIdToAddress(numericId) ⇒
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined</p>  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="module_util..convertStringToByteArray"></a>

### util~convertStringToByteArray(str) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts a string into byte array
Inverse function [[convertByteArrayToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>A byte array representing the string input</p>  

| Param | Description |
| --- | --- |
| str | <p>The string  to be converted</p> |

<a name="module_util..convertStringToHexString"></a>

### util~convertStringToHexString(str) ⇒ <code>string</code>
<p>Converts/Encode a String into Hexadecimally encoded
Inverse function [[convertHexStringToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The Hex String representing the input string</p>  

| Param | Description |
| --- | --- |
| str | <p>The Hex string to be converted</p> |

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..sumNQTStringToNumber"></a>

### util~sumNQTStringToNumber(...nqts) ⇒
<p>Sums various NQT values and returns in Burst</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The sum of all amounts in BURST</p>  

| Param | Description |
| --- | --- |
| ...nqts | <p>Variable amount list with NQT string</p> |

<a name="module_util"></a>

## util

* [util](#module_util)
    * _static_
        * [.isValid](#module_util.isValid) ⇒ <code>boolean</code>
    * _inner_
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertByteArrayToHexString(bytes, uppercase)](#module_util..convertByteArrayToHexString) ⇒ <code>string</code>
        * [~convertByteArrayToString(byteArray, startIndex, length)](#module_util..convertByteArrayToString) ⇒ <code>string</code>
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertHexEndianess(hexString)](#module_util..convertHexEndianess) ⇒
        * [~convertHexStringToByteArray(hex)](#module_util..convertHexStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertHexStringToDecString(hexStr)](#module_util..convertHexStringToDecString) ⇒
        * [~convertHexStringToString(hex)](#module_util..convertHexStringToString) ⇒ <code>string</code>
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~convertStringToByteArray(str)](#module_util..convertStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertStringToHexString(str)](#module_util..convertStringToHexString) ⇒ <code>string</code>
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~sumNQTStringToNumber(...nqts)](#module_util..sumNQTStringToNumber) ⇒

<a name="module_util.isValid"></a>

### util.isValid ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: static property of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  
**Note**: This is with prior quick check  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..convertAddressToNumericId"></a>

### util~convertAddressToNumericId(address) ⇒
<p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The numeric id, or undefined if address is invalid</p>  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="module_util..convertBurstTimeToDate"></a>

### util~convertBurstTimeToDate(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Date</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Date</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertBurstTimeToEpochTime"></a>

### util~convertBurstTimeToEpochTime(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Unix Epoch Time (milliseconds since 01.01.1970)</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertByteArrayToHexString"></a>

### util~convertByteArrayToHexString(bytes, uppercase) ⇒ <code>string</code>
<p>Converts byte array to hexadecimal string
Inverse operation of [[convertHexStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>A hex string representing the byte array input</p>  

| Param | Default | Description |
| --- | --- | --- |
| bytes |  | <p>The (unsigned) byte array to be converted</p> |
| uppercase | <code>false</code> | <p>If <em>true</em>, converts hex string with uppercase characters (Default: false)</p> |

<a name="module_util..convertByteArrayToString"></a>

### util~convertByteArrayToString(byteArray, startIndex, length) ⇒ <code>string</code>
<p>Converts a byte array into string
Inverse function [[convertStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The converted string</p>  

| Param | Default | Description |
| --- | --- | --- |
| byteArray |  | <p>The byte array to be converted</p> |
| startIndex | <code>0</code> | <p>The starting index of array to be converted (Default: 0)</p> |
| length | <code></code> | <p>The number of bytes to be considered, <em>iff</em> startIndex is given. If <em>null</em> the byte array's length is considered</p> |

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

<a name="module_util..convertHexEndianess"></a>

### util~convertHexEndianess(hexString) ⇒
<p>Converts the endianess of a hex string.
If string is little Endianess it turns into Big Endianess, and vice versa</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The converted string as hex string</p>  

| Param | Description |
| --- | --- |
| hexString | <p>The hex string to be converted</p> |

<a name="module_util..convertHexStringToByteArray"></a>

### util~convertHexStringToByteArray(hex) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts an hexadecimal string to byte array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An byte array representing the hexadecimal input</p>  

| Param | Description |
| --- | --- |
| hex | <p>The hexadecimal string to be converted</p> |

<a name="module_util..convertHexStringToDecString"></a>

### util~convertHexStringToDecString(hexStr) ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| hexStr | <p>A hexadecimal string</p> |

<a name="module_util..convertHexStringToString"></a>

### util~convertHexStringToString(hex) ⇒ <code>string</code>
<p>Converts a Hexadecimally encoded string into String
Inverse function [[convertStringToHexString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The string represented by the Hex String</p>  

| Param | Description |
| --- | --- |
| hex | <p>The Hex string to be converted</p> |

<a name="module_util..convertNQTStringToNumber"></a>

### util~convertNQTStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  
**Throws**:

- <p>exception if argument is invalid</p>


| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="module_util..convertNumberToNQTString"></a>

### util~convertNumberToNQTString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="module_util..convertNumericIdToAddress"></a>

### util~convertNumericIdToAddress(numericId) ⇒
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined</p>  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="module_util..convertStringToByteArray"></a>

### util~convertStringToByteArray(str) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts a string into byte array
Inverse function [[convertByteArrayToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>A byte array representing the string input</p>  

| Param | Description |
| --- | --- |
| str | <p>The string  to be converted</p> |

<a name="module_util..convertStringToHexString"></a>

### util~convertStringToHexString(str) ⇒ <code>string</code>
<p>Converts/Encode a String into Hexadecimally encoded
Inverse function [[convertHexStringToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The Hex String representing the input string</p>  

| Param | Description |
| --- | --- |
| str | <p>The Hex string to be converted</p> |

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..sumNQTStringToNumber"></a>

### util~sumNQTStringToNumber(...nqts) ⇒
<p>Sums various NQT values and returns in Burst</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The sum of all amounts in BURST</p>  

| Param | Description |
| --- | --- |
| ...nqts | <p>Variable amount list with NQT string</p> |

<a name="module_util"></a>

## util

* [util](#module_util)
    * _static_
        * [.isValid](#module_util.isValid) ⇒ <code>boolean</code>
    * _inner_
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertByteArrayToHexString(bytes, uppercase)](#module_util..convertByteArrayToHexString) ⇒ <code>string</code>
        * [~convertByteArrayToString(byteArray, startIndex, length)](#module_util..convertByteArrayToString) ⇒ <code>string</code>
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertHexEndianess(hexString)](#module_util..convertHexEndianess) ⇒
        * [~convertHexStringToByteArray(hex)](#module_util..convertHexStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertHexStringToDecString(hexStr)](#module_util..convertHexStringToDecString) ⇒
        * [~convertHexStringToString(hex)](#module_util..convertHexStringToString) ⇒ <code>string</code>
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~convertStringToByteArray(str)](#module_util..convertStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertStringToHexString(str)](#module_util..convertStringToHexString) ⇒ <code>string</code>
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~sumNQTStringToNumber(...nqts)](#module_util..sumNQTStringToNumber) ⇒

<a name="module_util.isValid"></a>

### util.isValid ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: static property of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  
**Note**: This is with prior quick check  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..convertAddressToNumericId"></a>

### util~convertAddressToNumericId(address) ⇒
<p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The numeric id, or undefined if address is invalid</p>  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="module_util..convertBurstTimeToDate"></a>

### util~convertBurstTimeToDate(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Date</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Date</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertBurstTimeToEpochTime"></a>

### util~convertBurstTimeToEpochTime(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Unix Epoch Time (milliseconds since 01.01.1970)</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertByteArrayToHexString"></a>

### util~convertByteArrayToHexString(bytes, uppercase) ⇒ <code>string</code>
<p>Converts byte array to hexadecimal string
Inverse operation of [[convertHexStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>A hex string representing the byte array input</p>  

| Param | Default | Description |
| --- | --- | --- |
| bytes |  | <p>The (unsigned) byte array to be converted</p> |
| uppercase | <code>false</code> | <p>If <em>true</em>, converts hex string with uppercase characters (Default: false)</p> |

<a name="module_util..convertByteArrayToString"></a>

### util~convertByteArrayToString(byteArray, startIndex, length) ⇒ <code>string</code>
<p>Converts a byte array into string
Inverse function [[convertStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The converted string</p>  

| Param | Default | Description |
| --- | --- | --- |
| byteArray |  | <p>The byte array to be converted</p> |
| startIndex | <code>0</code> | <p>The starting index of array to be converted (Default: 0)</p> |
| length | <code></code> | <p>The number of bytes to be considered, <em>iff</em> startIndex is given. If <em>null</em> the byte array's length is considered</p> |

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

<a name="module_util..convertHexEndianess"></a>

### util~convertHexEndianess(hexString) ⇒
<p>Converts the endianess of a hex string.
If string is little Endianess it turns into Big Endianess, and vice versa</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The converted string as hex string</p>  

| Param | Description |
| --- | --- |
| hexString | <p>The hex string to be converted</p> |

<a name="module_util..convertHexStringToByteArray"></a>

### util~convertHexStringToByteArray(hex) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts an hexadecimal string to byte array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An byte array representing the hexadecimal input</p>  

| Param | Description |
| --- | --- |
| hex | <p>The hexadecimal string to be converted</p> |

<a name="module_util..convertHexStringToDecString"></a>

### util~convertHexStringToDecString(hexStr) ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| hexStr | <p>A hexadecimal string</p> |

<a name="module_util..convertHexStringToString"></a>

### util~convertHexStringToString(hex) ⇒ <code>string</code>
<p>Converts a Hexadecimally encoded string into String
Inverse function [[convertStringToHexString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The string represented by the Hex String</p>  

| Param | Description |
| --- | --- |
| hex | <p>The Hex string to be converted</p> |

<a name="module_util..convertNQTStringToNumber"></a>

### util~convertNQTStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  
**Throws**:

- <p>exception if argument is invalid</p>


| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="module_util..convertNumberToNQTString"></a>

### util~convertNumberToNQTString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="module_util..convertNumericIdToAddress"></a>

### util~convertNumericIdToAddress(numericId) ⇒
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined</p>  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="module_util..convertStringToByteArray"></a>

### util~convertStringToByteArray(str) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts a string into byte array
Inverse function [[convertByteArrayToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>A byte array representing the string input</p>  

| Param | Description |
| --- | --- |
| str | <p>The string  to be converted</p> |

<a name="module_util..convertStringToHexString"></a>

### util~convertStringToHexString(str) ⇒ <code>string</code>
<p>Converts/Encode a String into Hexadecimally encoded
Inverse function [[convertHexStringToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The Hex String representing the input string</p>  

| Param | Description |
| --- | --- |
| str | <p>The Hex string to be converted</p> |

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..sumNQTStringToNumber"></a>

### util~sumNQTStringToNumber(...nqts) ⇒
<p>Sums various NQT values and returns in Burst</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The sum of all amounts in BURST</p>  

| Param | Description |
| --- | --- |
| ...nqts | <p>Variable amount list with NQT string</p> |

<a name="module_util"></a>

## util

* [util](#module_util)
    * _static_
        * [.isValid](#module_util.isValid) ⇒ <code>boolean</code>
    * _inner_
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertByteArrayToHexString(bytes, uppercase)](#module_util..convertByteArrayToHexString) ⇒ <code>string</code>
        * [~convertByteArrayToString(byteArray, startIndex, length)](#module_util..convertByteArrayToString) ⇒ <code>string</code>
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertHexEndianess(hexString)](#module_util..convertHexEndianess) ⇒
        * [~convertHexStringToByteArray(hex)](#module_util..convertHexStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertHexStringToDecString(hexStr)](#module_util..convertHexStringToDecString) ⇒
        * [~convertHexStringToString(hex)](#module_util..convertHexStringToString) ⇒ <code>string</code>
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~convertStringToByteArray(str)](#module_util..convertStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertStringToHexString(str)](#module_util..convertStringToHexString) ⇒ <code>string</code>
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~sumNQTStringToNumber(...nqts)](#module_util..sumNQTStringToNumber) ⇒

<a name="module_util.isValid"></a>

### util.isValid ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: static property of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  
**Note**: This is with prior quick check  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..convertAddressToNumericId"></a>

### util~convertAddressToNumericId(address) ⇒
<p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The numeric id, or undefined if address is invalid</p>  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="module_util..convertBurstTimeToDate"></a>

### util~convertBurstTimeToDate(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Date</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Date</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertBurstTimeToEpochTime"></a>

### util~convertBurstTimeToEpochTime(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Unix Epoch Time (milliseconds since 01.01.1970)</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertByteArrayToHexString"></a>

### util~convertByteArrayToHexString(bytes, uppercase) ⇒ <code>string</code>
<p>Converts byte array to hexadecimal string
Inverse operation of [[convertHexStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>A hex string representing the byte array input</p>  

| Param | Default | Description |
| --- | --- | --- |
| bytes |  | <p>The (unsigned) byte array to be converted</p> |
| uppercase | <code>false</code> | <p>If <em>true</em>, converts hex string with uppercase characters (Default: false)</p> |

<a name="module_util..convertByteArrayToString"></a>

### util~convertByteArrayToString(byteArray, startIndex, length) ⇒ <code>string</code>
<p>Converts a byte array into string
Inverse function [[convertStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The converted string</p>  

| Param | Default | Description |
| --- | --- | --- |
| byteArray |  | <p>The byte array to be converted</p> |
| startIndex | <code>0</code> | <p>The starting index of array to be converted (Default: 0)</p> |
| length | <code></code> | <p>The number of bytes to be considered, <em>iff</em> startIndex is given. If <em>null</em> the byte array's length is considered</p> |

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

<a name="module_util..convertHexEndianess"></a>

### util~convertHexEndianess(hexString) ⇒
<p>Converts the endianess of a hex string.
If string is little Endianess it turns into Big Endianess, and vice versa</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The converted string as hex string</p>  

| Param | Description |
| --- | --- |
| hexString | <p>The hex string to be converted</p> |

<a name="module_util..convertHexStringToByteArray"></a>

### util~convertHexStringToByteArray(hex) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts an hexadecimal string to byte array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An byte array representing the hexadecimal input</p>  

| Param | Description |
| --- | --- |
| hex | <p>The hexadecimal string to be converted</p> |

<a name="module_util..convertHexStringToDecString"></a>

### util~convertHexStringToDecString(hexStr) ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| hexStr | <p>A hexadecimal string</p> |

<a name="module_util..convertHexStringToString"></a>

### util~convertHexStringToString(hex) ⇒ <code>string</code>
<p>Converts a Hexadecimally encoded string into String
Inverse function [[convertStringToHexString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The string represented by the Hex String</p>  

| Param | Description |
| --- | --- |
| hex | <p>The Hex string to be converted</p> |

<a name="module_util..convertNQTStringToNumber"></a>

### util~convertNQTStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  
**Throws**:

- <p>exception if argument is invalid</p>


| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="module_util..convertNumberToNQTString"></a>

### util~convertNumberToNQTString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="module_util..convertNumericIdToAddress"></a>

### util~convertNumericIdToAddress(numericId) ⇒
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined</p>  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="module_util..convertStringToByteArray"></a>

### util~convertStringToByteArray(str) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts a string into byte array
Inverse function [[convertByteArrayToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>A byte array representing the string input</p>  

| Param | Description |
| --- | --- |
| str | <p>The string  to be converted</p> |

<a name="module_util..convertStringToHexString"></a>

### util~convertStringToHexString(str) ⇒ <code>string</code>
<p>Converts/Encode a String into Hexadecimally encoded
Inverse function [[convertHexStringToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The Hex String representing the input string</p>  

| Param | Description |
| --- | --- |
| str | <p>The Hex string to be converted</p> |

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..sumNQTStringToNumber"></a>

### util~sumNQTStringToNumber(...nqts) ⇒
<p>Sums various NQT values and returns in Burst</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The sum of all amounts in BURST</p>  

| Param | Description |
| --- | --- |
| ...nqts | <p>Variable amount list with NQT string</p> |

<a name="module_util"></a>

## util

* [util](#module_util)
    * _static_
        * [.isValid](#module_util.isValid) ⇒ <code>boolean</code>
    * _inner_
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertByteArrayToHexString(bytes, uppercase)](#module_util..convertByteArrayToHexString) ⇒ <code>string</code>
        * [~convertByteArrayToString(byteArray, startIndex, length)](#module_util..convertByteArrayToString) ⇒ <code>string</code>
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertHexEndianess(hexString)](#module_util..convertHexEndianess) ⇒
        * [~convertHexStringToByteArray(hex)](#module_util..convertHexStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertHexStringToDecString(hexStr)](#module_util..convertHexStringToDecString) ⇒
        * [~convertHexStringToString(hex)](#module_util..convertHexStringToString) ⇒ <code>string</code>
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~convertStringToByteArray(str)](#module_util..convertStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertStringToHexString(str)](#module_util..convertStringToHexString) ⇒ <code>string</code>
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~sumNQTStringToNumber(...nqts)](#module_util..sumNQTStringToNumber) ⇒

<a name="module_util.isValid"></a>

### util.isValid ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: static property of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  
**Note**: This is with prior quick check  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..convertAddressToNumericId"></a>

### util~convertAddressToNumericId(address) ⇒
<p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The numeric id, or undefined if address is invalid</p>  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="module_util..convertBurstTimeToDate"></a>

### util~convertBurstTimeToDate(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Date</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Date</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertBurstTimeToEpochTime"></a>

### util~convertBurstTimeToEpochTime(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Unix Epoch Time (milliseconds since 01.01.1970)</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertByteArrayToHexString"></a>

### util~convertByteArrayToHexString(bytes, uppercase) ⇒ <code>string</code>
<p>Converts byte array to hexadecimal string
Inverse operation of [[convertHexStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>A hex string representing the byte array input</p>  

| Param | Default | Description |
| --- | --- | --- |
| bytes |  | <p>The (unsigned) byte array to be converted</p> |
| uppercase | <code>false</code> | <p>If <em>true</em>, converts hex string with uppercase characters (Default: false)</p> |

<a name="module_util..convertByteArrayToString"></a>

### util~convertByteArrayToString(byteArray, startIndex, length) ⇒ <code>string</code>
<p>Converts a byte array into string
Inverse function [[convertStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The converted string</p>  

| Param | Default | Description |
| --- | --- | --- |
| byteArray |  | <p>The byte array to be converted</p> |
| startIndex | <code>0</code> | <p>The starting index of array to be converted (Default: 0)</p> |
| length | <code></code> | <p>The number of bytes to be considered, <em>iff</em> startIndex is given. If <em>null</em> the byte array's length is considered</p> |

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

<a name="module_util..convertHexEndianess"></a>

### util~convertHexEndianess(hexString) ⇒
<p>Converts the endianess of a hex string.
If string is little Endianess it turns into Big Endianess, and vice versa</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The converted string as hex string</p>  

| Param | Description |
| --- | --- |
| hexString | <p>The hex string to be converted</p> |

<a name="module_util..convertHexStringToByteArray"></a>

### util~convertHexStringToByteArray(hex) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts an hexadecimal string to byte array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An byte array representing the hexadecimal input</p>  

| Param | Description |
| --- | --- |
| hex | <p>The hexadecimal string to be converted</p> |

<a name="module_util..convertHexStringToDecString"></a>

### util~convertHexStringToDecString(hexStr) ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| hexStr | <p>A hexadecimal string</p> |

<a name="module_util..convertHexStringToString"></a>

### util~convertHexStringToString(hex) ⇒ <code>string</code>
<p>Converts a Hexadecimally encoded string into String
Inverse function [[convertStringToHexString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The string represented by the Hex String</p>  

| Param | Description |
| --- | --- |
| hex | <p>The Hex string to be converted</p> |

<a name="module_util..convertNQTStringToNumber"></a>

### util~convertNQTStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  
**Throws**:

- <p>exception if argument is invalid</p>


| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="module_util..convertNumberToNQTString"></a>

### util~convertNumberToNQTString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="module_util..convertNumericIdToAddress"></a>

### util~convertNumericIdToAddress(numericId) ⇒
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined</p>  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="module_util..convertStringToByteArray"></a>

### util~convertStringToByteArray(str) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts a string into byte array
Inverse function [[convertByteArrayToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>A byte array representing the string input</p>  

| Param | Description |
| --- | --- |
| str | <p>The string  to be converted</p> |

<a name="module_util..convertStringToHexString"></a>

### util~convertStringToHexString(str) ⇒ <code>string</code>
<p>Converts/Encode a String into Hexadecimally encoded
Inverse function [[convertHexStringToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The Hex String representing the input string</p>  

| Param | Description |
| --- | --- |
| str | <p>The Hex string to be converted</p> |

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..sumNQTStringToNumber"></a>

### util~sumNQTStringToNumber(...nqts) ⇒
<p>Sums various NQT values and returns in Burst</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The sum of all amounts in BURST</p>  

| Param | Description |
| --- | --- |
| ...nqts | <p>Variable amount list with NQT string</p> |

<a name="module_util"></a>

## util

* [util](#module_util)
    * _static_
        * [.isValid](#module_util.isValid) ⇒ <code>boolean</code>
    * _inner_
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertByteArrayToHexString(bytes, uppercase)](#module_util..convertByteArrayToHexString) ⇒ <code>string</code>
        * [~convertByteArrayToString(byteArray, startIndex, length)](#module_util..convertByteArrayToString) ⇒ <code>string</code>
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertHexEndianess(hexString)](#module_util..convertHexEndianess) ⇒
        * [~convertHexStringToByteArray(hex)](#module_util..convertHexStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertHexStringToDecString(hexStr)](#module_util..convertHexStringToDecString) ⇒
        * [~convertHexStringToString(hex)](#module_util..convertHexStringToString) ⇒ <code>string</code>
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~convertStringToByteArray(str)](#module_util..convertStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertStringToHexString(str)](#module_util..convertStringToHexString) ⇒ <code>string</code>
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~sumNQTStringToNumber(...nqts)](#module_util..sumNQTStringToNumber) ⇒

<a name="module_util.isValid"></a>

### util.isValid ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: static property of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  
**Note**: This is with prior quick check  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..convertAddressToNumericId"></a>

### util~convertAddressToNumericId(address) ⇒
<p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The numeric id, or undefined if address is invalid</p>  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="module_util..convertBurstTimeToDate"></a>

### util~convertBurstTimeToDate(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Date</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Date</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertBurstTimeToEpochTime"></a>

### util~convertBurstTimeToEpochTime(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Unix Epoch Time (milliseconds since 01.01.1970)</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertByteArrayToHexString"></a>

### util~convertByteArrayToHexString(bytes, uppercase) ⇒ <code>string</code>
<p>Converts byte array to hexadecimal string
Inverse operation of [[convertHexStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>A hex string representing the byte array input</p>  

| Param | Default | Description |
| --- | --- | --- |
| bytes |  | <p>The (unsigned) byte array to be converted</p> |
| uppercase | <code>false</code> | <p>If <em>true</em>, converts hex string with uppercase characters (Default: false)</p> |

<a name="module_util..convertByteArrayToString"></a>

### util~convertByteArrayToString(byteArray, startIndex, length) ⇒ <code>string</code>
<p>Converts a byte array into string
Inverse function [[convertStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The converted string</p>  

| Param | Default | Description |
| --- | --- | --- |
| byteArray |  | <p>The byte array to be converted</p> |
| startIndex | <code>0</code> | <p>The starting index of array to be converted (Default: 0)</p> |
| length | <code></code> | <p>The number of bytes to be considered, <em>iff</em> startIndex is given. If <em>null</em> the byte array's length is considered</p> |

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

<a name="module_util..convertHexEndianess"></a>

### util~convertHexEndianess(hexString) ⇒
<p>Converts the endianess of a hex string.
If string is little Endianess it turns into Big Endianess, and vice versa</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The converted string as hex string</p>  

| Param | Description |
| --- | --- |
| hexString | <p>The hex string to be converted</p> |

<a name="module_util..convertHexStringToByteArray"></a>

### util~convertHexStringToByteArray(hex) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts an hexadecimal string to byte array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An byte array representing the hexadecimal input</p>  

| Param | Description |
| --- | --- |
| hex | <p>The hexadecimal string to be converted</p> |

<a name="module_util..convertHexStringToDecString"></a>

### util~convertHexStringToDecString(hexStr) ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| hexStr | <p>A hexadecimal string</p> |

<a name="module_util..convertHexStringToString"></a>

### util~convertHexStringToString(hex) ⇒ <code>string</code>
<p>Converts a Hexadecimally encoded string into String
Inverse function [[convertStringToHexString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The string represented by the Hex String</p>  

| Param | Description |
| --- | --- |
| hex | <p>The Hex string to be converted</p> |

<a name="module_util..convertNQTStringToNumber"></a>

### util~convertNQTStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  
**Throws**:

- <p>exception if argument is invalid</p>


| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="module_util..convertNumberToNQTString"></a>

### util~convertNumberToNQTString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="module_util..convertNumericIdToAddress"></a>

### util~convertNumericIdToAddress(numericId) ⇒
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined</p>  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="module_util..convertStringToByteArray"></a>

### util~convertStringToByteArray(str) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts a string into byte array
Inverse function [[convertByteArrayToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>A byte array representing the string input</p>  

| Param | Description |
| --- | --- |
| str | <p>The string  to be converted</p> |

<a name="module_util..convertStringToHexString"></a>

### util~convertStringToHexString(str) ⇒ <code>string</code>
<p>Converts/Encode a String into Hexadecimally encoded
Inverse function [[convertHexStringToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The Hex String representing the input string</p>  

| Param | Description |
| --- | --- |
| str | <p>The Hex string to be converted</p> |

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..sumNQTStringToNumber"></a>

### util~sumNQTStringToNumber(...nqts) ⇒
<p>Sums various NQT values and returns in Burst</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The sum of all amounts in BURST</p>  

| Param | Description |
| --- | --- |
| ...nqts | <p>Variable amount list with NQT string</p> |

<a name="module_util"></a>

## util

* [util](#module_util)
    * _static_
        * [.isValid](#module_util.isValid) ⇒ <code>boolean</code>
    * _inner_
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertByteArrayToHexString(bytes, uppercase)](#module_util..convertByteArrayToHexString) ⇒ <code>string</code>
        * [~convertByteArrayToString(byteArray, startIndex, length)](#module_util..convertByteArrayToString) ⇒ <code>string</code>
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertHexEndianess(hexString)](#module_util..convertHexEndianess) ⇒
        * [~convertHexStringToByteArray(hex)](#module_util..convertHexStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertHexStringToDecString(hexStr)](#module_util..convertHexStringToDecString) ⇒
        * [~convertHexStringToString(hex)](#module_util..convertHexStringToString) ⇒ <code>string</code>
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~convertStringToByteArray(str)](#module_util..convertStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertStringToHexString(str)](#module_util..convertStringToHexString) ⇒ <code>string</code>
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~sumNQTStringToNumber(...nqts)](#module_util..sumNQTStringToNumber) ⇒

<a name="module_util.isValid"></a>

### util.isValid ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: static property of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  
**Note**: This is with prior quick check  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..convertAddressToNumericId"></a>

### util~convertAddressToNumericId(address) ⇒
<p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The numeric id, or undefined if address is invalid</p>  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="module_util..convertBurstTimeToDate"></a>

### util~convertBurstTimeToDate(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Date</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Date</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertBurstTimeToEpochTime"></a>

### util~convertBurstTimeToEpochTime(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Unix Epoch Time (milliseconds since 01.01.1970)</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertByteArrayToHexString"></a>

### util~convertByteArrayToHexString(bytes, uppercase) ⇒ <code>string</code>
<p>Converts byte array to hexadecimal string
Inverse operation of [[convertHexStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>A hex string representing the byte array input</p>  

| Param | Default | Description |
| --- | --- | --- |
| bytes |  | <p>The (unsigned) byte array to be converted</p> |
| uppercase | <code>false</code> | <p>If <em>true</em>, converts hex string with uppercase characters (Default: false)</p> |

<a name="module_util..convertByteArrayToString"></a>

### util~convertByteArrayToString(byteArray, startIndex, length) ⇒ <code>string</code>
<p>Converts a byte array into string
Inverse function [[convertStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The converted string</p>  

| Param | Default | Description |
| --- | --- | --- |
| byteArray |  | <p>The byte array to be converted</p> |
| startIndex | <code>0</code> | <p>The starting index of array to be converted (Default: 0)</p> |
| length | <code></code> | <p>The number of bytes to be considered, <em>iff</em> startIndex is given. If <em>null</em> the byte array's length is considered</p> |

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

<a name="module_util..convertHexEndianess"></a>

### util~convertHexEndianess(hexString) ⇒
<p>Converts the endianess of a hex string.
If string is little Endianess it turns into Big Endianess, and vice versa</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The converted string as hex string</p>  

| Param | Description |
| --- | --- |
| hexString | <p>The hex string to be converted</p> |

<a name="module_util..convertHexStringToByteArray"></a>

### util~convertHexStringToByteArray(hex) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts an hexadecimal string to byte array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An byte array representing the hexadecimal input</p>  

| Param | Description |
| --- | --- |
| hex | <p>The hexadecimal string to be converted</p> |

<a name="module_util..convertHexStringToDecString"></a>

### util~convertHexStringToDecString(hexStr) ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| hexStr | <p>A hexadecimal string</p> |

<a name="module_util..convertHexStringToString"></a>

### util~convertHexStringToString(hex) ⇒ <code>string</code>
<p>Converts a Hexadecimally encoded string into String
Inverse function [[convertStringToHexString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The string represented by the Hex String</p>  

| Param | Description |
| --- | --- |
| hex | <p>The Hex string to be converted</p> |

<a name="module_util..convertNQTStringToNumber"></a>

### util~convertNQTStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  
**Throws**:

- <p>exception if argument is invalid</p>


| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="module_util..convertNumberToNQTString"></a>

### util~convertNumberToNQTString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="module_util..convertNumericIdToAddress"></a>

### util~convertNumericIdToAddress(numericId) ⇒
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined</p>  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="module_util..convertStringToByteArray"></a>

### util~convertStringToByteArray(str) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts a string into byte array
Inverse function [[convertByteArrayToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>A byte array representing the string input</p>  

| Param | Description |
| --- | --- |
| str | <p>The string  to be converted</p> |

<a name="module_util..convertStringToHexString"></a>

### util~convertStringToHexString(str) ⇒ <code>string</code>
<p>Converts/Encode a String into Hexadecimally encoded
Inverse function [[convertHexStringToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The Hex String representing the input string</p>  

| Param | Description |
| --- | --- |
| str | <p>The Hex string to be converted</p> |

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..sumNQTStringToNumber"></a>

### util~sumNQTStringToNumber(...nqts) ⇒
<p>Sums various NQT values and returns in Burst</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The sum of all amounts in BURST</p>  

| Param | Description |
| --- | --- |
| ...nqts | <p>Variable amount list with NQT string</p> |

<a name="module_util"></a>

## util

* [util](#module_util)
    * _static_
        * [.isValid](#module_util.isValid) ⇒ <code>boolean</code>
    * _inner_
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertByteArrayToHexString(bytes, uppercase)](#module_util..convertByteArrayToHexString) ⇒ <code>string</code>
        * [~convertByteArrayToString(byteArray, startIndex, length)](#module_util..convertByteArrayToString) ⇒ <code>string</code>
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertHexEndianess(hexString)](#module_util..convertHexEndianess) ⇒
        * [~convertHexStringToByteArray(hex)](#module_util..convertHexStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertHexStringToDecString(hexStr)](#module_util..convertHexStringToDecString) ⇒
        * [~convertHexStringToString(hex)](#module_util..convertHexStringToString) ⇒ <code>string</code>
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~convertStringToByteArray(str)](#module_util..convertStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertStringToHexString(str)](#module_util..convertStringToHexString) ⇒ <code>string</code>
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~sumNQTStringToNumber(...nqts)](#module_util..sumNQTStringToNumber) ⇒

<a name="module_util.isValid"></a>

### util.isValid ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: static property of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  
**Note**: This is with prior quick check  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..convertAddressToNumericId"></a>

### util~convertAddressToNumericId(address) ⇒
<p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The numeric id, or undefined if address is invalid</p>  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="module_util..convertBurstTimeToDate"></a>

### util~convertBurstTimeToDate(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Date</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Date</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertBurstTimeToEpochTime"></a>

### util~convertBurstTimeToEpochTime(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Unix Epoch Time (milliseconds since 01.01.1970)</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertByteArrayToHexString"></a>

### util~convertByteArrayToHexString(bytes, uppercase) ⇒ <code>string</code>
<p>Converts byte array to hexadecimal string
Inverse operation of [[convertHexStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>A hex string representing the byte array input</p>  

| Param | Default | Description |
| --- | --- | --- |
| bytes |  | <p>The (unsigned) byte array to be converted</p> |
| uppercase | <code>false</code> | <p>If <em>true</em>, converts hex string with uppercase characters (Default: false)</p> |

<a name="module_util..convertByteArrayToString"></a>

### util~convertByteArrayToString(byteArray, startIndex, length) ⇒ <code>string</code>
<p>Converts a byte array into string
Inverse function [[convertStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The converted string</p>  

| Param | Default | Description |
| --- | --- | --- |
| byteArray |  | <p>The byte array to be converted</p> |
| startIndex | <code>0</code> | <p>The starting index of array to be converted (Default: 0)</p> |
| length | <code></code> | <p>The number of bytes to be considered, <em>iff</em> startIndex is given. If <em>null</em> the byte array's length is considered</p> |

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

<a name="module_util..convertHexEndianess"></a>

### util~convertHexEndianess(hexString) ⇒
<p>Converts the endianess of a hex string.
If string is little Endianess it turns into Big Endianess, and vice versa</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The converted string as hex string</p>  

| Param | Description |
| --- | --- |
| hexString | <p>The hex string to be converted</p> |

<a name="module_util..convertHexStringToByteArray"></a>

### util~convertHexStringToByteArray(hex) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts an hexadecimal string to byte array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An byte array representing the hexadecimal input</p>  

| Param | Description |
| --- | --- |
| hex | <p>The hexadecimal string to be converted</p> |

<a name="module_util..convertHexStringToDecString"></a>

### util~convertHexStringToDecString(hexStr) ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| hexStr | <p>A hexadecimal string</p> |

<a name="module_util..convertHexStringToString"></a>

### util~convertHexStringToString(hex) ⇒ <code>string</code>
<p>Converts a Hexadecimally encoded string into String
Inverse function [[convertStringToHexString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The string represented by the Hex String</p>  

| Param | Description |
| --- | --- |
| hex | <p>The Hex string to be converted</p> |

<a name="module_util..convertNQTStringToNumber"></a>

### util~convertNQTStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  
**Throws**:

- <p>exception if argument is invalid</p>


| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="module_util..convertNumberToNQTString"></a>

### util~convertNumberToNQTString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="module_util..convertNumericIdToAddress"></a>

### util~convertNumericIdToAddress(numericId) ⇒
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined</p>  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="module_util..convertStringToByteArray"></a>

### util~convertStringToByteArray(str) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts a string into byte array
Inverse function [[convertByteArrayToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>A byte array representing the string input</p>  

| Param | Description |
| --- | --- |
| str | <p>The string  to be converted</p> |

<a name="module_util..convertStringToHexString"></a>

### util~convertStringToHexString(str) ⇒ <code>string</code>
<p>Converts/Encode a String into Hexadecimally encoded
Inverse function [[convertHexStringToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The Hex String representing the input string</p>  

| Param | Description |
| --- | --- |
| str | <p>The Hex string to be converted</p> |

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..sumNQTStringToNumber"></a>

### util~sumNQTStringToNumber(...nqts) ⇒
<p>Sums various NQT values and returns in Burst</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The sum of all amounts in BURST</p>  

| Param | Description |
| --- | --- |
| ...nqts | <p>Variable amount list with NQT string</p> |

<a name="module_util"></a>

## util

* [util](#module_util)
    * _static_
        * [.isValid](#module_util.isValid) ⇒ <code>boolean</code>
    * _inner_
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertByteArrayToHexString(bytes, uppercase)](#module_util..convertByteArrayToHexString) ⇒ <code>string</code>
        * [~convertByteArrayToString(byteArray, startIndex, length)](#module_util..convertByteArrayToString) ⇒ <code>string</code>
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertHexEndianess(hexString)](#module_util..convertHexEndianess) ⇒
        * [~convertHexStringToByteArray(hex)](#module_util..convertHexStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertHexStringToDecString(hexStr)](#module_util..convertHexStringToDecString) ⇒
        * [~convertHexStringToString(hex)](#module_util..convertHexStringToString) ⇒ <code>string</code>
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~convertStringToByteArray(str)](#module_util..convertStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertStringToHexString(str)](#module_util..convertStringToHexString) ⇒ <code>string</code>
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~sumNQTStringToNumber(...nqts)](#module_util..sumNQTStringToNumber) ⇒

<a name="module_util.isValid"></a>

### util.isValid ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: static property of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  
**Note**: This is with prior quick check  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..convertAddressToNumericId"></a>

### util~convertAddressToNumericId(address) ⇒
<p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The numeric id, or undefined if address is invalid</p>  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="module_util..convertBurstTimeToDate"></a>

### util~convertBurstTimeToDate(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Date</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Date</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertBurstTimeToEpochTime"></a>

### util~convertBurstTimeToEpochTime(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Unix Epoch Time (milliseconds since 01.01.1970)</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertByteArrayToHexString"></a>

### util~convertByteArrayToHexString(bytes, uppercase) ⇒ <code>string</code>
<p>Converts byte array to hexadecimal string
Inverse operation of [[convertHexStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>A hex string representing the byte array input</p>  

| Param | Default | Description |
| --- | --- | --- |
| bytes |  | <p>The (unsigned) byte array to be converted</p> |
| uppercase | <code>false</code> | <p>If <em>true</em>, converts hex string with uppercase characters (Default: false)</p> |

<a name="module_util..convertByteArrayToString"></a>

### util~convertByteArrayToString(byteArray, startIndex, length) ⇒ <code>string</code>
<p>Converts a byte array into string
Inverse function [[convertStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The converted string</p>  

| Param | Default | Description |
| --- | --- | --- |
| byteArray |  | <p>The byte array to be converted</p> |
| startIndex | <code>0</code> | <p>The starting index of array to be converted (Default: 0)</p> |
| length | <code></code> | <p>The number of bytes to be considered, <em>iff</em> startIndex is given. If <em>null</em> the byte array's length is considered</p> |

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

<a name="module_util..convertHexEndianess"></a>

### util~convertHexEndianess(hexString) ⇒
<p>Converts the endianess of a hex string.
If string is little Endianess it turns into Big Endianess, and vice versa</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The converted string as hex string</p>  

| Param | Description |
| --- | --- |
| hexString | <p>The hex string to be converted</p> |

<a name="module_util..convertHexStringToByteArray"></a>

### util~convertHexStringToByteArray(hex) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts an hexadecimal string to byte array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An byte array representing the hexadecimal input</p>  

| Param | Description |
| --- | --- |
| hex | <p>The hexadecimal string to be converted</p> |

<a name="module_util..convertHexStringToDecString"></a>

### util~convertHexStringToDecString(hexStr) ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| hexStr | <p>A hexadecimal string</p> |

<a name="module_util..convertHexStringToString"></a>

### util~convertHexStringToString(hex) ⇒ <code>string</code>
<p>Converts a Hexadecimally encoded string into String
Inverse function [[convertStringToHexString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The string represented by the Hex String</p>  

| Param | Description |
| --- | --- |
| hex | <p>The Hex string to be converted</p> |

<a name="module_util..convertNQTStringToNumber"></a>

### util~convertNQTStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  
**Throws**:

- <p>exception if argument is invalid</p>


| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="module_util..convertNumberToNQTString"></a>

### util~convertNumberToNQTString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="module_util..convertNumericIdToAddress"></a>

### util~convertNumericIdToAddress(numericId) ⇒
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined</p>  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="module_util..convertStringToByteArray"></a>

### util~convertStringToByteArray(str) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts a string into byte array
Inverse function [[convertByteArrayToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>A byte array representing the string input</p>  

| Param | Description |
| --- | --- |
| str | <p>The string  to be converted</p> |

<a name="module_util..convertStringToHexString"></a>

### util~convertStringToHexString(str) ⇒ <code>string</code>
<p>Converts/Encode a String into Hexadecimally encoded
Inverse function [[convertHexStringToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The Hex String representing the input string</p>  

| Param | Description |
| --- | --- |
| str | <p>The Hex string to be converted</p> |

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..sumNQTStringToNumber"></a>

### util~sumNQTStringToNumber(...nqts) ⇒
<p>Sums various NQT values and returns in Burst</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The sum of all amounts in BURST</p>  

| Param | Description |
| --- | --- |
| ...nqts | <p>Variable amount list with NQT string</p> |

<a name="module_util"></a>

## util

* [util](#module_util)
    * _static_
        * [.isValid](#module_util.isValid) ⇒ <code>boolean</code>
    * _inner_
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertByteArrayToHexString(bytes, uppercase)](#module_util..convertByteArrayToHexString) ⇒ <code>string</code>
        * [~convertByteArrayToString(byteArray, startIndex, length)](#module_util..convertByteArrayToString) ⇒ <code>string</code>
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertHexEndianess(hexString)](#module_util..convertHexEndianess) ⇒
        * [~convertHexStringToByteArray(hex)](#module_util..convertHexStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertHexStringToDecString(hexStr)](#module_util..convertHexStringToDecString) ⇒
        * [~convertHexStringToString(hex)](#module_util..convertHexStringToString) ⇒ <code>string</code>
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~convertStringToByteArray(str)](#module_util..convertStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertStringToHexString(str)](#module_util..convertStringToHexString) ⇒ <code>string</code>
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~sumNQTStringToNumber(...nqts)](#module_util..sumNQTStringToNumber) ⇒

<a name="module_util.isValid"></a>

### util.isValid ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: static property of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  
**Note**: This is with prior quick check  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..convertAddressToNumericId"></a>

### util~convertAddressToNumericId(address) ⇒
<p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The numeric id, or undefined if address is invalid</p>  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="module_util..convertBurstTimeToDate"></a>

### util~convertBurstTimeToDate(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Date</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Date</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertBurstTimeToEpochTime"></a>

### util~convertBurstTimeToEpochTime(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Unix Epoch Time (milliseconds since 01.01.1970)</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertByteArrayToHexString"></a>

### util~convertByteArrayToHexString(bytes, uppercase) ⇒ <code>string</code>
<p>Converts byte array to hexadecimal string
Inverse operation of [[convertHexStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>A hex string representing the byte array input</p>  

| Param | Default | Description |
| --- | --- | --- |
| bytes |  | <p>The (unsigned) byte array to be converted</p> |
| uppercase | <code>false</code> | <p>If <em>true</em>, converts hex string with uppercase characters (Default: false)</p> |

<a name="module_util..convertByteArrayToString"></a>

### util~convertByteArrayToString(byteArray, startIndex, length) ⇒ <code>string</code>
<p>Converts a byte array into string
Inverse function [[convertStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The converted string</p>  

| Param | Default | Description |
| --- | --- | --- |
| byteArray |  | <p>The byte array to be converted</p> |
| startIndex | <code>0</code> | <p>The starting index of array to be converted (Default: 0)</p> |
| length | <code></code> | <p>The number of bytes to be considered, <em>iff</em> startIndex is given. If <em>null</em> the byte array's length is considered</p> |

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

<a name="module_util..convertHexEndianess"></a>

### util~convertHexEndianess(hexString) ⇒
<p>Converts the endianess of a hex string.
If string is little Endianess it turns into Big Endianess, and vice versa</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The converted string as hex string</p>  

| Param | Description |
| --- | --- |
| hexString | <p>The hex string to be converted</p> |

<a name="module_util..convertHexStringToByteArray"></a>

### util~convertHexStringToByteArray(hex) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts an hexadecimal string to byte array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An byte array representing the hexadecimal input</p>  

| Param | Description |
| --- | --- |
| hex | <p>The hexadecimal string to be converted</p> |

<a name="module_util..convertHexStringToDecString"></a>

### util~convertHexStringToDecString(hexStr) ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| hexStr | <p>A hexadecimal string</p> |

<a name="module_util..convertHexStringToString"></a>

### util~convertHexStringToString(hex) ⇒ <code>string</code>
<p>Converts a Hexadecimally encoded string into String
Inverse function [[convertStringToHexString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The string represented by the Hex String</p>  

| Param | Description |
| --- | --- |
| hex | <p>The Hex string to be converted</p> |

<a name="module_util..convertNQTStringToNumber"></a>

### util~convertNQTStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  
**Throws**:

- <p>exception if argument is invalid</p>


| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="module_util..convertNumberToNQTString"></a>

### util~convertNumberToNQTString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="module_util..convertNumericIdToAddress"></a>

### util~convertNumericIdToAddress(numericId) ⇒
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined</p>  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="module_util..convertStringToByteArray"></a>

### util~convertStringToByteArray(str) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts a string into byte array
Inverse function [[convertByteArrayToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>A byte array representing the string input</p>  

| Param | Description |
| --- | --- |
| str | <p>The string  to be converted</p> |

<a name="module_util..convertStringToHexString"></a>

### util~convertStringToHexString(str) ⇒ <code>string</code>
<p>Converts/Encode a String into Hexadecimally encoded
Inverse function [[convertHexStringToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The Hex String representing the input string</p>  

| Param | Description |
| --- | --- |
| str | <p>The Hex string to be converted</p> |

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..sumNQTStringToNumber"></a>

### util~sumNQTStringToNumber(...nqts) ⇒
<p>Sums various NQT values and returns in Burst</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The sum of all amounts in BURST</p>  

| Param | Description |
| --- | --- |
| ...nqts | <p>Variable amount list with NQT string</p> |

<a name="module_util"></a>

## util

* [util](#module_util)
    * _static_
        * [.isValid](#module_util.isValid) ⇒ <code>boolean</code>
    * _inner_
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertByteArrayToHexString(bytes, uppercase)](#module_util..convertByteArrayToHexString) ⇒ <code>string</code>
        * [~convertByteArrayToString(byteArray, startIndex, length)](#module_util..convertByteArrayToString) ⇒ <code>string</code>
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertHexEndianess(hexString)](#module_util..convertHexEndianess) ⇒
        * [~convertHexStringToByteArray(hex)](#module_util..convertHexStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertHexStringToDecString(hexStr)](#module_util..convertHexStringToDecString) ⇒
        * [~convertHexStringToString(hex)](#module_util..convertHexStringToString) ⇒ <code>string</code>
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~convertStringToByteArray(str)](#module_util..convertStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertStringToHexString(str)](#module_util..convertStringToHexString) ⇒ <code>string</code>
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~sumNQTStringToNumber(...nqts)](#module_util..sumNQTStringToNumber) ⇒

<a name="module_util.isValid"></a>

### util.isValid ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: static property of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  
**Note**: This is with prior quick check  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..convertAddressToNumericId"></a>

### util~convertAddressToNumericId(address) ⇒
<p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The numeric id, or undefined if address is invalid</p>  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="module_util..convertBurstTimeToDate"></a>

### util~convertBurstTimeToDate(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Date</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Date</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertBurstTimeToEpochTime"></a>

### util~convertBurstTimeToEpochTime(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Unix Epoch Time (milliseconds since 01.01.1970)</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertByteArrayToHexString"></a>

### util~convertByteArrayToHexString(bytes, uppercase) ⇒ <code>string</code>
<p>Converts byte array to hexadecimal string
Inverse operation of [[convertHexStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>A hex string representing the byte array input</p>  

| Param | Default | Description |
| --- | --- | --- |
| bytes |  | <p>The (unsigned) byte array to be converted</p> |
| uppercase | <code>false</code> | <p>If <em>true</em>, converts hex string with uppercase characters (Default: false)</p> |

<a name="module_util..convertByteArrayToString"></a>

### util~convertByteArrayToString(byteArray, startIndex, length) ⇒ <code>string</code>
<p>Converts a byte array into string
Inverse function [[convertStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The converted string</p>  

| Param | Default | Description |
| --- | --- | --- |
| byteArray |  | <p>The byte array to be converted</p> |
| startIndex | <code>0</code> | <p>The starting index of array to be converted (Default: 0)</p> |
| length | <code></code> | <p>The number of bytes to be considered, <em>iff</em> startIndex is given. If <em>null</em> the byte array's length is considered</p> |

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

<a name="module_util..convertHexEndianess"></a>

### util~convertHexEndianess(hexString) ⇒
<p>Converts the endianess of a hex string.
If string is little Endianess it turns into Big Endianess, and vice versa</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The converted string as hex string</p>  

| Param | Description |
| --- | --- |
| hexString | <p>The hex string to be converted</p> |

<a name="module_util..convertHexStringToByteArray"></a>

### util~convertHexStringToByteArray(hex) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts an hexadecimal string to byte array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An byte array representing the hexadecimal input</p>  

| Param | Description |
| --- | --- |
| hex | <p>The hexadecimal string to be converted</p> |

<a name="module_util..convertHexStringToDecString"></a>

### util~convertHexStringToDecString(hexStr) ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| hexStr | <p>A hexadecimal string</p> |

<a name="module_util..convertHexStringToString"></a>

### util~convertHexStringToString(hex) ⇒ <code>string</code>
<p>Converts a Hexadecimally encoded string into String
Inverse function [[convertStringToHexString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The string represented by the Hex String</p>  

| Param | Description |
| --- | --- |
| hex | <p>The Hex string to be converted</p> |

<a name="module_util..convertNQTStringToNumber"></a>

### util~convertNQTStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  
**Throws**:

- <p>exception if argument is invalid</p>


| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="module_util..convertNumberToNQTString"></a>

### util~convertNumberToNQTString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="module_util..convertNumericIdToAddress"></a>

### util~convertNumericIdToAddress(numericId) ⇒
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined</p>  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="module_util..convertStringToByteArray"></a>

### util~convertStringToByteArray(str) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts a string into byte array
Inverse function [[convertByteArrayToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>A byte array representing the string input</p>  

| Param | Description |
| --- | --- |
| str | <p>The string  to be converted</p> |

<a name="module_util..convertStringToHexString"></a>

### util~convertStringToHexString(str) ⇒ <code>string</code>
<p>Converts/Encode a String into Hexadecimally encoded
Inverse function [[convertHexStringToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The Hex String representing the input string</p>  

| Param | Description |
| --- | --- |
| str | <p>The Hex string to be converted</p> |

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..sumNQTStringToNumber"></a>

### util~sumNQTStringToNumber(...nqts) ⇒
<p>Sums various NQT values and returns in Burst</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The sum of all amounts in BURST</p>  

| Param | Description |
| --- | --- |
| ...nqts | <p>Variable amount list with NQT string</p> |

<a name="module_util"></a>

## util

* [util](#module_util)
    * _static_
        * [.isValid](#module_util.isValid) ⇒ <code>boolean</code>
    * _inner_
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertByteArrayToHexString(bytes, uppercase)](#module_util..convertByteArrayToHexString) ⇒ <code>string</code>
        * [~convertByteArrayToString(byteArray, startIndex, length)](#module_util..convertByteArrayToString) ⇒ <code>string</code>
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertHexEndianess(hexString)](#module_util..convertHexEndianess) ⇒
        * [~convertHexStringToByteArray(hex)](#module_util..convertHexStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertHexStringToDecString(hexStr)](#module_util..convertHexStringToDecString) ⇒
        * [~convertHexStringToString(hex)](#module_util..convertHexStringToString) ⇒ <code>string</code>
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~convertStringToByteArray(str)](#module_util..convertStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertStringToHexString(str)](#module_util..convertStringToHexString) ⇒ <code>string</code>
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~sumNQTStringToNumber(...nqts)](#module_util..sumNQTStringToNumber) ⇒

<a name="module_util.isValid"></a>

### util.isValid ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: static property of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  
**Note**: This is with prior quick check  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..convertAddressToNumericId"></a>

### util~convertAddressToNumericId(address) ⇒
<p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The numeric id, or undefined if address is invalid</p>  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="module_util..convertBurstTimeToDate"></a>

### util~convertBurstTimeToDate(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Date</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Date</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertBurstTimeToEpochTime"></a>

### util~convertBurstTimeToEpochTime(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Unix Epoch Time (milliseconds since 01.01.1970)</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertByteArrayToHexString"></a>

### util~convertByteArrayToHexString(bytes, uppercase) ⇒ <code>string</code>
<p>Converts byte array to hexadecimal string
Inverse operation of [[convertHexStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>A hex string representing the byte array input</p>  

| Param | Default | Description |
| --- | --- | --- |
| bytes |  | <p>The (unsigned) byte array to be converted</p> |
| uppercase | <code>false</code> | <p>If <em>true</em>, converts hex string with uppercase characters (Default: false)</p> |

<a name="module_util..convertByteArrayToString"></a>

### util~convertByteArrayToString(byteArray, startIndex, length) ⇒ <code>string</code>
<p>Converts a byte array into string
Inverse function [[convertStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The converted string</p>  

| Param | Default | Description |
| --- | --- | --- |
| byteArray |  | <p>The byte array to be converted</p> |
| startIndex | <code>0</code> | <p>The starting index of array to be converted (Default: 0)</p> |
| length | <code></code> | <p>The number of bytes to be considered, <em>iff</em> startIndex is given. If <em>null</em> the byte array's length is considered</p> |

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

<a name="module_util..convertHexEndianess"></a>

### util~convertHexEndianess(hexString) ⇒
<p>Converts the endianess of a hex string.
If string is little Endianess it turns into Big Endianess, and vice versa</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The converted string as hex string</p>  

| Param | Description |
| --- | --- |
| hexString | <p>The hex string to be converted</p> |

<a name="module_util..convertHexStringToByteArray"></a>

### util~convertHexStringToByteArray(hex) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts an hexadecimal string to byte array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An byte array representing the hexadecimal input</p>  

| Param | Description |
| --- | --- |
| hex | <p>The hexadecimal string to be converted</p> |

<a name="module_util..convertHexStringToDecString"></a>

### util~convertHexStringToDecString(hexStr) ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| hexStr | <p>A hexadecimal string</p> |

<a name="module_util..convertHexStringToString"></a>

### util~convertHexStringToString(hex) ⇒ <code>string</code>
<p>Converts a Hexadecimally encoded string into String
Inverse function [[convertStringToHexString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The string represented by the Hex String</p>  

| Param | Description |
| --- | --- |
| hex | <p>The Hex string to be converted</p> |

<a name="module_util..convertNQTStringToNumber"></a>

### util~convertNQTStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  
**Throws**:

- <p>exception if argument is invalid</p>


| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="module_util..convertNumberToNQTString"></a>

### util~convertNumberToNQTString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="module_util..convertNumericIdToAddress"></a>

### util~convertNumericIdToAddress(numericId) ⇒
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined</p>  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="module_util..convertStringToByteArray"></a>

### util~convertStringToByteArray(str) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts a string into byte array
Inverse function [[convertByteArrayToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>A byte array representing the string input</p>  

| Param | Description |
| --- | --- |
| str | <p>The string  to be converted</p> |

<a name="module_util..convertStringToHexString"></a>

### util~convertStringToHexString(str) ⇒ <code>string</code>
<p>Converts/Encode a String into Hexadecimally encoded
Inverse function [[convertHexStringToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The Hex String representing the input string</p>  

| Param | Description |
| --- | --- |
| str | <p>The Hex string to be converted</p> |

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..sumNQTStringToNumber"></a>

### util~sumNQTStringToNumber(...nqts) ⇒
<p>Sums various NQT values and returns in Burst</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The sum of all amounts in BURST</p>  

| Param | Description |
| --- | --- |
| ...nqts | <p>Variable amount list with NQT string</p> |

<a name="module_util"></a>

## util

* [util](#module_util)
    * _static_
        * [.isValid](#module_util.isValid) ⇒ <code>boolean</code>
    * _inner_
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertByteArrayToHexString(bytes, uppercase)](#module_util..convertByteArrayToHexString) ⇒ <code>string</code>
        * [~convertByteArrayToString(byteArray, startIndex, length)](#module_util..convertByteArrayToString) ⇒ <code>string</code>
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertHexEndianess(hexString)](#module_util..convertHexEndianess) ⇒
        * [~convertHexStringToByteArray(hex)](#module_util..convertHexStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertHexStringToDecString(hexStr)](#module_util..convertHexStringToDecString) ⇒
        * [~convertHexStringToString(hex)](#module_util..convertHexStringToString) ⇒ <code>string</code>
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~convertStringToByteArray(str)](#module_util..convertStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertStringToHexString(str)](#module_util..convertStringToHexString) ⇒ <code>string</code>
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~sumNQTStringToNumber(...nqts)](#module_util..sumNQTStringToNumber) ⇒

<a name="module_util.isValid"></a>

### util.isValid ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: static property of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  
**Note**: This is with prior quick check  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..convertAddressToNumericId"></a>

### util~convertAddressToNumericId(address) ⇒
<p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The numeric id, or undefined if address is invalid</p>  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="module_util..convertBurstTimeToDate"></a>

### util~convertBurstTimeToDate(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Date</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Date</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertBurstTimeToEpochTime"></a>

### util~convertBurstTimeToEpochTime(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Unix Epoch Time (milliseconds since 01.01.1970)</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertByteArrayToHexString"></a>

### util~convertByteArrayToHexString(bytes, uppercase) ⇒ <code>string</code>
<p>Converts byte array to hexadecimal string
Inverse operation of [[convertHexStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>A hex string representing the byte array input</p>  

| Param | Default | Description |
| --- | --- | --- |
| bytes |  | <p>The (unsigned) byte array to be converted</p> |
| uppercase | <code>false</code> | <p>If <em>true</em>, converts hex string with uppercase characters (Default: false)</p> |

<a name="module_util..convertByteArrayToString"></a>

### util~convertByteArrayToString(byteArray, startIndex, length) ⇒ <code>string</code>
<p>Converts a byte array into string
Inverse function [[convertStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The converted string</p>  

| Param | Default | Description |
| --- | --- | --- |
| byteArray |  | <p>The byte array to be converted</p> |
| startIndex | <code>0</code> | <p>The starting index of array to be converted (Default: 0)</p> |
| length | <code></code> | <p>The number of bytes to be considered, <em>iff</em> startIndex is given. If <em>null</em> the byte array's length is considered</p> |

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

<a name="module_util..convertHexEndianess"></a>

### util~convertHexEndianess(hexString) ⇒
<p>Converts the endianess of a hex string.
If string is little Endianess it turns into Big Endianess, and vice versa</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The converted string as hex string</p>  

| Param | Description |
| --- | --- |
| hexString | <p>The hex string to be converted</p> |

<a name="module_util..convertHexStringToByteArray"></a>

### util~convertHexStringToByteArray(hex) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts an hexadecimal string to byte array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An byte array representing the hexadecimal input</p>  

| Param | Description |
| --- | --- |
| hex | <p>The hexadecimal string to be converted</p> |

<a name="module_util..convertHexStringToDecString"></a>

### util~convertHexStringToDecString(hexStr) ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| hexStr | <p>A hexadecimal string</p> |

<a name="module_util..convertHexStringToString"></a>

### util~convertHexStringToString(hex) ⇒ <code>string</code>
<p>Converts a Hexadecimally encoded string into String
Inverse function [[convertStringToHexString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The string represented by the Hex String</p>  

| Param | Description |
| --- | --- |
| hex | <p>The Hex string to be converted</p> |

<a name="module_util..convertNQTStringToNumber"></a>

### util~convertNQTStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  
**Throws**:

- <p>exception if argument is invalid</p>


| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="module_util..convertNumberToNQTString"></a>

### util~convertNumberToNQTString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="module_util..convertNumericIdToAddress"></a>

### util~convertNumericIdToAddress(numericId) ⇒
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined</p>  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="module_util..convertStringToByteArray"></a>

### util~convertStringToByteArray(str) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts a string into byte array
Inverse function [[convertByteArrayToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>A byte array representing the string input</p>  

| Param | Description |
| --- | --- |
| str | <p>The string  to be converted</p> |

<a name="module_util..convertStringToHexString"></a>

### util~convertStringToHexString(str) ⇒ <code>string</code>
<p>Converts/Encode a String into Hexadecimally encoded
Inverse function [[convertHexStringToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The Hex String representing the input string</p>  

| Param | Description |
| --- | --- |
| str | <p>The Hex string to be converted</p> |

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..sumNQTStringToNumber"></a>

### util~sumNQTStringToNumber(...nqts) ⇒
<p>Sums various NQT values and returns in Burst</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The sum of all amounts in BURST</p>  

| Param | Description |
| --- | --- |
| ...nqts | <p>Variable amount list with NQT string</p> |

<a name="module_util"></a>

## util

* [util](#module_util)
    * _static_
        * [.isValid](#module_util.isValid) ⇒ <code>boolean</code>
    * _inner_
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertByteArrayToHexString(bytes, uppercase)](#module_util..convertByteArrayToHexString) ⇒ <code>string</code>
        * [~convertByteArrayToString(byteArray, startIndex, length)](#module_util..convertByteArrayToString) ⇒ <code>string</code>
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertHexEndianess(hexString)](#module_util..convertHexEndianess) ⇒
        * [~convertHexStringToByteArray(hex)](#module_util..convertHexStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertHexStringToDecString(hexStr)](#module_util..convertHexStringToDecString) ⇒
        * [~convertHexStringToString(hex)](#module_util..convertHexStringToString) ⇒ <code>string</code>
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~convertStringToByteArray(str)](#module_util..convertStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertStringToHexString(str)](#module_util..convertStringToHexString) ⇒ <code>string</code>
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~sumNQTStringToNumber(...nqts)](#module_util..sumNQTStringToNumber) ⇒

<a name="module_util.isValid"></a>

### util.isValid ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: static property of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  
**Note**: This is with prior quick check  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..convertAddressToNumericId"></a>

### util~convertAddressToNumericId(address) ⇒
<p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The numeric id, or undefined if address is invalid</p>  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="module_util..convertBurstTimeToDate"></a>

### util~convertBurstTimeToDate(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Date</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Date</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertBurstTimeToEpochTime"></a>

### util~convertBurstTimeToEpochTime(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Unix Epoch Time (milliseconds since 01.01.1970)</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertByteArrayToHexString"></a>

### util~convertByteArrayToHexString(bytes, uppercase) ⇒ <code>string</code>
<p>Converts byte array to hexadecimal string
Inverse operation of [[convertHexStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>A hex string representing the byte array input</p>  

| Param | Default | Description |
| --- | --- | --- |
| bytes |  | <p>The (unsigned) byte array to be converted</p> |
| uppercase | <code>false</code> | <p>If <em>true</em>, converts hex string with uppercase characters (Default: false)</p> |

<a name="module_util..convertByteArrayToString"></a>

### util~convertByteArrayToString(byteArray, startIndex, length) ⇒ <code>string</code>
<p>Converts a byte array into string
Inverse function [[convertStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The converted string</p>  

| Param | Default | Description |
| --- | --- | --- |
| byteArray |  | <p>The byte array to be converted</p> |
| startIndex | <code>0</code> | <p>The starting index of array to be converted (Default: 0)</p> |
| length | <code></code> | <p>The number of bytes to be considered, <em>iff</em> startIndex is given. If <em>null</em> the byte array's length is considered</p> |

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

<a name="module_util..convertHexEndianess"></a>

### util~convertHexEndianess(hexString) ⇒
<p>Converts the endianess of a hex string.
If string is little Endianess it turns into Big Endianess, and vice versa</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The converted string as hex string</p>  

| Param | Description |
| --- | --- |
| hexString | <p>The hex string to be converted</p> |

<a name="module_util..convertHexStringToByteArray"></a>

### util~convertHexStringToByteArray(hex) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts an hexadecimal string to byte array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An byte array representing the hexadecimal input</p>  

| Param | Description |
| --- | --- |
| hex | <p>The hexadecimal string to be converted</p> |

<a name="module_util..convertHexStringToDecString"></a>

### util~convertHexStringToDecString(hexStr) ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| hexStr | <p>A hexadecimal string</p> |

<a name="module_util..convertHexStringToString"></a>

### util~convertHexStringToString(hex) ⇒ <code>string</code>
<p>Converts a Hexadecimally encoded string into String
Inverse function [[convertStringToHexString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The string represented by the Hex String</p>  

| Param | Description |
| --- | --- |
| hex | <p>The Hex string to be converted</p> |

<a name="module_util..convertNQTStringToNumber"></a>

### util~convertNQTStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  
**Throws**:

- <p>exception if argument is invalid</p>


| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="module_util..convertNumberToNQTString"></a>

### util~convertNumberToNQTString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="module_util..convertNumericIdToAddress"></a>

### util~convertNumericIdToAddress(numericId) ⇒
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined</p>  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="module_util..convertStringToByteArray"></a>

### util~convertStringToByteArray(str) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts a string into byte array
Inverse function [[convertByteArrayToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>A byte array representing the string input</p>  

| Param | Description |
| --- | --- |
| str | <p>The string  to be converted</p> |

<a name="module_util..convertStringToHexString"></a>

### util~convertStringToHexString(str) ⇒ <code>string</code>
<p>Converts/Encode a String into Hexadecimally encoded
Inverse function [[convertHexStringToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The Hex String representing the input string</p>  

| Param | Description |
| --- | --- |
| str | <p>The Hex string to be converted</p> |

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..sumNQTStringToNumber"></a>

### util~sumNQTStringToNumber(...nqts) ⇒
<p>Sums various NQT values and returns in Burst</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The sum of all amounts in BURST</p>  

| Param | Description |
| --- | --- |
| ...nqts | <p>Variable amount list with NQT string</p> |

<a name="module_util"></a>

## util

* [util](#module_util)
    * _static_
        * [.isValid](#module_util.isValid) ⇒ <code>boolean</code>
    * _inner_
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertByteArrayToHexString(bytes, uppercase)](#module_util..convertByteArrayToHexString) ⇒ <code>string</code>
        * [~convertByteArrayToString(byteArray, startIndex, length)](#module_util..convertByteArrayToString) ⇒ <code>string</code>
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertHexEndianess(hexString)](#module_util..convertHexEndianess) ⇒
        * [~convertHexStringToByteArray(hex)](#module_util..convertHexStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertHexStringToDecString(hexStr)](#module_util..convertHexStringToDecString) ⇒
        * [~convertHexStringToString(hex)](#module_util..convertHexStringToString) ⇒ <code>string</code>
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~convertStringToByteArray(str)](#module_util..convertStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertStringToHexString(str)](#module_util..convertStringToHexString) ⇒ <code>string</code>
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~sumNQTStringToNumber(...nqts)](#module_util..sumNQTStringToNumber) ⇒

<a name="module_util.isValid"></a>

### util.isValid ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: static property of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  
**Note**: This is with prior quick check  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..convertAddressToNumericId"></a>

### util~convertAddressToNumericId(address) ⇒
<p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The numeric id, or undefined if address is invalid</p>  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="module_util..convertBurstTimeToDate"></a>

### util~convertBurstTimeToDate(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Date</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Date</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertBurstTimeToEpochTime"></a>

### util~convertBurstTimeToEpochTime(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Unix Epoch Time (milliseconds since 01.01.1970)</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertByteArrayToHexString"></a>

### util~convertByteArrayToHexString(bytes, uppercase) ⇒ <code>string</code>
<p>Converts byte array to hexadecimal string
Inverse operation of [[convertHexStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>A hex string representing the byte array input</p>  

| Param | Default | Description |
| --- | --- | --- |
| bytes |  | <p>The (unsigned) byte array to be converted</p> |
| uppercase | <code>false</code> | <p>If <em>true</em>, converts hex string with uppercase characters (Default: false)</p> |

<a name="module_util..convertByteArrayToString"></a>

### util~convertByteArrayToString(byteArray, startIndex, length) ⇒ <code>string</code>
<p>Converts a byte array into string
Inverse function [[convertStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The converted string</p>  

| Param | Default | Description |
| --- | --- | --- |
| byteArray |  | <p>The byte array to be converted</p> |
| startIndex | <code>0</code> | <p>The starting index of array to be converted (Default: 0)</p> |
| length | <code></code> | <p>The number of bytes to be considered, <em>iff</em> startIndex is given. If <em>null</em> the byte array's length is considered</p> |

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

<a name="module_util..convertHexEndianess"></a>

### util~convertHexEndianess(hexString) ⇒
<p>Converts the endianess of a hex string.
If string is little Endianess it turns into Big Endianess, and vice versa</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The converted string as hex string</p>  

| Param | Description |
| --- | --- |
| hexString | <p>The hex string to be converted</p> |

<a name="module_util..convertHexStringToByteArray"></a>

### util~convertHexStringToByteArray(hex) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts an hexadecimal string to byte array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An byte array representing the hexadecimal input</p>  

| Param | Description |
| --- | --- |
| hex | <p>The hexadecimal string to be converted</p> |

<a name="module_util..convertHexStringToDecString"></a>

### util~convertHexStringToDecString(hexStr) ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| hexStr | <p>A hexadecimal string</p> |

<a name="module_util..convertHexStringToString"></a>

### util~convertHexStringToString(hex) ⇒ <code>string</code>
<p>Converts a Hexadecimally encoded string into String
Inverse function [[convertStringToHexString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The string represented by the Hex String</p>  

| Param | Description |
| --- | --- |
| hex | <p>The Hex string to be converted</p> |

<a name="module_util..convertNQTStringToNumber"></a>

### util~convertNQTStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  
**Throws**:

- <p>exception if argument is invalid</p>


| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="module_util..convertNumberToNQTString"></a>

### util~convertNumberToNQTString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="module_util..convertNumericIdToAddress"></a>

### util~convertNumericIdToAddress(numericId) ⇒
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined</p>  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="module_util..convertStringToByteArray"></a>

### util~convertStringToByteArray(str) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts a string into byte array
Inverse function [[convertByteArrayToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>A byte array representing the string input</p>  

| Param | Description |
| --- | --- |
| str | <p>The string  to be converted</p> |

<a name="module_util..convertStringToHexString"></a>

### util~convertStringToHexString(str) ⇒ <code>string</code>
<p>Converts/Encode a String into Hexadecimally encoded
Inverse function [[convertHexStringToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The Hex String representing the input string</p>  

| Param | Description |
| --- | --- |
| str | <p>The Hex string to be converted</p> |

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..sumNQTStringToNumber"></a>

### util~sumNQTStringToNumber(...nqts) ⇒
<p>Sums various NQT values and returns in Burst</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The sum of all amounts in BURST</p>  

| Param | Description |
| --- | --- |
| ...nqts | <p>Variable amount list with NQT string</p> |

<a name="module_util"></a>

## util

* [util](#module_util)
    * _static_
        * [.isValid](#module_util.isValid) ⇒ <code>boolean</code>
    * _inner_
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertByteArrayToHexString(bytes, uppercase)](#module_util..convertByteArrayToHexString) ⇒ <code>string</code>
        * [~convertByteArrayToString(byteArray, startIndex, length)](#module_util..convertByteArrayToString) ⇒ <code>string</code>
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertHexEndianess(hexString)](#module_util..convertHexEndianess) ⇒
        * [~convertHexStringToByteArray(hex)](#module_util..convertHexStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertHexStringToDecString(hexStr)](#module_util..convertHexStringToDecString) ⇒
        * [~convertHexStringToString(hex)](#module_util..convertHexStringToString) ⇒ <code>string</code>
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~convertStringToByteArray(str)](#module_util..convertStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertStringToHexString(str)](#module_util..convertStringToHexString) ⇒ <code>string</code>
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~sumNQTStringToNumber(...nqts)](#module_util..sumNQTStringToNumber) ⇒

<a name="module_util.isValid"></a>

### util.isValid ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: static property of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  
**Note**: This is with prior quick check  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..convertAddressToNumericId"></a>

### util~convertAddressToNumericId(address) ⇒
<p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The numeric id, or undefined if address is invalid</p>  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="module_util..convertBurstTimeToDate"></a>

### util~convertBurstTimeToDate(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Date</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Date</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertBurstTimeToEpochTime"></a>

### util~convertBurstTimeToEpochTime(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Unix Epoch Time (milliseconds since 01.01.1970)</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertByteArrayToHexString"></a>

### util~convertByteArrayToHexString(bytes, uppercase) ⇒ <code>string</code>
<p>Converts byte array to hexadecimal string
Inverse operation of [[convertHexStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>A hex string representing the byte array input</p>  

| Param | Default | Description |
| --- | --- | --- |
| bytes |  | <p>The (unsigned) byte array to be converted</p> |
| uppercase | <code>false</code> | <p>If <em>true</em>, converts hex string with uppercase characters (Default: false)</p> |

<a name="module_util..convertByteArrayToString"></a>

### util~convertByteArrayToString(byteArray, startIndex, length) ⇒ <code>string</code>
<p>Converts a byte array into string
Inverse function [[convertStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The converted string</p>  

| Param | Default | Description |
| --- | --- | --- |
| byteArray |  | <p>The byte array to be converted</p> |
| startIndex | <code>0</code> | <p>The starting index of array to be converted (Default: 0)</p> |
| length | <code></code> | <p>The number of bytes to be considered, <em>iff</em> startIndex is given. If <em>null</em> the byte array's length is considered</p> |

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

<a name="module_util..convertHexEndianess"></a>

### util~convertHexEndianess(hexString) ⇒
<p>Converts the endianess of a hex string.
If string is little Endianess it turns into Big Endianess, and vice versa</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The converted string as hex string</p>  

| Param | Description |
| --- | --- |
| hexString | <p>The hex string to be converted</p> |

<a name="module_util..convertHexStringToByteArray"></a>

### util~convertHexStringToByteArray(hex) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts an hexadecimal string to byte array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An byte array representing the hexadecimal input</p>  

| Param | Description |
| --- | --- |
| hex | <p>The hexadecimal string to be converted</p> |

<a name="module_util..convertHexStringToDecString"></a>

### util~convertHexStringToDecString(hexStr) ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| hexStr | <p>A hexadecimal string</p> |

<a name="module_util..convertHexStringToString"></a>

### util~convertHexStringToString(hex) ⇒ <code>string</code>
<p>Converts a Hexadecimally encoded string into String
Inverse function [[convertStringToHexString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The string represented by the Hex String</p>  

| Param | Description |
| --- | --- |
| hex | <p>The Hex string to be converted</p> |

<a name="module_util..convertNQTStringToNumber"></a>

### util~convertNQTStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  
**Throws**:

- <p>exception if argument is invalid</p>


| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="module_util..convertNumberToNQTString"></a>

### util~convertNumberToNQTString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="module_util..convertNumericIdToAddress"></a>

### util~convertNumericIdToAddress(numericId) ⇒
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined</p>  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="module_util..convertStringToByteArray"></a>

### util~convertStringToByteArray(str) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts a string into byte array
Inverse function [[convertByteArrayToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>A byte array representing the string input</p>  

| Param | Description |
| --- | --- |
| str | <p>The string  to be converted</p> |

<a name="module_util..convertStringToHexString"></a>

### util~convertStringToHexString(str) ⇒ <code>string</code>
<p>Converts/Encode a String into Hexadecimally encoded
Inverse function [[convertHexStringToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The Hex String representing the input string</p>  

| Param | Description |
| --- | --- |
| str | <p>The Hex string to be converted</p> |

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..sumNQTStringToNumber"></a>

### util~sumNQTStringToNumber(...nqts) ⇒
<p>Sums various NQT values and returns in Burst</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The sum of all amounts in BURST</p>  

| Param | Description |
| --- | --- |
| ...nqts | <p>Variable amount list with NQT string</p> |

<a name="module_util"></a>

## util

* [util](#module_util)
    * _static_
        * [.isValid](#module_util.isValid) ⇒ <code>boolean</code>
    * _inner_
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertByteArrayToHexString(bytes, uppercase)](#module_util..convertByteArrayToHexString) ⇒ <code>string</code>
        * [~convertByteArrayToString(byteArray, startIndex, length)](#module_util..convertByteArrayToString) ⇒ <code>string</code>
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertHexEndianess(hexString)](#module_util..convertHexEndianess) ⇒
        * [~convertHexStringToByteArray(hex)](#module_util..convertHexStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertHexStringToDecString(hexStr)](#module_util..convertHexStringToDecString) ⇒
        * [~convertHexStringToString(hex)](#module_util..convertHexStringToString) ⇒ <code>string</code>
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~convertStringToByteArray(str)](#module_util..convertStringToByteArray) ⇒ <code>Array.&lt;number&gt;</code>
        * [~convertStringToHexString(str)](#module_util..convertStringToHexString) ⇒ <code>string</code>
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~sumNQTStringToNumber(...nqts)](#module_util..sumNQTStringToNumber) ⇒

<a name="module_util.isValid"></a>

### util.isValid ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: static property of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  
**Note**: This is with prior quick check  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..convertAddressToNumericId"></a>

### util~convertAddressToNumericId(address) ⇒
<p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The numeric id, or undefined if address is invalid</p>  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="module_util..convertBurstTimeToDate"></a>

### util~convertBurstTimeToDate(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Date</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Date</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertBurstTimeToEpochTime"></a>

### util~convertBurstTimeToEpochTime(burstTimestamp) ⇒
<p>Converts a Burst/Block Time (seconds since genesis block) into Unix Epoch Time (milliseconds since 01.01.1970)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>Unix Epoch Time (milliseconds since 01.01.1970)</p>  

| Param | Description |
| --- | --- |
| burstTimestamp | <p>The numeric Id</p> |

<a name="module_util..convertByteArrayToHexString"></a>

### util~convertByteArrayToHexString(bytes, uppercase) ⇒ <code>string</code>
<p>Converts byte array to hexadecimal string
Inverse operation of [[convertHexStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>A hex string representing the byte array input</p>  

| Param | Default | Description |
| --- | --- | --- |
| bytes |  | <p>The (unsigned) byte array to be converted</p> |
| uppercase | <code>false</code> | <p>If <em>true</em>, converts hex string with uppercase characters (Default: false)</p> |

<a name="module_util..convertByteArrayToString"></a>

### util~convertByteArrayToString(byteArray, startIndex, length) ⇒ <code>string</code>
<p>Converts a byte array into string
Inverse function [[convertStringToByteArray]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The converted string</p>  

| Param | Default | Description |
| --- | --- | --- |
| byteArray |  | <p>The byte array to be converted</p> |
| startIndex | <code>0</code> | <p>The starting index of array to be converted (Default: 0)</p> |
| length | <code></code> | <p>The number of bytes to be considered, <em>iff</em> startIndex is given. If <em>null</em> the byte array's length is considered</p> |

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

<a name="module_util..convertHexEndianess"></a>

### util~convertHexEndianess(hexString) ⇒
<p>Converts the endianess of a hex string.
If string is little Endianess it turns into Big Endianess, and vice versa</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The converted string as hex string</p>  

| Param | Description |
| --- | --- |
| hexString | <p>The hex string to be converted</p> |

<a name="module_util..convertHexStringToByteArray"></a>

### util~convertHexStringToByteArray(hex) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts an hexadecimal string to byte array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An byte array representing the hexadecimal input</p>  

| Param | Description |
| --- | --- |
| hex | <p>The hexadecimal string to be converted</p> |

<a name="module_util..convertHexStringToDecString"></a>

### util~convertHexStringToDecString(hexStr) ⇒
<p>Arbitrary length hexadecimal to decimal conversion
https://stackoverflow.com/questions/21667377/javascript-hexadecimal-string-to-decimal-string</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A decimal string</p>  

| Param | Description |
| --- | --- |
| hexStr | <p>A hexadecimal string</p> |

<a name="module_util..convertHexStringToString"></a>

### util~convertHexStringToString(hex) ⇒ <code>string</code>
<p>Converts a Hexadecimally encoded string into String
Inverse function [[convertStringToHexString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The string represented by the Hex String</p>  

| Param | Description |
| --- | --- |
| hex | <p>The Hex string to be converted</p> |

<a name="module_util..convertNQTStringToNumber"></a>

### util~convertNQTStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  
**Throws**:

- <p>exception if argument is invalid</p>


| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="module_util..convertNumberToNQTString"></a>

### util~convertNumberToNQTString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="module_util..convertNumericIdToAddress"></a>

### util~convertNumericIdToAddress(numericId) ⇒
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined</p>  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="module_util..convertStringToByteArray"></a>

### util~convertStringToByteArray(str) ⇒ <code>Array.&lt;number&gt;</code>
<p>Converts a string into byte array
Inverse function [[convertByteArrayToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>A byte array representing the string input</p>  

| Param | Description |
| --- | --- |
| str | <p>The string  to be converted</p> |

<a name="module_util..convertStringToHexString"></a>

### util~convertStringToHexString(str) ⇒ <code>string</code>
<p>Converts/Encode a String into Hexadecimally encoded
Inverse function [[convertHexStringToString]]</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>string</code> - <p>The Hex String representing the input string</p>  

| Param | Description |
| --- | --- |
| str | <p>The Hex string to be converted</p> |

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..sumNQTStringToNumber"></a>

### util~sumNQTStringToNumber(...nqts) ⇒
<p>Sums various NQT values and returns in Burst</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The sum of all amounts in BURST</p>  

| Param | Description |
| --- | --- |
| ...nqts | <p>Variable amount list with NQT string</p> |

