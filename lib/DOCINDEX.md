# @burstjs

> The BurstCoin Type/Javascript Reference Library

---
![npm](https://img.shields.io/npm/v/@burstjs/core.svg?style=flat)
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

> Usually, you won't need to install other packages than `@burstjs/core`, which uses the other packages.

```
npm install @burstjs/core
npm install @burstjs/crypto
npm install @burstjs/util
npm install @burstjs/http
```

## Usage

The following example shows how to interact with the blockchain, i.e. getting the balance of a specific account

```js
import {composeApi} from '@burstjs/core'
import {convertNQTStringToNumber} from '@burstjs/util'

const api = composeApi({
    nodeHost: 'https://wallet1.burst-team.us:2083', // one of the mainnet nodes
    apiRootUrl: '/burst' // endpoint to the BURST API
})

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




