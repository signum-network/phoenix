<img src="./assets/images/burstjs.png" alt="burstjs" width="600" align="middle" />

> The BurstCoin Type/Javascript Reference Library

---
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/81a6119af03d4a7e8a55c65999884709)](https://www.codacy.com/app/ohager/phoenix?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=burst-apps-team/phoenix&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/burst-apps-team/phoenix.svg?branch=develop)](https://travis-ci.org/burst-apps-team/phoenix) 
[![Known Vulnerabilities](https://snyk.io/test/github/burst-apps-team/phoenix/badge.svg?targetFile=lib%2Fpackage.json)](https://snyk.io/test/github/burst-apps-team/phoenix?targetFile=lib%2Fpackage.json)
[![codecov](https://codecov.io/gh/burst-apps-team/phoenix/branch/develop/graph/badge.svg)](https://codecov.io/gh/burst-apps-team/phoenix)
---

`@burstjs` is a modern library written in Typescript providing common functionalities for _browsers_ and _nodejs_ to interact with the [BurstCoin blockchain](https://burstcoin.community/), 
an advanced community-driven blockchain technology.

This library is part of the Phoenix project, i.e. the new Burstcoin Wallet for Web, Desktop, Android, and iOS.

## Packages

The library is separated in the following packages

- [@burstjs/core](./modules/core.html) The main package providing an extense API for blockchain interaction
- [@burstjs/crypto](./modules/crypto.html) A package providing BURST relevant crypto functions
- [@burstjs/util](./modules/util.html) A package providing useful functions, e.g. common conversion functions 
- [@burstjs/http](./modules/http.html) A package providing a _simplified_ Http layer, with consistent response types, and exception handling


## Installation

`@burstjs` aims modern browsers and nodejs > v10 


```
npm install @burstjs/core
npm install @burstjs/crypto
npm install @burstjs/util
npm install @burstjs/http
```
> Usually, you won't need to install other packages than `@burstjs/core`, which uses the other packages.

### Using with NodeJS and/or modern web frameworks

Install using [npm](https://www.npmjs.org/):

```
npm install @burstjs/core
```

or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @burstjs/core
```

### Using in classic `<script>`

Each package is available as bundled standalone library using IIFE. 
This way _burstJS_ can be used also within `<script>`-Tags. 
This might be useful for Wordpress and/or other PHP applications.

Due to the way a package is imported following global variables are provided


| Package | Variable |
|---------|----------|
|  core   |   `b$`   |
|  crypto |   `b$crypto`   |
|  http   |   `b$http`   |
|  util   |   `b$util`   |

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


## Usage

The following example shows how to interact with the blockchain, i.e. getting the balance of a specific account

```js
import {composeApi, ApiSettings} from '@burstjs/core'
import {convertNQTStringToNumber} from '@burstjs/util'

const apiSettings = new ApiSettings('https://wallet1.burst-team.us:2083', 'burst');
const api = composeApi(apiSettings);

(async () => {
  try{
    const balanceNQT = await api.account.getAccountBalance('5810532812037266198') // poloniex exchange account
    console.log(`Account Balance: ${convertNQTStringToNumber(balanceNQT)} BURST`)  
  }
  catch(e){ // e is of type HttpError (as part of @burstjs/http)
    console.error(`Whooops, something went wrong: ${e.message}`)      
  }
})()

```




