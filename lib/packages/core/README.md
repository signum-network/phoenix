# @signumjs/core

Core module to build cool apps for the Signum blockchain platform 

## Installation

SignumJS can be used with NodeJS or Web. Two formats are available

### Using with NodeJS and/or modern web frameworks

Install using [npm](https://www.npmjs.org/):

```
npm install @signumjs/core
```

or using [yarn](https://yarnpkg.com/):

```
yarn add @signumjs/core
```

#### Example

```js
import {composeApi, ApiSettings} from '@signumjs/core'
import {Amount} from '@signumjs/util'

const apiSettings = new ApiSettings('https://testnet.signum.network:6876');
const api = composeApi(apiSettings);

// this self-executing file makes turns this file into a starting point of your app

(async () => {
    try{
        const {balanceNQT} = await api.account.getAccountBalance('13036514135565182944')
        console.log(`Account Balance: ${Amount.fromPlanck(balanceNQT).toString()}`)
    }
        catch(e){ // e is of type HttpError (as part of @signumjs/http)
        console.error(`Whooops, something went wrong: ${e.message}`)
    }
})()
```


### Using in classic `<script>`

Each package is available as bundled standalone library using IIFE.
This way _burstJS_ can be used also within `<script>`-Tags.
This might be useful for Wordpress and/or other PHP applications.

Just import the package using the HTML `<script>` tag.

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/core/dist/signumjs.min.js'></script>`


#### Example

```js
(function(){
    const api = sig$.composeApi({nodeHost: "https://testnet.burstcoin.network:6876"});
    api.network.getBlockchainStatus().then(console.log).catch(console.error);
})()
```


See more here:

[@signumjs/core Online Documentation](https://burst-apps-team.github.io/phoenix/modules/core.html)
