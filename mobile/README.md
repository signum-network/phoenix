# Phoenix Mobile Wallet

The Signum Mobile wallet is a React Native application.

## Development

The setup for mobile development requires a lot of steps. Currently, we have tested support for
[Linux](./SETUP_LINUX.md) and [MacOS](<(./SETUP_MACOS.md)>)

> Windows development setup documentation is welcome

### Deeplink Testing (Android)

The mobile wallet supports same [deeplinking capabilities](../DEEPLINKING.md) like the desktop wallet

To test deeplinks you can go into the [tasks folder](./tasks) and calling:

- [createCIP22DeeplinkExamples.js](./tasks/createCIP22DeeplinkExamples.js) -[createLegacyDeeplinkExamples.js](./tasks/createLegacyDeeplinkExamples.js)

Example:

```bash
node createCIP22DeeplinkExamples.js
```

gives you:

```
Example A
=========
signum://v1?action=pay&payload=eyJyZWNpcGllbnQiOiJTLTlLOUwtNENCNS04OFk1LUY1RzRaIiwiYW1vdW50UGxhbmNrIjoxMDAwMDAwMCwiZmVlUGxhbmNrIjo3MzUwMDAsIm1lc3NhZ2UiOiJIaSwgZnJvbSBhIGRlZXAgbGluayIsIm1lc3NhZ2VJc1RleHQiOnRydWUsImltbXV0YWJsZSI6ZmFsc2UsImRlYWRsaW5lIjoyNCwiZW5jcnlwdCI6ZmFsc2V9

Bash Escaped
signum://v1?action=pay\&payload=eyJyZWNpcGllbnQiOiJTLTlLOUwtNENCNS04OFk1LUY1RzRaIiwiYW1vdW50UGxhbmNrIjoxMDAwMDAwMCwiZmVlUGxhbmNrIjo3MzUwMDAsIm1lc3NhZ2UiOiJIaSwgZnJvbSBhIGRlZXAgbGluayIsIm1lc3NhZ2VJc1RleHQiOnRydWUsImltbXV0YWJsZSI6ZmFsc2UsImRlYWRsaW5lIjoyNCwiZW5jcnlwdCI6ZmFsc2V9
--------------------
Example B
=========
signum://v1?action=pay&payload=eyJyZWNpcGllbnQiOiJTLTlLOUwtNENCNS04OFk1LUY1RzRaIiwiaW1tdXRhYmxlIjpmYWxzZSwiZGVhZGxpbmUiOjI0LCJlbmNyeXB0Ijp0cnVlfQ

Bash Escaped
signum://v1?action=pay\&payload=eyJyZWNpcGllbnQiOiJTLTlLOUwtNENCNS04OFk1LUY1RzRaIiwiaW1tdXRhYmxlIjpmYWxzZSwiZGVhZGxpbmUiOjI0LCJlbmNyeXB0Ijp0cnVlfQ

```

To generate different deeplinks for testing.

Use [testDeeplink.sh](./tasks/testDeeplink.sh) to call a deep link for the emulator

> Note: Make sure that `adb` is correctly installed on your system

```bash
./testDeeplink.sh 'signum://v1?action=pay\&payload=eyJyZWNpcGllbnQiOiJTLTlLOUwtNENCNS04OFk1LUY1RzRaIiwiaW1tdXRhY
mxlIjpmYWxzZSwiZGVhZGxpbmUiOjI0LCJlbmNyeXB0Ijp0cnVlfQ'
```

> Note: that you need the "bash escaped" url for the script (at least on Linux)
