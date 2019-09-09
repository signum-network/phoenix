# Change Log
All notable changes to this project will be documented in this file.

# 0.4.0
- Changed License: From GPL-3.0 to Apache 2.0
- `isAttachmentVersion` returns `true` or `false` consistently

# 0.3.0

___
__Breaking Changes__

- removed `assertAttachmentVersion`
    - use `isAttachmentVersion` instead
- deprecated `sendMoneyMultiOut`
    - will be removed in next major version (0.4)
    - use `sendSameAmountToMultipleRecipients`
    - use `sendAmountToMultipleRecipients`
- deprecated `sendMoney`
    - will be removed in next major version (0.4)
    - use `sendAmount`
___

- added `isAttachmentVersion`
- added `getAttachmentVersion`
- splitted `sendMoneyMultiOut` into 
    - `sendSameAmountToMultipleRecipients`
    - `sendAmountToMultipleRecipients`
- added `sendAmount`
- minor refactoring leading to slightly smaller code

## 0.2.1

- fixed missing contract imports
- adjusted error response for inconsistent BRS error responses

## 0.2.0
- introduced first Contract API functions
    - `getContract`
    - `getContractsByAccount`
- `ContractHelper` class for easier contract inspection
- fixed symlink bundling issue 


## 0.1.3
- now available as standalone bundle (iife)

## 0.1.2
- added `confirmed` property to `Account` model
- added `alias` api
- added `setRewardRecipient` for assigning reward recipients for miners

## 0.1.1
- added FeeQuant for `suggestFees`

## 0.1.0
- changed BurstService creation parameter
- added sendEncryptedTextMessage 
- Export of Api Interface Types
- Entirely removed BigNumber

## 0.1.0-rc.3
### General
- BRS exceptions thrown as `HttpError` now

### Account
- Modified `Account` type to better reflect what is returned from BRS API. This is a breaking change, please see the `Account` for the new property names.  
- Added `setAccountInfo` for setting account name and description

### Block
- Added `getBlocks`


## 0.1.0-rc1
### Network
- Added `suggestFees` for getting suggested fees.
- Added `sendMoney` for generating the unsigned transaction, signing it, and broadcasting it.

### Account
- Added `getAliases` to retrieve aliases for an account
- Added `generateSendTransactionQRCode` and `generateSendTransactionQRCodeAddress` methods for generating a QR code image or URL, respectively.
