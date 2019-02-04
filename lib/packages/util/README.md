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
## Constants

<dl>
<dt><a href="#burstAddressPattern">burstAddressPattern</a></dt>
<dd><p>A useful regex for matching burst addresses</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#constructBurstAddress">constructBurstAddress(parts)</a></dt>
<dd><p>Construct a Burst address from a string array</p></dd>
<dt><a href="#convertNumberToString">convertNumberToString(n)</a> ⇒</dt>
<dd><p>Helper method to Number to String(8 decimals) representation</p></dd>
<dt><a href="#convertStringToNumber">convertStringToNumber(amount)</a> ⇒</dt>
<dd><p>Helper method to convert a String to number</p></dd>
<dt><a href="#decode">decode(address)</a></dt>
<dd><p>Decode BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p></dd>
<dt><a href="#encode">encode(numericId)</a></dt>
<dd><p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p></dd>
<dt><a href="#isBurstAddress">isBurstAddress(address)</a></dt>
<dd><p>Validation Check. Quick validation of Burst addresses included</p></dd>
<dt><a href="#isValid">isValid(address)</a></dt>
<dd><p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p></dd>
<dt><a href="#splitBurstAddress">splitBurstAddress(address)</a></dt>
<dd><p>Split the Burst address string into an array of 4 parts</p></dd>
</dl>

<a name="burstAddressPattern"></a>

## burstAddressPattern
<p>A useful regex for matching burst addresses</p>

**Kind**: global constant  
<a name="constructBurstAddress"></a>

## constructBurstAddress(parts)
<p>Construct a Burst address from a string array</p>

**Kind**: global function  

| Param | Description |
| --- | --- |
| parts | <p>4 parts string array</p> |

<a name="convertNumberToString"></a>

## convertNumberToString(n) ⇒
<p>Helper method to Number to String(8 decimals) representation</p>

**Kind**: global function  
**Returns**: <p>a NQT number string</p>  

| Param | Description |
| --- | --- |
| n | <p>the number</p> |

<a name="convertStringToNumber"></a>

## convertStringToNumber(amount) ⇒
<p>Helper method to convert a String to number</p>

**Kind**: global function  
**Returns**: <p>A number expressed in Burst (not NQT)</p>  

| Param | Description |
| --- | --- |
| amount | <p>The amount in NQT</p> |

<a name="decode"></a>

## decode(address)
<p>Decode BURST-XXXX-XXXX-XXXX-XXXXX into numeric Id</p>

**Kind**: global function  

| Param | Description |
| --- | --- |
| address | <p>The BURST address</p> |

<a name="encode"></a>

## encode(numericId)
<p>Encode a numeric id into BURST-XXXX-XXXX-XXXX-XXXXX</p>

**Kind**: global function  

| Param | Description |
| --- | --- |
| numericId | <p>The numeric Id</p> |

<a name="isBurstAddress"></a>

## isBurstAddress(address)
<p>Validation Check. Quick validation of Burst addresses included</p>

**Kind**: global function  

| Param | Description |
| --- | --- |
| address | <p>Burst Address</p> |

<a name="isValid"></a>

## isValid(address)
<p>Check for valid Burst address (format: BURST-XXXX-XXXX-XXXX-XXXXX, XXXX-XXXX-XXXX-XXXXX)</p>

**Kind**: global function  

| Param | Description |
| --- | --- |
| address | <p>The address</p> |

<a name="splitBurstAddress"></a>

## splitBurstAddress(address)
<p>Split the Burst address string into an array of 4 parts</p>

**Kind**: global function  

| Param | Description |
| --- | --- |
| address | <p>A valid Burst address</p> |

