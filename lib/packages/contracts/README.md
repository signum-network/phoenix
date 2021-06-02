# @signumjs/contracts

Utility functions to interact with smart contract of the Signum blockchain platform

## Installation

`@signumjs/contracts` can be used with NodeJS or Web. Two formats are available

### Using with NodeJS and/or modern web frameworks

Install using [npm](https://www.npmjs.org/):

```
npm install @signumjs/contracts
```

or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @signumjs/contracts
```

#### Example

```js
// TO DO
```

### Using in classic `<script>`

Each package is available as bundled standalone library using UMD.
This way _signumJS_ can be used also within `<script>`-Tags.
This might be useful for Wordpress and/or other PHP applications.

Just import the package using the HTML `<script>` tag.

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/http/dist/signumjs.contracts.min.js'></script>`

#### Example

```js
// TO DO
```

See more here:

[@signumjs/contracts Online Documentation](https://burst-apps-team.github.io/phoenix/modules/contracts.html)

---

## API Reference
## Modules

<dl>
<dt><a href="#module_contracts">contracts</a></dt>
<dd><p>Helper class for contracts</p>
<p>A contract owns additional data, which is split in 8 byte blocks.
The content is encoded in hexadecimal representation and big endianness.
This class facilitates access to these data</p></dd>
<dt><a href="#module_contracts">contracts</a> ⇒</dt>
<dd><p>Calculates the minimum creation fee of the contract</p></dd>
<dt><a href="#module_contracts">contracts</a></dt>
<dd></dd>
<dt><a href="#module_contracts">contracts</a> ⇒</dt>
<dd><p>Counts the code pages for given machine code</p></dd>
<dt><a href="#module_contracts">contracts</a> ⇒</dt>
<dd><p>Generates a method call message of a contracts public method. The message can be sent using for example
[[MessageApi.sendMessage]] with <code>messageIsText = false</code> or [[ContractApi.callContractMethod]]]</p></dd>
<dt><a href="#module_contracts">contracts</a> ⇒</dt>
<dd><p>Extracts a variables value as hexadecimal string from a contract's machine data</p>
<p>This is a generic function to extract arbitrary data from a contract. It's recommended to use the [[ContractDataView]] class instead</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#convertArgument">convertArgument(value)</a></dt>
<dd></dd>
</dl>

<a name="module_contracts"></a>

## contracts
<p>Helper class for contracts</p>
<p>A contract owns additional data, which is split in 8 byte blocks.
The content is encoded in hexadecimal representation and big endianness.
This class facilitates access to these data</p>


* [contracts](#module_contracts)
    * [~ContractDataView](#module_contracts..ContractDataView)
        * [new ContractDataView()](#new_module_contracts..ContractDataView_new)
        * [.getContract()](#module_contracts..ContractDataView+getContract) ⇒
        * [.countCodePages()](#module_contracts..ContractDataView+countCodePages) ⇒
        * [.getVariableAsString(index)](#module_contracts..ContractDataView+getVariableAsString) ⇒
        * [.getDataBlocksAsString(index, count)](#module_contracts..ContractDataView+getDataBlocksAsString) ⇒
        * [.getVariableAsDecimal(index)](#module_contracts..ContractDataView+getVariableAsDecimal) ⇒
        * [.getVariable(index)](#module_contracts..ContractDataView+getVariable) ⇒
        * [.getHexDataAt(index, length)](#module_contracts..ContractDataView+getHexDataAt) ⇒

<a name="module_contracts..ContractDataView"></a>

### contracts~ContractDataView
**Kind**: inner class of [<code>contracts</code>](#module_contracts)  

* [~ContractDataView](#module_contracts..ContractDataView)
    * [new ContractDataView()](#new_module_contracts..ContractDataView_new)
    * [.getContract()](#module_contracts..ContractDataView+getContract) ⇒
    * [.countCodePages()](#module_contracts..ContractDataView+countCodePages) ⇒
    * [.getVariableAsString(index)](#module_contracts..ContractDataView+getVariableAsString) ⇒
    * [.getDataBlocksAsString(index, count)](#module_contracts..ContractDataView+getDataBlocksAsString) ⇒
    * [.getVariableAsDecimal(index)](#module_contracts..ContractDataView+getVariableAsDecimal) ⇒
    * [.getVariable(index)](#module_contracts..ContractDataView+getVariable) ⇒
    * [.getHexDataAt(index, length)](#module_contracts..ContractDataView+getHexDataAt) ⇒

<a name="new_module_contracts..ContractDataView_new"></a>

#### new ContractDataView()
<p>The length of a contracts variable (considering Hex notation)</p>

<a name="module_contracts..ContractDataView+getContract"></a>

#### contractDataView.getContract() ⇒
**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>Get the contract</p>  
<a name="module_contracts..ContractDataView+countCodePages"></a>

#### contractDataView.countCodePages() ⇒
**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The number of code pages</p>  
<a name="module_contracts..ContractDataView+getVariableAsString"></a>

#### contractDataView.getVariableAsString(index) ⇒
<p>Get a variable as string</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as string (Utf-8)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="module_contracts..ContractDataView+getDataBlocksAsString"></a>

#### contractDataView.getDataBlocksAsString(index, count) ⇒
<p>Get multiple data blocks as string</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as string (Utf-8)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |
| count | <p>Number of blocks</p> |

<a name="module_contracts..ContractDataView+getVariableAsDecimal"></a>

#### contractDataView.getVariableAsDecimal(index) ⇒
<p>Get a variable as decimal (string)</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as a decimal string sequence</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="module_contracts..ContractDataView+getVariable"></a>

#### contractDataView.getVariable(index) ⇒
<p>Get a variable at given position/index</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as hexadecimal string (in little endianness)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="module_contracts..ContractDataView+getHexDataAt"></a>

#### contractDataView.getHexDataAt(index, length) ⇒
<p>Get a hexadecimal data block of arbitrary length at given position/index</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as hexadecimal string (in little endianness)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |
| length | <p>The length of the data block (must be a multiple of 2)</p> |

<a name="module_contracts"></a>

## contracts ⇒
<p>Calculates the minimum creation fee of the contract</p>

**Returns**: <p>The minimum fee</p>  

| Param | Description |
| --- | --- |
| hexCode | <p>The contracts code in hex form</p> |
| isCIP20active | <p>If is true, the fee calculation for active CIP20 is applied (lowered fees), otherwise the legacy calculation (BRS &lt;V2.5) is applied</p> |


* [contracts](#module_contracts) ⇒
    * [~ContractDataView](#module_contracts..ContractDataView)
        * [new ContractDataView()](#new_module_contracts..ContractDataView_new)
        * [.getContract()](#module_contracts..ContractDataView+getContract) ⇒
        * [.countCodePages()](#module_contracts..ContractDataView+countCodePages) ⇒
        * [.getVariableAsString(index)](#module_contracts..ContractDataView+getVariableAsString) ⇒
        * [.getDataBlocksAsString(index, count)](#module_contracts..ContractDataView+getDataBlocksAsString) ⇒
        * [.getVariableAsDecimal(index)](#module_contracts..ContractDataView+getVariableAsDecimal) ⇒
        * [.getVariable(index)](#module_contracts..ContractDataView+getVariable) ⇒
        * [.getHexDataAt(index, length)](#module_contracts..ContractDataView+getHexDataAt) ⇒

<a name="module_contracts..ContractDataView"></a>

### contracts~ContractDataView
**Kind**: inner class of [<code>contracts</code>](#module_contracts)  

* [~ContractDataView](#module_contracts..ContractDataView)
    * [new ContractDataView()](#new_module_contracts..ContractDataView_new)
    * [.getContract()](#module_contracts..ContractDataView+getContract) ⇒
    * [.countCodePages()](#module_contracts..ContractDataView+countCodePages) ⇒
    * [.getVariableAsString(index)](#module_contracts..ContractDataView+getVariableAsString) ⇒
    * [.getDataBlocksAsString(index, count)](#module_contracts..ContractDataView+getDataBlocksAsString) ⇒
    * [.getVariableAsDecimal(index)](#module_contracts..ContractDataView+getVariableAsDecimal) ⇒
    * [.getVariable(index)](#module_contracts..ContractDataView+getVariable) ⇒
    * [.getHexDataAt(index, length)](#module_contracts..ContractDataView+getHexDataAt) ⇒

<a name="new_module_contracts..ContractDataView_new"></a>

#### new ContractDataView()
<p>The length of a contracts variable (considering Hex notation)</p>

<a name="module_contracts..ContractDataView+getContract"></a>

#### contractDataView.getContract() ⇒
**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>Get the contract</p>  
<a name="module_contracts..ContractDataView+countCodePages"></a>

#### contractDataView.countCodePages() ⇒
**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The number of code pages</p>  
<a name="module_contracts..ContractDataView+getVariableAsString"></a>

#### contractDataView.getVariableAsString(index) ⇒
<p>Get a variable as string</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as string (Utf-8)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="module_contracts..ContractDataView+getDataBlocksAsString"></a>

#### contractDataView.getDataBlocksAsString(index, count) ⇒
<p>Get multiple data blocks as string</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as string (Utf-8)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |
| count | <p>Number of blocks</p> |

<a name="module_contracts..ContractDataView+getVariableAsDecimal"></a>

#### contractDataView.getVariableAsDecimal(index) ⇒
<p>Get a variable as decimal (string)</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as a decimal string sequence</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="module_contracts..ContractDataView+getVariable"></a>

#### contractDataView.getVariable(index) ⇒
<p>Get a variable at given position/index</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as hexadecimal string (in little endianness)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="module_contracts..ContractDataView+getHexDataAt"></a>

#### contractDataView.getHexDataAt(index, length) ⇒
<p>Get a hexadecimal data block of arbitrary length at given position/index</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as hexadecimal string (in little endianness)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |
| length | <p>The length of the data block (must be a multiple of 2)</p> |

<a name="module_contracts"></a>

## contracts
**Internal**: Size of Code Pages in bytes  

* [contracts](#module_contracts)
    * [~ContractDataView](#module_contracts..ContractDataView)
        * [new ContractDataView()](#new_module_contracts..ContractDataView_new)
        * [.getContract()](#module_contracts..ContractDataView+getContract) ⇒
        * [.countCodePages()](#module_contracts..ContractDataView+countCodePages) ⇒
        * [.getVariableAsString(index)](#module_contracts..ContractDataView+getVariableAsString) ⇒
        * [.getDataBlocksAsString(index, count)](#module_contracts..ContractDataView+getDataBlocksAsString) ⇒
        * [.getVariableAsDecimal(index)](#module_contracts..ContractDataView+getVariableAsDecimal) ⇒
        * [.getVariable(index)](#module_contracts..ContractDataView+getVariable) ⇒
        * [.getHexDataAt(index, length)](#module_contracts..ContractDataView+getHexDataAt) ⇒

<a name="module_contracts..ContractDataView"></a>

### contracts~ContractDataView
**Kind**: inner class of [<code>contracts</code>](#module_contracts)  

* [~ContractDataView](#module_contracts..ContractDataView)
    * [new ContractDataView()](#new_module_contracts..ContractDataView_new)
    * [.getContract()](#module_contracts..ContractDataView+getContract) ⇒
    * [.countCodePages()](#module_contracts..ContractDataView+countCodePages) ⇒
    * [.getVariableAsString(index)](#module_contracts..ContractDataView+getVariableAsString) ⇒
    * [.getDataBlocksAsString(index, count)](#module_contracts..ContractDataView+getDataBlocksAsString) ⇒
    * [.getVariableAsDecimal(index)](#module_contracts..ContractDataView+getVariableAsDecimal) ⇒
    * [.getVariable(index)](#module_contracts..ContractDataView+getVariable) ⇒
    * [.getHexDataAt(index, length)](#module_contracts..ContractDataView+getHexDataAt) ⇒

<a name="new_module_contracts..ContractDataView_new"></a>

#### new ContractDataView()
<p>The length of a contracts variable (considering Hex notation)</p>

<a name="module_contracts..ContractDataView+getContract"></a>

#### contractDataView.getContract() ⇒
**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>Get the contract</p>  
<a name="module_contracts..ContractDataView+countCodePages"></a>

#### contractDataView.countCodePages() ⇒
**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The number of code pages</p>  
<a name="module_contracts..ContractDataView+getVariableAsString"></a>

#### contractDataView.getVariableAsString(index) ⇒
<p>Get a variable as string</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as string (Utf-8)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="module_contracts..ContractDataView+getDataBlocksAsString"></a>

#### contractDataView.getDataBlocksAsString(index, count) ⇒
<p>Get multiple data blocks as string</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as string (Utf-8)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |
| count | <p>Number of blocks</p> |

<a name="module_contracts..ContractDataView+getVariableAsDecimal"></a>

#### contractDataView.getVariableAsDecimal(index) ⇒
<p>Get a variable as decimal (string)</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as a decimal string sequence</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="module_contracts..ContractDataView+getVariable"></a>

#### contractDataView.getVariable(index) ⇒
<p>Get a variable at given position/index</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as hexadecimal string (in little endianness)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="module_contracts..ContractDataView+getHexDataAt"></a>

#### contractDataView.getHexDataAt(index, length) ⇒
<p>Get a hexadecimal data block of arbitrary length at given position/index</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as hexadecimal string (in little endianness)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |
| length | <p>The length of the data block (must be a multiple of 2)</p> |

<a name="module_contracts"></a>

## contracts ⇒
<p>Counts the code pages for given machine code</p>

**Returns**: <p>The number of code pages for the passed code</p>  

| Param | Description |
| --- | --- |
| hexCode | <p>The contracts code in hex form</p> |


* [contracts](#module_contracts) ⇒
    * [~ContractDataView](#module_contracts..ContractDataView)
        * [new ContractDataView()](#new_module_contracts..ContractDataView_new)
        * [.getContract()](#module_contracts..ContractDataView+getContract) ⇒
        * [.countCodePages()](#module_contracts..ContractDataView+countCodePages) ⇒
        * [.getVariableAsString(index)](#module_contracts..ContractDataView+getVariableAsString) ⇒
        * [.getDataBlocksAsString(index, count)](#module_contracts..ContractDataView+getDataBlocksAsString) ⇒
        * [.getVariableAsDecimal(index)](#module_contracts..ContractDataView+getVariableAsDecimal) ⇒
        * [.getVariable(index)](#module_contracts..ContractDataView+getVariable) ⇒
        * [.getHexDataAt(index, length)](#module_contracts..ContractDataView+getHexDataAt) ⇒

<a name="module_contracts..ContractDataView"></a>

### contracts~ContractDataView
**Kind**: inner class of [<code>contracts</code>](#module_contracts)  

* [~ContractDataView](#module_contracts..ContractDataView)
    * [new ContractDataView()](#new_module_contracts..ContractDataView_new)
    * [.getContract()](#module_contracts..ContractDataView+getContract) ⇒
    * [.countCodePages()](#module_contracts..ContractDataView+countCodePages) ⇒
    * [.getVariableAsString(index)](#module_contracts..ContractDataView+getVariableAsString) ⇒
    * [.getDataBlocksAsString(index, count)](#module_contracts..ContractDataView+getDataBlocksAsString) ⇒
    * [.getVariableAsDecimal(index)](#module_contracts..ContractDataView+getVariableAsDecimal) ⇒
    * [.getVariable(index)](#module_contracts..ContractDataView+getVariable) ⇒
    * [.getHexDataAt(index, length)](#module_contracts..ContractDataView+getHexDataAt) ⇒

<a name="new_module_contracts..ContractDataView_new"></a>

#### new ContractDataView()
<p>The length of a contracts variable (considering Hex notation)</p>

<a name="module_contracts..ContractDataView+getContract"></a>

#### contractDataView.getContract() ⇒
**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>Get the contract</p>  
<a name="module_contracts..ContractDataView+countCodePages"></a>

#### contractDataView.countCodePages() ⇒
**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The number of code pages</p>  
<a name="module_contracts..ContractDataView+getVariableAsString"></a>

#### contractDataView.getVariableAsString(index) ⇒
<p>Get a variable as string</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as string (Utf-8)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="module_contracts..ContractDataView+getDataBlocksAsString"></a>

#### contractDataView.getDataBlocksAsString(index, count) ⇒
<p>Get multiple data blocks as string</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as string (Utf-8)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |
| count | <p>Number of blocks</p> |

<a name="module_contracts..ContractDataView+getVariableAsDecimal"></a>

#### contractDataView.getVariableAsDecimal(index) ⇒
<p>Get a variable as decimal (string)</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as a decimal string sequence</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="module_contracts..ContractDataView+getVariable"></a>

#### contractDataView.getVariable(index) ⇒
<p>Get a variable at given position/index</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as hexadecimal string (in little endianness)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="module_contracts..ContractDataView+getHexDataAt"></a>

#### contractDataView.getHexDataAt(index, length) ⇒
<p>Get a hexadecimal data block of arbitrary length at given position/index</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as hexadecimal string (in little endianness)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |
| length | <p>The length of the data block (must be a multiple of 2)</p> |

<a name="module_contracts"></a>

## contracts ⇒
<p>Generates a method call message of a contracts public method. The message can be sent using for example
[[MessageApi.sendMessage]] with <code>messageIsText = false</code> or [[ContractApi.callContractMethod]]]</p>

**Returns**: <p>A hex string that can be used as contracts transaction message</p>  

| Param | Description |
| --- | --- |
| args | <p>The argument object</p> |


* [contracts](#module_contracts) ⇒
    * [~ContractDataView](#module_contracts..ContractDataView)
        * [new ContractDataView()](#new_module_contracts..ContractDataView_new)
        * [.getContract()](#module_contracts..ContractDataView+getContract) ⇒
        * [.countCodePages()](#module_contracts..ContractDataView+countCodePages) ⇒
        * [.getVariableAsString(index)](#module_contracts..ContractDataView+getVariableAsString) ⇒
        * [.getDataBlocksAsString(index, count)](#module_contracts..ContractDataView+getDataBlocksAsString) ⇒
        * [.getVariableAsDecimal(index)](#module_contracts..ContractDataView+getVariableAsDecimal) ⇒
        * [.getVariable(index)](#module_contracts..ContractDataView+getVariable) ⇒
        * [.getHexDataAt(index, length)](#module_contracts..ContractDataView+getHexDataAt) ⇒

<a name="module_contracts..ContractDataView"></a>

### contracts~ContractDataView
**Kind**: inner class of [<code>contracts</code>](#module_contracts)  

* [~ContractDataView](#module_contracts..ContractDataView)
    * [new ContractDataView()](#new_module_contracts..ContractDataView_new)
    * [.getContract()](#module_contracts..ContractDataView+getContract) ⇒
    * [.countCodePages()](#module_contracts..ContractDataView+countCodePages) ⇒
    * [.getVariableAsString(index)](#module_contracts..ContractDataView+getVariableAsString) ⇒
    * [.getDataBlocksAsString(index, count)](#module_contracts..ContractDataView+getDataBlocksAsString) ⇒
    * [.getVariableAsDecimal(index)](#module_contracts..ContractDataView+getVariableAsDecimal) ⇒
    * [.getVariable(index)](#module_contracts..ContractDataView+getVariable) ⇒
    * [.getHexDataAt(index, length)](#module_contracts..ContractDataView+getHexDataAt) ⇒

<a name="new_module_contracts..ContractDataView_new"></a>

#### new ContractDataView()
<p>The length of a contracts variable (considering Hex notation)</p>

<a name="module_contracts..ContractDataView+getContract"></a>

#### contractDataView.getContract() ⇒
**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>Get the contract</p>  
<a name="module_contracts..ContractDataView+countCodePages"></a>

#### contractDataView.countCodePages() ⇒
**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The number of code pages</p>  
<a name="module_contracts..ContractDataView+getVariableAsString"></a>

#### contractDataView.getVariableAsString(index) ⇒
<p>Get a variable as string</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as string (Utf-8)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="module_contracts..ContractDataView+getDataBlocksAsString"></a>

#### contractDataView.getDataBlocksAsString(index, count) ⇒
<p>Get multiple data blocks as string</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as string (Utf-8)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |
| count | <p>Number of blocks</p> |

<a name="module_contracts..ContractDataView+getVariableAsDecimal"></a>

#### contractDataView.getVariableAsDecimal(index) ⇒
<p>Get a variable as decimal (string)</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as a decimal string sequence</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="module_contracts..ContractDataView+getVariable"></a>

#### contractDataView.getVariable(index) ⇒
<p>Get a variable at given position/index</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as hexadecimal string (in little endianness)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="module_contracts..ContractDataView+getHexDataAt"></a>

#### contractDataView.getHexDataAt(index, length) ⇒
<p>Get a hexadecimal data block of arbitrary length at given position/index</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as hexadecimal string (in little endianness)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |
| length | <p>The length of the data block (must be a multiple of 2)</p> |

<a name="module_contracts"></a>

## contracts ⇒
<p>Extracts a variables value as hexadecimal string from a contract's machine data</p>
<p>This is a generic function to extract arbitrary data from a contract. It's recommended to use the [[ContractDataView]] class instead</p>

**Returns**: <p>The value as hexadecimal string (already considering endianness)</p>  

| Param | Description |
| --- | --- |
| contract | <p>The contract</p> |
| position | <p>The variables position</p> |
| length | <p>The length of data to be extracted</p> |


* [contracts](#module_contracts) ⇒
    * [~ContractDataView](#module_contracts..ContractDataView)
        * [new ContractDataView()](#new_module_contracts..ContractDataView_new)
        * [.getContract()](#module_contracts..ContractDataView+getContract) ⇒
        * [.countCodePages()](#module_contracts..ContractDataView+countCodePages) ⇒
        * [.getVariableAsString(index)](#module_contracts..ContractDataView+getVariableAsString) ⇒
        * [.getDataBlocksAsString(index, count)](#module_contracts..ContractDataView+getDataBlocksAsString) ⇒
        * [.getVariableAsDecimal(index)](#module_contracts..ContractDataView+getVariableAsDecimal) ⇒
        * [.getVariable(index)](#module_contracts..ContractDataView+getVariable) ⇒
        * [.getHexDataAt(index, length)](#module_contracts..ContractDataView+getHexDataAt) ⇒

<a name="module_contracts..ContractDataView"></a>

### contracts~ContractDataView
**Kind**: inner class of [<code>contracts</code>](#module_contracts)  

* [~ContractDataView](#module_contracts..ContractDataView)
    * [new ContractDataView()](#new_module_contracts..ContractDataView_new)
    * [.getContract()](#module_contracts..ContractDataView+getContract) ⇒
    * [.countCodePages()](#module_contracts..ContractDataView+countCodePages) ⇒
    * [.getVariableAsString(index)](#module_contracts..ContractDataView+getVariableAsString) ⇒
    * [.getDataBlocksAsString(index, count)](#module_contracts..ContractDataView+getDataBlocksAsString) ⇒
    * [.getVariableAsDecimal(index)](#module_contracts..ContractDataView+getVariableAsDecimal) ⇒
    * [.getVariable(index)](#module_contracts..ContractDataView+getVariable) ⇒
    * [.getHexDataAt(index, length)](#module_contracts..ContractDataView+getHexDataAt) ⇒

<a name="new_module_contracts..ContractDataView_new"></a>

#### new ContractDataView()
<p>The length of a contracts variable (considering Hex notation)</p>

<a name="module_contracts..ContractDataView+getContract"></a>

#### contractDataView.getContract() ⇒
**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>Get the contract</p>  
<a name="module_contracts..ContractDataView+countCodePages"></a>

#### contractDataView.countCodePages() ⇒
**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The number of code pages</p>  
<a name="module_contracts..ContractDataView+getVariableAsString"></a>

#### contractDataView.getVariableAsString(index) ⇒
<p>Get a variable as string</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as string (Utf-8)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="module_contracts..ContractDataView+getDataBlocksAsString"></a>

#### contractDataView.getDataBlocksAsString(index, count) ⇒
<p>Get multiple data blocks as string</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as string (Utf-8)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |
| count | <p>Number of blocks</p> |

<a name="module_contracts..ContractDataView+getVariableAsDecimal"></a>

#### contractDataView.getVariableAsDecimal(index) ⇒
<p>Get a variable as decimal (string)</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as a decimal string sequence</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="module_contracts..ContractDataView+getVariable"></a>

#### contractDataView.getVariable(index) ⇒
<p>Get a variable at given position/index</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as hexadecimal string (in little endianness)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |

<a name="module_contracts..ContractDataView+getHexDataAt"></a>

#### contractDataView.getHexDataAt(index, length) ⇒
<p>Get a hexadecimal data block of arbitrary length at given position/index</p>

**Kind**: instance method of [<code>ContractDataView</code>](#module_contracts..ContractDataView)  
**Returns**: <p>The data as hexadecimal string (in little endianness)</p>  

| Param | Description |
| --- | --- |
| index | <p>The index of variable (starting at 0)</p> |
| length | <p>The length of the data block (must be a multiple of 2)</p> |

<a name="convertArgument"></a>

## convertArgument(value)
**Kind**: global function  
**Internal**:   

| Param |
| --- |
| value | 

