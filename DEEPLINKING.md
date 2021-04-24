# Deep linking

Imagine you are on a page like [Cryptoball](https://www.cryptoball.org/) doing your bets. At the end you just need to
click on the "Play Now" button and then your Phoenix Wallet opens in "Send Amount" page all already prefilled, such you
just need to confirm the transaction with your PIN.

This is only possible thanks to deep linking. With deep linking it is possible to open the Phoenix wallet and route to
certain pages filling out forms. The magic behind this is the support for custom URI protocols that can be registered on
Windows, MacOS and Linux.

> Note that deep linking does not work with standalone executables like AppImage, or not installable .exe, as only with the installation process the custom protocol gets registered.

In the [CIP22 spec](https://github.com/burst-apps-team/CIPs/blob/master/cip-0022.md) it is generally defined how deep
links _should_ be formatted inside the ecosystem. The Phoenix wallet follows this spec and though allows you to open
specific pages for different tasks. In this document the format and parameters for the supported tasks are described

The generally supported link format is `burst://v1?action=<name>&payload=<b64-encoded-json-payload>`

> Mind that the payload has to be a JSON object being [encoded in base64](https://www.base64encode.org/)

## Actions

### Send Amount to single recipient

The link is used to fill out the "Send Amount" form for a single recipient.

__Action(s)__:

- `send-amount`
- `pay`

__Payload__

| Parameter  | Description  | Example | Required |
|---|---|---|---|
| recipient | The receivers (extended) RS address or account id  | BURST-LJRV-9LE8-VJ5B-57W4C | yes |
| amountPlanck | The amount to be sent in Plancks  | 20000000000 | yes |
| feePlanck  | The tx fees in Plancks  | 2205000 | yes |
| message | Any kind of message  |  Hello, World  | no |
| messageIsText | Determine if the message is a human readable text message  |  true  | yes, if message is set |
| immutable | If true, the form stays immutable avoiding accidental changes  |  false  | no |
| deadline | A thru valid deadline for the tx (discarded if not processed until then) in hours (1 to 24)  |  6  | no |
| encrypt | Encrypts attached message|  true  | no |


__JSON Form__
```json
{
  "recipient": "BURST-9K9L-4CB5-88Y5-F5G4Z",
  "amountPlanck": 10000000,
  "feePlanck": 735000,
  "message": "Hi, from a deep link",
  "messageIsText": true,
  "immutable": true,
  "deadline": 24,
  "encrypt": false
}
```

__Example__

```
burst://v1?action=pay&payload=eyJyZWNpcGllbnQiOiJCVVJTVC05SzlMLTRDQjUtODhZNS1GNUc0WiIsImFtb3VudFBsYW5jayI6MTAwMDAwMDAsImZlZVBsYW5jayI6NzM1MDAwLCJtZXNzYWdlIjoiSGksIGZyb20gYSBkZWVwIGxpbmsiLCJtZXNzYWdlSXNUZXh0Ijp0cnVlLCJpbW11dGFibGUiOnRydWUsImRlYWRsaW5lIjoyNH0K
```

### More actions will be provided in the future

## Legacy Support

The deep linking was initially introduced in Burst for only one single action. Phoenix does support the legacy format,
but we highly suggest using the new spec as it offers more versatility. The legacy link is of the following form:

### Send Amount to single recipient

The link is used to fill out the "Send Amount" form for a single recipient.

```
burst://requestBurst?receiver=BURST-LJRV-9LE8-VJ5B-57W4C&amountNQT=20000000000&feeNQT=2205000&immutable=false&message=4c956fdb7701&messageIsText=false
```

| Parameter  | Description  | Example | Required |
|---|---|---|---|
| receiver | The receivers RS address or account id  | BURST-LJRV-9LE8-VJ5B-57W4C | yes |
| amountNQT | The amount to be sent in Plancks  | 20000000000 | yes |
| feeNQT  | The tx fees in Plancks  | 2205000 | yes |
| message | Any kind of message  |  Hello, World  | no |
| messageIsText | Determine if the message is a human readable text message  |  true  | yes, if message is set |
| immutable | If true, the form stays immutable avoiding accidental changes  |  false  | no |



