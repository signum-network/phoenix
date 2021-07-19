# @signumjs/http

Generic HTTP client that is used as a network provider for @signumjs/core.

## Installation

`@signumjs/http` can be used with NodeJS or Web. Two formats are available

### Using with NodeJS and/or modern web frameworks

Install using [npm](https://www.npmjs.org/):

```
npm install @signumjs/http
```

or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @signumjs/http
```

#### Example

```js
import {HttpImpl} from '@signumjs/http'

async function getTodos() {
    try{
        const client = new HttpClientFactory.createHttpClient('https://jsonplaceholder.typicode.com/');
        const result = await client.get('/todos/1')
        console.log(result)
    }
    catch(httpError){
        console.error(httpError.message)
    }
}
```

### Using in classic `<script>`

Each package is available as bundled standalone library using UMD.
This way _signumJS_ can be used also within `<script>`-Tags.
This might be useful for Wordpress and/or other PHP applications.

Just import the package using the HTML `<script>` tag.

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/http/dist/signumjs.http.min.js'></script>`

#### Example

```js
const {HttpClientFactory} = sig$http
const client = new HttpClientFactory.createHttpClient('https://jsonplaceholder.typicode.com/');
client.get('/todos/1').then(console.log)
```

See more here:

[@signumjs/http Online Documentation](https://burst-apps-team.github.io/phoenix/modules/http.html)
