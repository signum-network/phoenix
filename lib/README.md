<img src="../assets/burstjs.png" alt="burstjs" width="600" align="middle" />

> The BurstCoin Type/Javascript Reference Library

![npm](https://img.shields.io/npm/v/@burstjs/core.svg?style=flat)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/81a6119af03d4a7e8a55c65999884709)](https://www.codacy.com/app/ohager/phoenix?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=burst-apps-team/phoenix&amp;utm_campaign=Badge_Grade)
[![Build BurstJS](https://github.com/burst-apps-team/phoenix/workflows/Build%20BurstJS/badge.svg)](https://github.com/burst-apps-team/phoenix/actions?query=workflow%3A%22Build+BurstJS%22)
[![Known Vulnerabilities](https://snyk.io/test/github/burst-apps-team/phoenix/badge.svg?targetFile=lib%2Fpackage.json)](https://snyk.io/test/github/burst-apps-team/phoenix?targetFile=lib%2Fpackage.json)
[![codecov](https://codecov.io/gh/burst-apps-team/phoenix/branch/develop/graph/badge.svg)](https://codecov.io/gh/burst-apps-team/phoenix)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@burstjs/core/badge)](https://www.jsdelivr.com/package/npm/@burstjs/core)

`@burstjs` is a modern library written in Typescript providing common functionalities for _browsers_ and _nodejs_ to interact with the [BurstCoin blockchain](https://burstcoin.community/), 
an advanced community-driven blockchain technology.

## Packages

The library is separated in the following packages

- [@burstjs/core](./modules/core.html) The main package providing an extense API for blockchain interaction
- [@burstjs/contracts](./modules/contracts.html) A package providing BURST relevant functions for _smart contracts_
- [@burstjs/crypto](./modules/crypto.html) A package providing BURST relevant crypto functions
- [@burstjs/util](./modules/util.html) A package providing useful functions, e.g. common conversion functions 
- [@burstjs/http](./modules/http.html) A package providing a _simplified_ Http layer, with consistent response types, and exception handling


## Installation

`@burstjs` aims modern browsers and nodejs > v10, but can also be used as bundled JavaScript using `<script>` 

### Using with NodeJS and/or modern web frameworks

Install using [npm](https://www.npmjs.org/):

```
npm install @burstjs/core
npm install @burstjs/contracts (optional)
npm install @burstjs/crypto (optional)
npm install @burstjs/util (optional)
npm install @burstjs/http (optional)
```


or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @burstjs/core
yarn add @burstjs/contracts (optional)
yarn add @burstjs/crypto (optional)
yarn add @burstjs/util (optional)
yarn add @burstjs/http (optional)
```

> Usually, you won't need to install other packages than `@burstjs/core`, which uses the other packages.

### Using in classic `<script>`

Each package is available as bundled standalone library using IIFE. 
This way _burstJS_ can be used also within `<script>`-Tags. 
This might be useful for Wordpress and/or other PHP applications.

Just import one of the packages using the HTML `<script>` tag.

`<script src='https://cdn.jsdelivr.net/npm/@burstjs/core/dist/burstjs.min.js'></script>`

`<script src='https://cdn.jsdelivr.net/npm/@burstjs/contracts/dist/burstjs.contracts.min.js'></script>`

`<script src='https://cdn.jsdelivr.net/npm/@burstjs/crypto/dist/burstjs.crypto.min.js'></script>`

`<script src='https://cdn.jsdelivr.net/npm/@burstjs/http/dist/burstjs.http.min.js'></script>`

`<script src='https://cdn.jsdelivr.net/npm/@burstjs/util/dist/burstjs.util.min.js'></script>`

Due to the way a package is imported following global variables are provided


| Package | Variable |
|---------|----------|
|  core   |`b$`      |
|  crypto |`b$contracts`|
|  crypto |`b$crypto`|
|  http   |`b$http`  |
|  util   |`b$util`  |

Examples:

```js
// using core
const api = b$.composeApi({
  nodeHost: "http://at-testnet.burst-alliance.org:6876",
  apiRootUrl: "/burst"
});

api.network.getBlockchainStatus().then(console.log);
```

```js
// using contracts
const dataView = new b$contracts.ContractDataView(contract)
console.log(dataView.getVariable(2))
```

```js
// using crypto
console.log(b$crypto.hashSHA256("test"))
```

```js
// using util
const value = b$util.convertNumberToNQTString(1000)
```

```js
// using http
const client = new b$http.HttpImpl('https://jsonplaceholder.typicode.com/');
client.get('/todos/1').then(console.log)
```


## Usage

The following example shows how to interact with the blockchain, i.e. getting the balance of a specific account


### ES6/NodeJS style

In a separate file, preferribly `index.js` or `main.js` write your entry point like this:

```js
import {composeApi, ApiSettings} from '@burstjs/core'
import {convertNQTStringToNumber} from '@burstjs/util'

const apiSettings = new ApiSettings('http://at-testnet.burst-alliance.org:6876', 'burst');
const api = composeApi(apiSettings);

// this self-executing file makes turns this file into a starting point of your app

(async () => {
  try{
    const {balanceNQT} = await api.account.getAccountBalance('13036514135565182944')
    console.log(`Account Balance: ${convertNQTStringToNumber(balanceNQT)} BURST`)  
  }
  catch(e){ // e is of type HttpError (as part of @burstjs/http)
    console.error(`Whooops, something went wrong: ${e.message}`)      
  }
})()

```

### `<script>` style

```js
const apiSettings = new b$.ApiSettings('http://at-testnet.burst-alliance.org:6876', 'burst');
const api = b$.composeApi(apiSettings);


api.account.getAccountBalance('13036514135565182944')
    .then( balance => {
        console.log(`Account Balance: ${b$util.convertNQTStringToNumber(balance.balanceNQT)} BURST`)  
    
    })
    .catch(e => { // e is of type HttpError (as part of @burstjs/http)
        console.error(`Whooops, something went wrong: ${e.message}`)      
    })

```

## Development

When contributing to the Phoenix wallet and updates in burstjs are necessary, simply do

```
npm install && npm run bootstrap
```

That's it!


## Running Tests

1. Single test run `npm run test`
2. Run in watch mode `npm run test:watch` 
3. Run end-to-end test `npm run test:e2e` 
| Keep in mind that these tests are slow as they run against true servers. And therefore, it cannot be guaranteed that all E2E tests always work

## Documentation

- [BurstJS Online Documentation](https://burst-apps-team.github.io/phoenix/)
- To generate esdocs: `npm run doc`
- To update the README.md files: `lerna run readme`
