# @burstjs/util

Useful utilities and tools for building Burstcoin applications

## Installation

Install using [npm](https://www.npmjs.org/):

```
npm install @burstjs/util
```

or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @burstjs/util
```

## API Reference
## Modules

<dl>
<dt><a href="#module_util">util</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#isValid">isValid</a> ⇒ <code>boolean</code></dt>
<dd><p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p></dd>
</dl>

## Constants

<dl>
<dt><a href="#initialCodeword">initialCodeword</a></dt>
<dd><p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#constructBurstAddress">constructBurstAddress(parts)</a></dt>
<dd><p>Construct a Burst address from a string array</p></dd>
<dt><a href="#convertAddressToNumericId">convertAddressToNumericId(address)</a> ⇒</dt>
<dd><p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p></dd>
<dt><a href="#convertNQTStringToNumber">convertNQTStringToNumber(amount)</a> ⇒</dt>
<dd><p>Helper method to convert a String to number</p></dd>
<dt><a href="#convertNumberToNQTString">convertNumberToNQTString(n)</a> ⇒</dt>
<dd><p>Helper method to Number to String(8 decimals) representation</p></dd>
<dt><a href="#convertNumericIdToAddress">convertNumericIdToAddress(numericId)</a> ⇒</dt>
<dd><p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p></dd>
<dt><a href="#isValid">isValid(address)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p></dd>
<dt><a href="#splitBurstAddress">splitBurstAddress(address)</a></dt>
<dd><p>Split the Burst address string into an array of 4 parts</p></dd>
</dl>

<a name="module_util"></a>

## util
<a name="module_util..burstAddressPattern"></a>

### util~burstAddressPattern
<p>A useful regex for matching burst addresses</p>

**Kind**: inner constant of [<code>util</code>](#module_util)  
<a name="isValid"></a>

## isValid ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: global variable  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  
**Note**: This is with prior quick check  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="initialCodeword"></a>

## initialCodeword
<p>Original work Copyright (c) 2018 PoC-Consortium
Modified work Copyright (c) 2019 Burst Apps Team</p>

**Kind**: global constant  
<a name="constructBurstAddress"></a>

## constructBurstAddress(parts)
<p>Construct a Burst address from a string array</p>

**Kind**: global function  

| Param | Description |
| --- | --- |
| parts | <p>4 parts string array</p> |

<a name="convertAddressToNumericId"></a>

## convertAddressToNumericId(address) ⇒
<p>Converts BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: global function  
**Returns**: <p>The numeric id, or undefined if address is invalid</p>  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="convertNQTStringToNumber"></a>

## convertNQTStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: global function  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  
**Throws**:

- <p>exception if argument is invalid</p>


| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="convertNumberToNQTString"></a>

## convertNumberToNQTString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: global function  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="convertNumericIdToAddress"></a>

## convertNumericIdToAddress(numericId) ⇒
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: global function  
**Returns**: <p>the BURST address in Reed-Solomon encoding, or undefined if passed null, undefined</p>  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="isValid"></a>

## isValid(address) ⇒ <code>boolean</code>
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: global function  
**Returns**: <code>boolean</code> - <p>true, if is a valid address, else false</p>  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | <p>The address</p> |

<a name="splitBurstAddress"></a>

## splitBurstAddress(address)
<p>Split the Burst address string into an array of 4 parts</p>

**Kind**: global function  

| Param | Description |
| --- | --- |
| address | <p>A valid Burst address</p> |

