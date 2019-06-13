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

[@burstjs/util Online Documentation](https://burstappsteam.org/phoenix/modules/util.html)

---

## API Reference

## util

* [util](#module_util)
    * _static_
        * [.isValid](#module_util.isValid) ⇒ <code>boolean</code>
    * _inner_
        * [~burstAddressPattern](#module_util..burstAddressPattern)
        * [~constructBurstAddress(parts)](#module_util..constructBurstAddress)
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~splitBurstAddress(address)](#module_util..splitBurstAddress)
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

<a name="module_util..burstAddressPattern"></a>

### util~burstAddressPattern
<p>A useful regex for matching burst addresses</p>

**Kind**: inner constant of [<code>util</code>](#module_util)  
<a name="module_util..constructBurstAddress"></a>

### util~constructBurstAddress(parts)
<p>Construct a Burst address from a string array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| parts | <p>4 parts string array</p> |

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

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

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

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..splitBurstAddress"></a>

### util~splitBurstAddress(address)
<p>Split the Burst address string into an array of 4 parts</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| address | <p>A valid Burst address</p> |

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
        * [~burstAddressPattern](#module_util..burstAddressPattern)
        * [~constructBurstAddress(parts)](#module_util..constructBurstAddress)
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~splitBurstAddress(address)](#module_util..splitBurstAddress)
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

<a name="module_util..burstAddressPattern"></a>

### util~burstAddressPattern
<p>A useful regex for matching burst addresses</p>

**Kind**: inner constant of [<code>util</code>](#module_util)  
<a name="module_util..constructBurstAddress"></a>

### util~constructBurstAddress(parts)
<p>Construct a Burst address from a string array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| parts | <p>4 parts string array</p> |

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

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

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

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..splitBurstAddress"></a>

### util~splitBurstAddress(address)
<p>Split the Burst address string into an array of 4 parts</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| address | <p>A valid Burst address</p> |

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
        * [~burstAddressPattern](#module_util..burstAddressPattern)
        * [~constructBurstAddress(parts)](#module_util..constructBurstAddress)
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~splitBurstAddress(address)](#module_util..splitBurstAddress)
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

<a name="module_util..burstAddressPattern"></a>

### util~burstAddressPattern
<p>A useful regex for matching burst addresses</p>

**Kind**: inner constant of [<code>util</code>](#module_util)  
<a name="module_util..constructBurstAddress"></a>

### util~constructBurstAddress(parts)
<p>Construct a Burst address from a string array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| parts | <p>4 parts string array</p> |

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

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

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

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..splitBurstAddress"></a>

### util~splitBurstAddress(address)
<p>Split the Burst address string into an array of 4 parts</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| address | <p>A valid Burst address</p> |

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
        * [~burstAddressPattern](#module_util..burstAddressPattern)
        * [~constructBurstAddress(parts)](#module_util..constructBurstAddress)
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~splitBurstAddress(address)](#module_util..splitBurstAddress)
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

<a name="module_util..burstAddressPattern"></a>

### util~burstAddressPattern
<p>A useful regex for matching burst addresses</p>

**Kind**: inner constant of [<code>util</code>](#module_util)  
<a name="module_util..constructBurstAddress"></a>

### util~constructBurstAddress(parts)
<p>Construct a Burst address from a string array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| parts | <p>4 parts string array</p> |

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

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

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

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..splitBurstAddress"></a>

### util~splitBurstAddress(address)
<p>Split the Burst address string into an array of 4 parts</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| address | <p>A valid Burst address</p> |

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
        * [~burstAddressPattern](#module_util..burstAddressPattern)
        * [~constructBurstAddress(parts)](#module_util..constructBurstAddress)
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~splitBurstAddress(address)](#module_util..splitBurstAddress)
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

<a name="module_util..burstAddressPattern"></a>

### util~burstAddressPattern
<p>A useful regex for matching burst addresses</p>

**Kind**: inner constant of [<code>util</code>](#module_util)  
<a name="module_util..constructBurstAddress"></a>

### util~constructBurstAddress(parts)
<p>Construct a Burst address from a string array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| parts | <p>4 parts string array</p> |

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

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

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

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..splitBurstAddress"></a>

### util~splitBurstAddress(address)
<p>Split the Burst address string into an array of 4 parts</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| address | <p>A valid Burst address</p> |

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
        * [~burstAddressPattern](#module_util..burstAddressPattern)
        * [~constructBurstAddress(parts)](#module_util..constructBurstAddress)
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~splitBurstAddress(address)](#module_util..splitBurstAddress)
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

<a name="module_util..burstAddressPattern"></a>

### util~burstAddressPattern
<p>A useful regex for matching burst addresses</p>

**Kind**: inner constant of [<code>util</code>](#module_util)  
<a name="module_util..constructBurstAddress"></a>

### util~constructBurstAddress(parts)
<p>Construct a Burst address from a string array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| parts | <p>4 parts string array</p> |

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

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

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

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..splitBurstAddress"></a>

### util~splitBurstAddress(address)
<p>Split the Burst address string into an array of 4 parts</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| address | <p>A valid Burst address</p> |

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
        * [~burstAddressPattern](#module_util..burstAddressPattern)
        * [~constructBurstAddress(parts)](#module_util..constructBurstAddress)
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~splitBurstAddress(address)](#module_util..splitBurstAddress)
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

<a name="module_util..burstAddressPattern"></a>

### util~burstAddressPattern
<p>A useful regex for matching burst addresses</p>

**Kind**: inner constant of [<code>util</code>](#module_util)  
<a name="module_util..constructBurstAddress"></a>

### util~constructBurstAddress(parts)
<p>Construct a Burst address from a string array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| parts | <p>4 parts string array</p> |

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

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

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

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..splitBurstAddress"></a>

### util~splitBurstAddress(address)
<p>Split the Burst address string into an array of 4 parts</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| address | <p>A valid Burst address</p> |

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
        * [~burstAddressPattern](#module_util..burstAddressPattern)
        * [~constructBurstAddress(parts)](#module_util..constructBurstAddress)
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~splitBurstAddress(address)](#module_util..splitBurstAddress)
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

<a name="module_util..burstAddressPattern"></a>

### util~burstAddressPattern
<p>A useful regex for matching burst addresses</p>

**Kind**: inner constant of [<code>util</code>](#module_util)  
<a name="module_util..constructBurstAddress"></a>

### util~constructBurstAddress(parts)
<p>Construct a Burst address from a string array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| parts | <p>4 parts string array</p> |

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

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

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

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..splitBurstAddress"></a>

### util~splitBurstAddress(address)
<p>Split the Burst address string into an array of 4 parts</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| address | <p>A valid Burst address</p> |

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
        * [~burstAddressPattern](#module_util..burstAddressPattern)
        * [~constructBurstAddress(parts)](#module_util..constructBurstAddress)
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~splitBurstAddress(address)](#module_util..splitBurstAddress)
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

<a name="module_util..burstAddressPattern"></a>

### util~burstAddressPattern
<p>A useful regex for matching burst addresses</p>

**Kind**: inner constant of [<code>util</code>](#module_util)  
<a name="module_util..constructBurstAddress"></a>

### util~constructBurstAddress(parts)
<p>Construct a Burst address from a string array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| parts | <p>4 parts string array</p> |

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

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

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

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..splitBurstAddress"></a>

### util~splitBurstAddress(address)
<p>Split the Burst address string into an array of 4 parts</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| address | <p>A valid Burst address</p> |

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
        * [~burstAddressPattern](#module_util..burstAddressPattern)
        * [~constructBurstAddress(parts)](#module_util..constructBurstAddress)
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~splitBurstAddress(address)](#module_util..splitBurstAddress)
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

<a name="module_util..burstAddressPattern"></a>

### util~burstAddressPattern
<p>A useful regex for matching burst addresses</p>

**Kind**: inner constant of [<code>util</code>](#module_util)  
<a name="module_util..constructBurstAddress"></a>

### util~constructBurstAddress(parts)
<p>Construct a Burst address from a string array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| parts | <p>4 parts string array</p> |

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

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

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

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..splitBurstAddress"></a>

### util~splitBurstAddress(address)
<p>Split the Burst address string into an array of 4 parts</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| address | <p>A valid Burst address</p> |

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
        * [~burstAddressPattern](#module_util..burstAddressPattern)
        * [~constructBurstAddress(parts)](#module_util..constructBurstAddress)
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~splitBurstAddress(address)](#module_util..splitBurstAddress)
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

<a name="module_util..burstAddressPattern"></a>

### util~burstAddressPattern
<p>A useful regex for matching burst addresses</p>

**Kind**: inner constant of [<code>util</code>](#module_util)  
<a name="module_util..constructBurstAddress"></a>

### util~constructBurstAddress(parts)
<p>Construct a Burst address from a string array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| parts | <p>4 parts string array</p> |

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

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

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

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..splitBurstAddress"></a>

### util~splitBurstAddress(address)
<p>Split the Burst address string into an array of 4 parts</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| address | <p>A valid Burst address</p> |

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
        * [~burstAddressPattern](#module_util..burstAddressPattern)
        * [~constructBurstAddress(parts)](#module_util..constructBurstAddress)
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~splitBurstAddress(address)](#module_util..splitBurstAddress)
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

<a name="module_util..burstAddressPattern"></a>

### util~burstAddressPattern
<p>A useful regex for matching burst addresses</p>

**Kind**: inner constant of [<code>util</code>](#module_util)  
<a name="module_util..constructBurstAddress"></a>

### util~constructBurstAddress(parts)
<p>Construct a Burst address from a string array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| parts | <p>4 parts string array</p> |

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

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

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

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..splitBurstAddress"></a>

### util~splitBurstAddress(address)
<p>Split the Burst address string into an array of 4 parts</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| address | <p>A valid Burst address</p> |

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
        * [~burstAddressPattern](#module_util..burstAddressPattern)
        * [~constructBurstAddress(parts)](#module_util..constructBurstAddress)
        * [~convertAddressToNumericId(address)](#module_util..convertAddressToNumericId) ⇒
        * [~convertBurstTimeToDate(burstTimestamp)](#module_util..convertBurstTimeToDate) ⇒
        * [~convertBurstTimeToEpochTime(burstTimestamp)](#module_util..convertBurstTimeToEpochTime) ⇒
        * [~convertDateToBurstTime(date)](#module_util..convertDateToBurstTime) ⇒
        * [~convertNQTStringToNumber(amount)](#module_util..convertNQTStringToNumber) ⇒
        * [~convertNumberToNQTString(n)](#module_util..convertNumberToNQTString) ⇒
        * [~convertNumericIdToAddress(numericId)](#module_util..convertNumericIdToAddress) ⇒
        * [~isValid(address)](#module_util..isValid) ⇒ <code>boolean</code>
        * [~splitBurstAddress(address)](#module_util..splitBurstAddress)
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

<a name="module_util..burstAddressPattern"></a>

### util~burstAddressPattern
<p>A useful regex for matching burst addresses</p>

**Kind**: inner constant of [<code>util</code>](#module_util)  
<a name="module_util..constructBurstAddress"></a>

### util~constructBurstAddress(parts)
<p>Construct a Burst address from a string array</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| parts | <p>4 parts string array</p> |

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

<a name="module_util..convertDateToBurstTime"></a>

### util~convertDateToBurstTime(date) ⇒
<p>Converts a Date into Burst/Block Time (seconds since genesis block)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The Burst Timestamp</p>  

| Param | Description |
| --- | --- |
| date | <p>The date to be converted</p> |

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

<a name="module_util..isValid"></a>

### util~isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="module_util..splitBurstAddress"></a>

### util~splitBurstAddress(address)
<p>Split the Burst address string into an array of 4 parts</p>

**Kind**: inner method of [<code>util</code>](#module_util)  

| Param | Description |
| --- | --- |
| address | <p>A valid Burst address</p> |

<a name="module_util..sumNQTStringToNumber"></a>

### util~sumNQTStringToNumber(...nqts) ⇒
<p>Sums various NQT values and returns in Burst</p>

**Kind**: inner method of [<code>util</code>](#module_util)  
**Returns**: <p>The sum of all amounts in BURST</p>  

| Param | Description |
| --- | --- |
| ...nqts | <p>Variable amount list with NQT string</p> |

