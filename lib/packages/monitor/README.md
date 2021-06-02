# @signumjs/monitor

A monitor to watch for specific changes on the Burst blockchain

Due to average blocktime of 240 seconds, transactions stay pending for a certain time. It is a repeating pattern
to watch for such changes and waiting for confirmation. This package simplifies this task.

As additional feature, a monitor is serializable, that means it can be stored e restored.
This is especially useful for web applications, as it allows reloading pages without losing the ability
to check whether a transaction is still pending or already concluded.

## Installation

`@signumjs/monitor` can be used with NodeJS or Web. Two formats are available

### Using with NodeJS and/or modern web frameworks

Install using [npm](https://www.npmjs.org/):

```
npm install @signumjs/monitor
```

or using [yarn](https://yarnpkg.com/):

``` yarn
yarn add @signumjs/monitor
```

#### Example

```js
import {Monitor} from '@signumjs/monitor'
import {composeApi} from "@signumjs/core";

// A method that checks if an account exists
// > IMPORTANT: Do not use closures, when you need to serialize the monitor
async function tryFetchAccount() {
    const BurstApi = composeApi({ nodeHost: 'https://testnet.burstcoin.network:6876/'})
    try{
        const {account} = await BurstApi.account.getAccount('1234')
        return account;
    }catch (e){
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
const monitor = new Monitor({
    asyncFetcherFn: tryFetchAccount,
    compareFn: checkIfAccountExists,
    intervalSecs: 10, // polling interval in seconds
    key: 'monitor-account',
    timeoutSecs: 2 * 240 // when reached timeout the monitor stops
});
// starts monitor
monitor.start();

// called when `checkIfAccountExists` returns true
monitor.onFulfilled(() => {
    console.log('Yay, account active');
});

// called when `timeoutSecs` is reached
monitor.onTimeout(() => {
    console.log('Hmm, something went wrong');
});

```

### Using in classic `<script>`

Each package is available as bundled standalone library using IIFE.
This way _burstJS_ can be used also within `<script>`-Tags.
This might be useful for Wordpress and/or other PHP applications.

Just import the package using the HTML `<script>` tag.

`<script src='https://cdn.jsdelivr.net/npm/@signumjs/monitor/dist/burstjs.monitor.min.js'></script>`

#### Example

```js
const monitor = new b$monitor.Monitor({
    //...
});
monitor.start()
monitor.onFulFilled(() => {
    //...
})
```


## Monitor Serialization

TO DO

---
See more here:

[@signumjs/monitor Online Documentation](https://burst-apps-team.github.io/phoenix/modules/monitor.html)

---

## API Reference
<a name="module_monitor"></a>

## monitor
<p>The generic monitor class.</p>
<p>A monitor can be used to check periodically for a certain situation, e.g. confirmation of a transaction,
activation on an account, or even something completely different.</p>
<p>Example: (checking for the existence of an account aka account activation)</p>
<pre class="prettyprint source lang-ts"><code>// A method that checks if an account exists
// > IMPORTANT: Do not use closures, when you need to serialize the monitor
async function tryFetchAccount() {
   const BurstApi = composeApi({ nodeHost: 'https://testnet.burstcoin.network:6876/'})
   try{
       const {account} = await BurstApi.account.getAccount('1234')
       return account;
   }catch (e){
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
const monitor = new Monitor&lt;Account>({
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

</code></pre>


* [monitor](#module_monitor)
    * [~Monitor](#module_monitor..Monitor)
        * [new Monitor(args)](#new_module_monitor..Monitor_new)
        * _instance_
            * [.startTime](#module_monitor..Monitor+startTime)
            * [.intervalSecs](#module_monitor..Monitor+intervalSecs)
            * [.key](#module_monitor..Monitor+key)
            * [.timeoutSecs](#module_monitor..Monitor+timeoutSecs)
            * [.serialize()](#module_monitor..Monitor+serialize)
            * [.hasStarted()](#module_monitor..Monitor+hasStarted) ⇒
            * [.isExpired()](#module_monitor..Monitor+isExpired) ⇒
            * [.start()](#module_monitor..Monitor+start)
            * [.stop()](#module_monitor..Monitor+stop)
            * [.onTimeout(fn)](#module_monitor..Monitor+onTimeout)
            * [.onFulfilled(fn)](#module_monitor..Monitor+onFulfilled)
        * _static_
            * [.deserialize(serializedMonitor, autoStart)](#module_monitor..Monitor.deserialize) ⇒

<a name="module_monitor..Monitor"></a>

### monitor~Monitor
**Kind**: inner class of [<code>monitor</code>](#module_monitor)  

* [~Monitor](#module_monitor..Monitor)
    * [new Monitor(args)](#new_module_monitor..Monitor_new)
    * _instance_
        * [.startTime](#module_monitor..Monitor+startTime)
        * [.intervalSecs](#module_monitor..Monitor+intervalSecs)
        * [.key](#module_monitor..Monitor+key)
        * [.timeoutSecs](#module_monitor..Monitor+timeoutSecs)
        * [.serialize()](#module_monitor..Monitor+serialize)
        * [.hasStarted()](#module_monitor..Monitor+hasStarted) ⇒
        * [.isExpired()](#module_monitor..Monitor+isExpired) ⇒
        * [.start()](#module_monitor..Monitor+start)
        * [.stop()](#module_monitor..Monitor+stop)
        * [.onTimeout(fn)](#module_monitor..Monitor+onTimeout)
        * [.onFulfilled(fn)](#module_monitor..Monitor+onFulfilled)
    * _static_
        * [.deserialize(serializedMonitor, autoStart)](#module_monitor..Monitor.deserialize) ⇒

<a name="new_module_monitor..Monitor_new"></a>

#### new Monitor(args)
<p>The monitors constructor</p>


| Param | Description |
| --- | --- |
| args | <p>The arguments</p> |

<a name="module_monitor..Monitor+startTime"></a>

#### monitor.startTime
<p>The start timestamp if started, or -1</p>

**Kind**: instance property of [<code>Monitor</code>](#module_monitor..Monitor)  
<a name="module_monitor..Monitor+intervalSecs"></a>

#### monitor.intervalSecs
<p>The interval</p>

**Kind**: instance property of [<code>Monitor</code>](#module_monitor..Monitor)  
<a name="module_monitor..Monitor+key"></a>

#### monitor.key
<p>The key aka identifier</p>

**Kind**: instance property of [<code>Monitor</code>](#module_monitor..Monitor)  
<a name="module_monitor..Monitor+timeoutSecs"></a>

#### monitor.timeoutSecs
<p>The timeout</p>

**Kind**: instance property of [<code>Monitor</code>](#module_monitor..Monitor)  
<a name="module_monitor..Monitor+serialize"></a>

#### monitor.serialize()
<p>Serializes the monitor, such it can be stored.
This serializes also the <code>asyncFetcher</code> and <code>compareFn</code>
It is important that these functions are not closures, i.e. the must not reference
outer data/variables, otherwise the behavior on deserialization is not deterministic</p>

**Kind**: instance method of [<code>Monitor</code>](#module_monitor..Monitor)  
<a name="module_monitor..Monitor+hasStarted"></a>

#### monitor.hasStarted() ⇒
**Kind**: instance method of [<code>Monitor</code>](#module_monitor..Monitor)  
**Returns**: <p>true, if monitor was started and is running</p>  
<a name="module_monitor..Monitor+isExpired"></a>

#### monitor.isExpired() ⇒
**Kind**: instance method of [<code>Monitor</code>](#module_monitor..Monitor)  
**Returns**: <p>true, if a started monitor timed out.</p>  
<a name="module_monitor..Monitor+start"></a>

#### monitor.start()
<p>Starts the monitor</p>

**Kind**: instance method of [<code>Monitor</code>](#module_monitor..Monitor)  
<a name="module_monitor..Monitor+stop"></a>

#### monitor.stop()
<p>Stops the monitor</p>

**Kind**: instance method of [<code>Monitor</code>](#module_monitor..Monitor)  
<a name="module_monitor..Monitor+onTimeout"></a>

#### monitor.onTimeout(fn)
<p>Callback function for timeout event. You can add multiple event listener if you want</p>

**Kind**: instance method of [<code>Monitor</code>](#module_monitor..Monitor)  

| Param | Description |
| --- | --- |
| fn | <p>The callback</p> |

<a name="module_monitor..Monitor+onFulfilled"></a>

#### monitor.onFulfilled(fn)
<p>Callback function for fulfilled event. You can add multiple event listener if you want</p>

**Kind**: instance method of [<code>Monitor</code>](#module_monitor..Monitor)  

| Param | Description |
| --- | --- |
| fn | <p>The callback</p> |

<a name="module_monitor..Monitor.deserialize"></a>

#### Monitor.deserialize(serializedMonitor, autoStart) ⇒
<p>Deserializes a serialized monitor</p>

**Kind**: static method of [<code>Monitor</code>](#module_monitor..Monitor)  
**Returns**: <p>The monitor instance</p>  
**See**: <p>[[Monitor.serialize]]</p>  

| Param | Default | Description |
| --- | --- | --- |
| serializedMonitor |  | <p>The serialized monitor</p> |
| autoStart | <code>true</code> | <p>If monitor was started on serialization the monitor starts automatically, if set true (default)</p> |

