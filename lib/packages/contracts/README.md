# @burstjs/contracts

Generic HTTP client that is used as a network provider for @burst/core.

## Installation

`@burstjs/contracts` can be used with NodeJS or Web. Two formats are available

### Using with NodeJS and/or modern web frameworks

Install using [npm](https://www.npmjs.org/):

```
npm install @burstjs/contracts
```

or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @burstjs/contracts
```

#### Example

```js
// TO DO
```

### Using in classic `<script>`

Each package is available as bundled standalone library using IIFE.
This way _burstJS_ can be used also within `<script>`-Tags.
This might be useful for Wordpress and/or other PHP applications.

Just import the package using the HTML `<script>` tag.

`<script src='https://cdn.jsdelivr.net/npm/@burstjs/http/dist/burstjs.http.min.js'></script>`

#### Example

```js
// TO DO
```

See more here:

[@burstjs/contracts Online Documentation](https://burstappsteam.org/phoenix/modules/contracts.html)

---

## API Reference
## Modules

<dl>
<dt><a href="#module_contracts">contracts</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#ContractDataView">ContractDataView</a></dt>
<dd><p>Helper class for contracts</p>
<p>A contract owns additional data, which is split in 8 byte blocks.
The content is encoded in hexadecimal representation and big endianness.
This class facilitates access to these data</p></dd>
</dl>

<a name="module_contracts"></a>

## contracts

* [contracts](#module_contracts)
    * [~CodePageSize](#module_contracts..CodePageSize)
    * [~calculateMinimumCreationFee(hexCode)](#module_contracts..calculateMinimumCreationFee) ⇒
    * [~countCodePages(hexCode)](#module_contracts..countCodePages) ⇒
    * [~numericToHex()](#module_contracts..numericToHex)
    * [~generateMethodCall(args)](#module_contracts..generateMethodCall) ⇒
    * [~getContractDatablock(contract, position, length)](#module_contracts..getContractDatablock) ⇒

<a name="module_contracts..CodePageSize"></a>

### contracts~CodePageSize
<p>Size of Code Pages in bytes</p>

**Kind**: inner constant of [<code>contracts</code>](#module_contracts)  
<a name="module_contracts..calculateMinimumCreationFee"></a>

### contracts~calculateMinimumCreationFee(hexCode) ⇒
<p>Calculates the minimum creation fee of the contract</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>The minimum fee expressed in Planck</p>  

| Param | Description |
| --- | --- |
| hexCode | <p>The contracts code in hex form</p> |

<a name="module_contracts..countCodePages"></a>

### contracts~countCodePages(hexCode) ⇒
<p>Counts the code pages for given machine code</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>The number of code pages for the passed code</p>  

| Param | Description |
| --- | --- |
| hexCode | <p>The contracts code in hex form</p> |

<a name="module_contracts..numericToHex"></a>

### contracts~numericToHex()
<p>Copyright (c) 2019 Burst Apps Team</p>
<p>Credits to AJ ONeal for the two-complements stuff
https://coolaj86.com/articles/convert-decimal-to-hex-with-js-bigints/</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
<a name="module_contracts..generateMethodCall"></a>

### contracts~generateMethodCall(args) ⇒
<p>Generates a method call message of a contracts public method. The message can be sent using for example
[[MessageApi.sendMessage]] with <code>messageIsText = false</code> or [[ContractApi.callMethod]]]</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>A hex string that can be used as contracts transaction message</p>  

| Param | Description |
| --- | --- |
| args | <p>The argument object</p> |

<a name="module_contracts..getContractDatablock"></a>

### contracts~getContractDatablock(contract, position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>
<p>This is a generic function to extract arbitrary data from a contract. It's recommended to use the [[ContractDataView]] class instead</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| contract |  | <p>The contract</p> |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_contracts"></a>

## contracts

* [contracts](#module_contracts)
    * [~CodePageSize](#module_contracts..CodePageSize)
    * [~calculateMinimumCreationFee(hexCode)](#module_contracts..calculateMinimumCreationFee) ⇒
    * [~countCodePages(hexCode)](#module_contracts..countCodePages) ⇒
    * [~numericToHex()](#module_contracts..numericToHex)
    * [~generateMethodCall(args)](#module_contracts..generateMethodCall) ⇒
    * [~getContractDatablock(contract, position, length)](#module_contracts..getContractDatablock) ⇒

<a name="module_contracts..CodePageSize"></a>

### contracts~CodePageSize
<p>Size of Code Pages in bytes</p>

**Kind**: inner constant of [<code>contracts</code>](#module_contracts)  
<a name="module_contracts..calculateMinimumCreationFee"></a>

### contracts~calculateMinimumCreationFee(hexCode) ⇒
<p>Calculates the minimum creation fee of the contract</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>The minimum fee expressed in Planck</p>  

| Param | Description |
| --- | --- |
| hexCode | <p>The contracts code in hex form</p> |

<a name="module_contracts..countCodePages"></a>

### contracts~countCodePages(hexCode) ⇒
<p>Counts the code pages for given machine code</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>The number of code pages for the passed code</p>  

| Param | Description |
| --- | --- |
| hexCode | <p>The contracts code in hex form</p> |

<a name="module_contracts..numericToHex"></a>

### contracts~numericToHex()
<p>Copyright (c) 2019 Burst Apps Team</p>
<p>Credits to AJ ONeal for the two-complements stuff
https://coolaj86.com/articles/convert-decimal-to-hex-with-js-bigints/</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
<a name="module_contracts..generateMethodCall"></a>

### contracts~generateMethodCall(args) ⇒
<p>Generates a method call message of a contracts public method. The message can be sent using for example
[[MessageApi.sendMessage]] with <code>messageIsText = false</code> or [[ContractApi.callMethod]]]</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>A hex string that can be used as contracts transaction message</p>  

| Param | Description |
| --- | --- |
| args | <p>The argument object</p> |

<a name="module_contracts..getContractDatablock"></a>

### contracts~getContractDatablock(contract, position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>
<p>This is a generic function to extract arbitrary data from a contract. It's recommended to use the [[ContractDataView]] class instead</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| contract |  | <p>The contract</p> |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_contracts"></a>

## contracts

* [contracts](#module_contracts)
    * [~CodePageSize](#module_contracts..CodePageSize)
    * [~calculateMinimumCreationFee(hexCode)](#module_contracts..calculateMinimumCreationFee) ⇒
    * [~countCodePages(hexCode)](#module_contracts..countCodePages) ⇒
    * [~numericToHex()](#module_contracts..numericToHex)
    * [~generateMethodCall(args)](#module_contracts..generateMethodCall) ⇒
    * [~getContractDatablock(contract, position, length)](#module_contracts..getContractDatablock) ⇒

<a name="module_contracts..CodePageSize"></a>

### contracts~CodePageSize
<p>Size of Code Pages in bytes</p>

**Kind**: inner constant of [<code>contracts</code>](#module_contracts)  
<a name="module_contracts..calculateMinimumCreationFee"></a>

### contracts~calculateMinimumCreationFee(hexCode) ⇒
<p>Calculates the minimum creation fee of the contract</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>The minimum fee expressed in Planck</p>  

| Param | Description |
| --- | --- |
| hexCode | <p>The contracts code in hex form</p> |

<a name="module_contracts..countCodePages"></a>

### contracts~countCodePages(hexCode) ⇒
<p>Counts the code pages for given machine code</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>The number of code pages for the passed code</p>  

| Param | Description |
| --- | --- |
| hexCode | <p>The contracts code in hex form</p> |

<a name="module_contracts..numericToHex"></a>

### contracts~numericToHex()
<p>Copyright (c) 2019 Burst Apps Team</p>
<p>Credits to AJ ONeal for the two-complements stuff
https://coolaj86.com/articles/convert-decimal-to-hex-with-js-bigints/</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
<a name="module_contracts..generateMethodCall"></a>

### contracts~generateMethodCall(args) ⇒
<p>Generates a method call message of a contracts public method. The message can be sent using for example
[[MessageApi.sendMessage]] with <code>messageIsText = false</code> or [[ContractApi.callMethod]]]</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>A hex string that can be used as contracts transaction message</p>  

| Param | Description |
| --- | --- |
| args | <p>The argument object</p> |

<a name="module_contracts..getContractDatablock"></a>

### contracts~getContractDatablock(contract, position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>
<p>This is a generic function to extract arbitrary data from a contract. It's recommended to use the [[ContractDataView]] class instead</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| contract |  | <p>The contract</p> |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_contracts"></a>

## contracts

* [contracts](#module_contracts)
    * [~CodePageSize](#module_contracts..CodePageSize)
    * [~calculateMinimumCreationFee(hexCode)](#module_contracts..calculateMinimumCreationFee) ⇒
    * [~countCodePages(hexCode)](#module_contracts..countCodePages) ⇒
    * [~numericToHex()](#module_contracts..numericToHex)
    * [~generateMethodCall(args)](#module_contracts..generateMethodCall) ⇒
    * [~getContractDatablock(contract, position, length)](#module_contracts..getContractDatablock) ⇒

<a name="module_contracts..CodePageSize"></a>

### contracts~CodePageSize
<p>Size of Code Pages in bytes</p>

**Kind**: inner constant of [<code>contracts</code>](#module_contracts)  
<a name="module_contracts..calculateMinimumCreationFee"></a>

### contracts~calculateMinimumCreationFee(hexCode) ⇒
<p>Calculates the minimum creation fee of the contract</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>The minimum fee expressed in Planck</p>  

| Param | Description |
| --- | --- |
| hexCode | <p>The contracts code in hex form</p> |

<a name="module_contracts..countCodePages"></a>

### contracts~countCodePages(hexCode) ⇒
<p>Counts the code pages for given machine code</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>The number of code pages for the passed code</p>  

| Param | Description |
| --- | --- |
| hexCode | <p>The contracts code in hex form</p> |

<a name="module_contracts..numericToHex"></a>

### contracts~numericToHex()
<p>Copyright (c) 2019 Burst Apps Team</p>
<p>Credits to AJ ONeal for the two-complements stuff
https://coolaj86.com/articles/convert-decimal-to-hex-with-js-bigints/</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
<a name="module_contracts..generateMethodCall"></a>

### contracts~generateMethodCall(args) ⇒
<p>Generates a method call message of a contracts public method. The message can be sent using for example
[[MessageApi.sendMessage]] with <code>messageIsText = false</code> or [[ContractApi.callMethod]]]</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>A hex string that can be used as contracts transaction message</p>  

| Param | Description |
| --- | --- |
| args | <p>The argument object</p> |

<a name="module_contracts..getContractDatablock"></a>

### contracts~getContractDatablock(contract, position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>
<p>This is a generic function to extract arbitrary data from a contract. It's recommended to use the [[ContractDataView]] class instead</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| contract |  | <p>The contract</p> |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="module_contracts"></a>

## contracts

* [contracts](#module_contracts)
    * [~CodePageSize](#module_contracts..CodePageSize)
    * [~calculateMinimumCreationFee(hexCode)](#module_contracts..calculateMinimumCreationFee) ⇒
    * [~countCodePages(hexCode)](#module_contracts..countCodePages) ⇒
    * [~numericToHex()](#module_contracts..numericToHex)
    * [~generateMethodCall(args)](#module_contracts..generateMethodCall) ⇒
    * [~getContractDatablock(contract, position, length)](#module_contracts..getContractDatablock) ⇒

<a name="module_contracts..CodePageSize"></a>

### contracts~CodePageSize
<p>Size of Code Pages in bytes</p>

**Kind**: inner constant of [<code>contracts</code>](#module_contracts)  
<a name="module_contracts..calculateMinimumCreationFee"></a>

### contracts~calculateMinimumCreationFee(hexCode) ⇒
<p>Calculates the minimum creation fee of the contract</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>The minimum fee expressed in Planck</p>  

| Param | Description |
| --- | --- |
| hexCode | <p>The contracts code in hex form</p> |

<a name="module_contracts..countCodePages"></a>

### contracts~countCodePages(hexCode) ⇒
<p>Counts the code pages for given machine code</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>The number of code pages for the passed code</p>  

| Param | Description |
| --- | --- |
| hexCode | <p>The contracts code in hex form</p> |

<a name="module_contracts..numericToHex"></a>

### contracts~numericToHex()
<p>Copyright (c) 2019 Burst Apps Team</p>
<p>Credits to AJ ONeal for the two-complements stuff
https://coolaj86.com/articles/convert-decimal-to-hex-with-js-bigints/</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
<a name="module_contracts..generateMethodCall"></a>

### contracts~generateMethodCall(args) ⇒
<p>Generates a method call message of a contracts public method. The message can be sent using for example
[[MessageApi.sendMessage]] with <code>messageIsText = false</code> or [[ContractApi.callMethod]]]</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>A hex string that can be used as contracts transaction message</p>  

| Param | Description |
| --- | --- |
| args | <p>The argument object</p> |

<a name="module_contracts..getContractDatablock"></a>

### contracts~getContractDatablock(contract, position, length) ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>
<p>This is a generic function to extract arbitrary data from a contract. It's recommended to use the [[ContractDataView]] class instead</p>

**Kind**: inner method of [<code>contracts</code>](#module_contracts)  
**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Default | Description |
| --- | --- | --- |
| contract |  | <p>The contract</p> |
| position |  | <p>The variables position</p> |
| length | <code>16</code> | <p>The length of data to be extracted</p> |

<a name="ContractDataView"></a>

## ContractDataView
<p>Helper class for contracts</p>
<p>A contract owns additional data, which is split in 8 byte blocks.
The content is encoded in hexadecimal representation and big endianness.
This class facilitates access to these data</p>

**Kind**: global class  

* [ContractDataView](#ContractDataView)
    * [new ContractDataView()](#new_ContractDataView_new)
    * [.getContract()](#ContractDataView+getContract) ⇒
    * [.countCodePages()](#ContractDataView+countCodePages) ⇒
    * [.getVariableAsString(index)](#ContractDataView+getVariableAsString) ⇒
    * [.getDataBlocksAsString(index, count)](#ContractDataView+getDataBlocksAsString) ⇒
    * [.getVariableAsDecimal(index)](#ContractDataView+getVariableAsDecimal) ⇒
    * [.getVariable(index)](#ContractDataView+getVariable) ⇒
    * [.getHexDataAt(index, length)](#ContractDataView+getHexDataAt) ⇒

<a name="new_ContractDataView_new"></a>

### new ContractDataView()
<p>The length of a contracts variable (considering Hex notation)</p>

<a name="ContractDataView+getContract"></a>

### contractDataView.getContract() ⇒
**Kind**: instance method of [<code>ContractDataView</code>](#ContractDataView)  
**Returns**: <p>Get the contract</p>  
<a name="ContractDataView+countCodePages"></a>

### contractDataView.countCodePages() ⇒
**Kind**: instance method of [<code>ContractDataView</code>](#ContractDataView)  
**Returns**: <p>The number of code pages</p>  
<a name="ContractDataView+getVariableAsString"></a>

### contractDataView.getVariableAsString(index) ⇒
<p>Get a variable as string</p>

**Kind**: instance method of [<code>ContractDataView</code>](#ContractDataView)  
**Returns**: <p>The data as string (Utf-8)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="ContractDataView+getDataBlocksAsString"></a>

### contractDataView.getDataBlocksAsString(index, count) ⇒
<p>Get multiple data blocks as string</p>

**Kind**: instance method of [<code>ContractDataView</code>](#ContractDataView)  
**Returns**: <p>The data as string (Utf-8)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |
| count | <p>Number of blocks</p> |

<a name="ContractDataView+getVariableAsDecimal"></a>

### contractDataView.getVariableAsDecimal(index) ⇒
<p>Get a variable as decimal (string)</p>

**Kind**: instance method of [<code>ContractDataView</code>](#ContractDataView)  
**Returns**: <p>The data as a decimal string sequence</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="ContractDataView+getVariable"></a>

### contractDataView.getVariable(index) ⇒
<p>Get a variable at given position/index</p>

**Kind**: instance method of [<code>ContractDataView</code>](#ContractDataView)  
**Returns**: <p>The data as hexadecimal string (in little endianness)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="ContractDataView+getHexDataAt"></a>

### contractDataView.getHexDataAt(index, length) ⇒
<p>Get a hexadecimal data block of arbitrary length at given position/index</p>

**Kind**: instance method of [<code>ContractDataView</code>](#ContractDataView)  
**Returns**: <p>The data as hexadecimal string (in little endianness)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |
| length | <p>The length of the data block (must be a multiple of 2)</p> |

