# Changelog

## 1.5.0-beta.2

### Feature

- Added Multi Asset Transfer as Transaction Type
- 

### Bug Fixes

- Fixed a routing loop for the rare case that someone loads the 1.5.0-beta version for first time in testnet 
- Minor Layout fixes

## 1.5.0-beta.1

No more features.

### Bug Fixes

- Dashboards widgets not updating on account selection (#1728)
- Account details is not loading owned tokens (#1729)
- Transfer Tokens Screen broken (#1730)
- Opening SignumSwap via Token Panel causes blank screen (#1731)
- Correct update of toolbar account selector in case of remved/added accounts

## 1.5.0-beta

### Feature
- Revamped Account Management`
- Added Contacts 
- Address Context Menus for immediate actions
- Wallet Factory Reset possible now
- Added Single Message Sending 
- Massively reduced peer bandwidth usage by complete overhaul of internal update mechanics
- Overall UX improvements, e.g. using memoization to speed up, many layout tweaks
- Back/Forward Navigation

### Bug Fixes

- Fixed Disabled Activate Button (#1688)
- Fixed Sending to unknown Accounts (#1664)
- Distributions considered in Balance Chart
- Network change updates UI correctly (#1689)
- Improved Tx Caching (#1707)
- Performance Issues (should be solved now) (#1605)
- Open Settings on start up if node is not reachable (#1527)
- Copyable Deep Link (#1316)
- Selects window.location.origin in web version as default - if not set

## 1.5.0-alpha

### Feature
- Account Descriptions SRC44 compliant now
- Revamped Alias Section (solves also #1665)
- Token Transfer with attached Signa (#1666)

### Bug Fixes

- Fixed Sending Issue (#1711)
- Remove Google Fonts dependency (#1674)

## 1.4.2

### Feature
- Added Burning 🔥
- Disabled encrypted messages for contracts

### Bug Fixes
- Sending Tokens to Smart Contracts #1661

## 1.4.1

### Feature
- Improved Peer List #1642
- Sticky Toolbar #1597
- New :rainbow: Transaction Types supported #1655
- Improved Block & Transactions Details (with :rainbow: features) and links to explorer
- Desktop Notification can be disabled now #1648

### Bug Fixes
- Fixed message send when switched networks
- More consistent dashboard data, when switching networks
- General minor fixes and improvements

## 1.4.0

# Feature
- New Fee Selector component
- Forged blocks with link to explorer now.

### Bug Fixes
- Fixed all fee issues (#1594, #1575)
- QrCode in Request Form on SIP22 (works with mobile wallet) (#1630 )
- Fixed About screen in Desktop (#1593)
- New Nodes (#1617  #1618 #1616)

## 1.3.2

### Bug Fixes
- Fixed Sending to Smart Contracts
  - caused by changes in the node software itself
  - fixed by patching and updating SignumJS
- Fixed Token Widget Update (#1583)

## 1.3.1

### Bug Fixes
- Fixed Token Amount in Dashboard Token Widget (#1576)


## 1.3.1

### Bug Fixes
- Fixed Token Amount in Dashboard Token Widget (#1576)
- Fixed Minor Layout issued (#1574)

## 1.3
- Multiple Dashboards for newcomers, pro-users, or miners
- Improved Token Support
- New Transaction Table
  - fresh responsive layout 
  - improved search
- Incremental Transaction Loading
  - Reduces fetched payloads drastically
- Support for new [Unstoppable Domains](https://unstoppabledomains.com/blog/100-million-airdrop-and-the-launch-of-8-new-domain-registries)
- Enhanced more secure Account Creation/Import
  - Added individual salt 
  - Added Whitespace indicator on import

### Bug Fixes
- Several Tx Table fixes (#414, #1500, #1525, #1536, #1538)
- Token fixes (#1522)
- Fixed Alias issue on Send Form for multiple aliases per account (#1562)
- Changed to coingecko API (#1496)
- Further Bugfixes (#1533, #1552)

## 1.2.2

- fixed wrong logo name
- removed _temporarily_ fcas stats
- fixed market info
  - although API does not return Market Cap yet.

## 1.2.1 

## Bug fix

- Encryption of attachment works again (#1490)
- Burst Currency Symbol in Commitment Page (#1489)
- Alias Reset Form (#1484)
- Disclaimer with Signum Logo (#1483)


## 1.2.0 (Signum Rebrand)

- Overall Rebranding for Signum
- Full support for new Address prefixes (S)
- More preset nodes, with separated test nodes
- Layout overhaul for legacy components, especially Alias Form


### Bug Fixes
- Application Icons should work on all platforms now #1478
- CIP22 deeplink fixed #1478
- CSV Import fixed #1477
- Desktop Notifications with accounts now #1446
- Absolute Time in transaction list #1459
- Feedback when wrong pin entered
- countless minor improvements
- cleaned up translation 

## 1.1.0 (In Beta)

- PoC+ Mining Features
  - Add/Revoke Commitment
  - Refined Reward Assignment
- New face lifting
  - New splash screen
  - Changing bg images on pages
  - Hash icon
- Extended Address Support  
- Modernized Pages
  - Set Reward Recipient
  - Set Account Info
- Node Settings
  - Revisited Node List
  - Automatic Node Selection using new reliable nodes
- [CIP22 Deeplinking support started](../../DEEPLINKING.md)
  - Works for simple payments now 
- Many minor improvements for better usability
  - Colorful transaction table
  - Wrong PIN error message
  - and many more
  

### Bug fixes
- Market Info with true 24h change 
- Cleanup (#1408)
- Set Account Info (#412)

## 1.0.3

### New Feature
- Adding Testnet detection

### Bug Fixes
- Fixing issues with deep links (#1331, #1393)
- Fixed a subtle bug on node selection


## 1.0.2

### Bug Fixes
- Added Settings Option in File Menu for Desktop version (#1371)
- Updated image path for Performance widget on Dashboard

## 1.0.1

### Bug Fixes
- Increased QR Code size in sidebar (#1326)
- Fixed a bug preventing asset balances from updating (#1327)
- Fixed Windows platform name for New Version Dialog

## 1.0.0

### New Features:
- Asset View
- Added new Testnet Node Link 
- Added Fallback Link for Download

### Bug Fixes
- Fixed Initial Error Message


## 1.0.0-beta.14

### New Features:
- Revamped Dashboard Layout
    - New more powerful market info API
    - New Performance widget
    - Improved Balance Chart
    - Better responsiveness
    - Added EUR
- Using new Burst Symbol `Ƀ`
- Send BURST with standard fee (was lowest fee before)

### Bug Fixes:
- Fixed a bug account creation flow (#1275)


## 1.0.0-beta.13

### New Features:
- Added Block Time Graph to Blocks Page

### Bug Fixes:
- Fixed a bug with QR code generation
- Security updates

## 1.0.0-beta.12 

### New Features:
- Added Account Activation
- Improved UX for Account Creation Process 
- Account Manager with explicit actions (#700) 
- Removed Endpoint Setting
    - simplified node selection
    - automatic/dynamic peer version detection
- Language Selection for Mobile/Responsive version

## 1.0.0-beta.11

### New Features:
- Added support for sending BURST to .zil and .crypto domains

## 1.0.0-beta.10

### New Features:
- Improved Multi-out Payments with CSV upload (#238)
- Enhanced Node Selection
    - custom endpoint possible
    - dynamic version detection 
- Added ability to send hex messages with transactions (#696)
- Added Asset Transfer info in Tx details

### Bug Fixes:
- Improved some of Translations (pt-br, pt-pt, lt)
- Fixed Block Reward conversion in Block Details
- Fixed Message Handling on Multiout (#654)
- Fixed Fee issue for messages (#614)
- Fixed sending to unknown accounts (#645)
- Fixed an issue with unconfirmed transactions on the dashboard sometimes not showing up

## 1.0.0-beta.9

### New Features:
- Deep Linking
- Improved Node Selection (#604 #351)
- _Spend all_ on Send Burst (#553)
- Improved Layout for Transactions 
- Improved Layout for Blocks 
- Added Indicator while Downloading latest Update

### Bug Fixes:
- Fixed green/red transactions on dashboard (#523)
- Fixed MultiSameOut (#543)
- Fixed Update Issue on Windows
- Fixed QR Code Update on Account Change (#553)

## 1.0.0-beta.8

### New Features:
- Added ability to scan QR codes when sending BURST

### Bug Fixes:
- Corrected incomings/outgoings in Account Details

## 1.0.0-beta.7

### New Features:
- Update checker
- Auto Scaling of Balance Chart
- Improved Account Creation Flow
- More Translations
- New nodes
- Copy Address/Id
- Several layout tweaks

### Bug Fixes:
- Slider for Fee Selection
- CPU usage on particle screen
- "always encrypted" issue for messages
- Performance issues while loading accounts with many Tx
- Delete current account issue
- Several minor fixes

## 1.0.0-beta.6

### New Features:
- Added transaction count selector and smoothed the lines on the Balance History chart
- Added drop-down for Copy Account ID, Copy Address, and Set Account Info
- Added App Icons for mobile users who save the web app to their home screen

### Bug Fixes:
- Fixed a bug where sending burst to a new account would fail
- Improved display of transaction tables
- Improved performance of particleJS on new user page
- Improved styles on create new user flow for mobile

