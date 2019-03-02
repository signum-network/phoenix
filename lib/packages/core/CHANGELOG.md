# Change Log
All notable changes to this project will be documented in this file.

## 0.1.0-rc.3
- BRS exceptions thrown as `HttpError` now
- Reduced lib size
- added API functions
    - Network: `getTime`
    - Network: `getPeer`
    - Network: `getPeers`
    - Block: `getBlocks`
    
 
  
### Network
- Added `suggestFees` for getting suggested fees.
- Added `sendMoney` for generating the unsigned transaction, signing it, and broadcasting it.

### Account
- Added `getAliases` to retrieve aliases for an account
- Added `generateSendTransactionQRCode` and `generateSendTransactionQRCodeAddress` methods for generating a QR code image or URL, respectively.
