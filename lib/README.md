<img src="../assets/burstjs.png" alt="burstjs" width="600" align="middle" />

> The Signum Network Type/Javascript Reference Library

![npm](https://img.shields.io/npm/v/@signumjs/core.svg?style=flat)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/81a6119af03d4a7e8a55c65999884709)](https://www.codacy.com/app/ohager/phoenix?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=burst-apps-team/phoenix&amp;utm_campaign=Badge_Grade)
[![Build](https://github.com/burst-apps-team/phoenix/workflows/Build%20SignumJS/badge.svg)](https://github.com/burst-apps-team/phoenix/actions?query=workflow%3A%22Build+BurstJS%22)
[![Known Vulnerabilities](https://snyk.io/test/github/burst-apps-team/phoenix/badge.svg?targetFile=lib%2Fpackage.json)](https://snyk.io/test/github/burst-apps-team/phoenix?targetFile=lib%2Fpackage.json)
[![codecov](https://codecov.io/gh/burst-apps-team/phoenix/branch/develop/graph/badge.svg)](https://codecov.io/gh/burst-apps-team/phoenix)
[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/@signumjs/core/badge)](https://www.jsdelivr.com/package/npm/@signumjs/core)

`@signumjs` is a modern library written in Typescript providing common functionalities for _browsers_ and _nodejs_ to interact with the [Signum Network blockchain](https://signum.network/), 
an advanced community-driven blockchain technology.

## Packages

The library is separated in the following packages

- [@signumjs/core](./modules/core.html) The main package providing an extense API for blockchain interaction
- [@signumjs/contracts](./modules/contracts.html) A package providing Signum relevant functions for _smart contracts_
- [@signumjs/crypto](./modules/crypto.html) A package providing Signum relevant crypto functions
- [@signumjs/util](./modules/util.html) A package providing useful functions, e.g. common conversion functions 
- [@signumjs/http](./modules/http.html) A package providing a _simplified_ Http layer, with consistent response types, and exception handling
- [@signumjs/monitor](./modules/monitor.html) A package providing a class to execute recurring async operations with de/serialization feature, good for listening to blockchain transactions 


## Installation

`@signumjs` aims modern browsers and nodejs > v10, but can also be used as bundled JavaScript using `<script>` 

### Using with NodeJS and/or modern web frameworks

Install using [npm](https://www.npmjs.org/):

```
npm install @signumjs/core
npm install @signumjs/contracts (optional)
npm install @signumjs/crypto (optional)
npm install @signumjs/util (optional)
npm install @signumjs/http (optional)
```


or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @signumjs/core
yarn add @signumjs/contracts (optional)
yarn add @signumjs/crypto (optional)
yarn add @signumjs/util (optional)
yarn add @signumjs/http (optional)
```

> Usually, you won't need to install other packages than `@signumjs/core`, which uses the other packages.

### Using in classic `<script>`

Each package is available as bundled standalone library using UMD. 
This way _SignumJS_ can be used also within `<script>`-Tags. 
This might be useful for Wordpress and/or other PHP applications.

Just import one of the packages using the HTML `<script>` tag.

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/core/dist/signumjs.min.js'></script>`

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/contracts/dist/signumjs.contracts.min.js'></script>`

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/crypto/dist/signumjs.crypto.min.js'></script>`

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/http/dist/signumjs.http.min.js'></script>`

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/util/dist/signumjs.util.min.js'></script>`

Due to the way a package is imported following global variables are provided


| Package | Variable |
|---------|----------|
|  core   |`sig$`      |
|  contracts |`sig$contracts`|
|  crypto |`sig$crypto`|
|  http   |`sig$http`  |
|  monitor   |`sig$monitor`  |
|  util   |`sig$util`  |

Examples:

```js
// using core
const api = sig$.composeApi({
  nodeHost: "http://testnet.signum.network",
});

api.network.getBlockchainStatus().then(console.log);
```

```js
// using contracts
const dataView = new sig$contracts.ContractDataView(contract)
console.log(dataView.getVariable(2))
```

```js
// using crypto
console.log(sig$crypto.hashSHA256("test"))
```

```js
// using util
const value = sig$util.Value.fromSigna("1000")
```

```js
// using http
const client = new sig$http.HttpClientFactory.createHttpClient('https://jsonplaceholder.typicode.com/');
client.get('/todos/1').then(console.log)
```

```js
 // using monitor
 
 // A method that checks if an account exists
 // > IMPORTANT: Do not use closures, when you need to serialize the monitor
 async function tryFetchAccount() {
     const Api = composeApi({nodeHost: 'https://testnet.signum.network:6876/'})
     try {
         const {account} = await Api.account.getAccount('1234')
         return account;
     } catch (e) {
         // ignore error
         return null;
     }
 }
 
 // A comparing function to check if a certain condition for the returned data from fetch function
 // is true. If it's true the monitor stops
 function checkIfAccountExists(account) {
     return account !== null;
 }
 
 // Create your monitor
 const monitor = new Monitor < Account > ({
     asyncFetcherFn: tryFetchAccount,
     compareFn: checkIfAccountExists,
     intervalSecs: 10, // polling interval in seconds
     key: 'monitor-account',
     timeoutSecs: 2 * 240 // when reached timeout the monitor stops
 })
 .onFulfilled(() => {
     // called when `checkIfAccountExists` returns true
     console.log('Yay, account active');
 })
 .onTimeout(() => {
     // called when `timeoutSecs` is reached
     console.log('Hmm, something went wrong');
 }).start();
```


## Usage

The following example shows how to interact with the blockchain, i.e. getting the balance of a specific account


### ES6/NodeJS style

In a separate file, preferably `index.js` or `main.js` write your entry point like this:

```js
import {composeApi, ApiSettings} from '@signumjs/core'
import {convertNQTStringToNumber} from '@signumjs/util'

const apiSettings = new ApiSettings('http://at-testnet.burst-alliance.org:6876', 'burst');
const api = composeApi(apiSettings);

// this self-executing file makes turns this file into a starting point of your app

(async () => {
  try{
    const {balanceNQT} = await api.account.getAccountBalance('13036514135565182944')
    console.log(`Account Balance: ${Value.fromPlanck(balanceNQT).toString()}`)  
  }
  catch(e){ // e is of type HttpError (as part of @signumjs/http)
    console.error(`Whooops, something went wrong: ${e.message}`)      
  }
})()

```

### `<script>` style

```js
const apiSettings = new sig$.ApiSettings('http://at-testnet.burst-alliance.org:6876', 'burst');
const api = sig$.composeApi(apiSettings);


api.account.getAccountBalance('13036514135565182944')
    .then( balance => {
        console.log(`Account Balance: ${sig$util.Value.fromPlanck(balance.balanceNQT).toString()}`)  
    
    })
    .catch(e => { // e is of type HttpError (as part of @signumjs/http)
        console.error(`Whooops, something went wrong: ${e.message}`)      
    })

```

## Development

When contributing to the Phoenix wallet and updates in SignumJS are necessary, simply do

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

- [SignumJS Online Documentation](https://burst-apps-team.github.io/phoenix/)
- To generate esdocs: `npm run doc`
- To update the README.md files: `lerna run readme`
