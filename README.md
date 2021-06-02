# <img src="./assets/phoenix.png" width="64" /> Phoenix Burst Wallet

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/81a6119af03d4a7e8a55c65999884709)](https://www.codacy.com/app/ohager/phoenix?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=burst-apps-team/phoenix&amp;utm_campaign=Badge_Grade)
[![Build Status](https://github.com/burst-apps-team/phoenix/workflows/Test%20and%20Build%20Angular%20App/badge.svg)](https://github.com/burst-apps-team/phoenix/actions?query=workflow%3A%22Test+and+Build+Angular+App%22)
[![Known Vulnerabilities](https://snyk.io/test/github/burst-apps-team/phoenix/badge.svg?targetFile=lib%2Fpackage.json)](https://snyk.io/test/github/burst-apps-team/phoenix?targetFile=lib%2Fpackage.json)
[![codecov](https://codecov.io/gh/burst-apps-team/phoenix/branch/develop/graph/badge.svg)](https://codecov.io/gh/burst-apps-team/phoenix)

<a href="https://apps.apple.com/us/app/phoenix-burst-ios-wallet/id1485827209" target="_blank"><img src="./assets/btn-appstore.png" width="128" /></a> <a href="https://play.google.com/store/apps/details?id=com.burstcoin.phoenix" target="_blank"><img src="./assets/btn-playstore.png" width="128" /></a> 

## About

Phoenix is an open source, cross-platform wallet for the Signum (former Burstcoint) blockchain. It's actually two applications: a mobile app, and a desktop/web app. Oh, and [BurstJS](/lib/README.md) is in here too.

![image](assets/beta.14/phoenix_1_beta.14.png)

### Key features:
- Improved security - Private keys are encrypted with a hashed PIN, securing them in the event of data breach. That PIN is then used for locally signing transactions and decrypting messages. Passphrases are not stored locally, and never sent to the server. 
- Multi-account support - Manage multiple accounts within your wallet.
- Offline account support - Add an account using just a address for maximum security.
- Cross-platform - Runs on all popular platforms without any additional software requirements.
- Dashboard - with Market Information and Interactive Balance History Diagram.
- Powered by <a href="https://burst-apps-team.github.io/phoenix/"><img src="./assets/burstjs.png" width="80" /></a>

## Additional features:
- Multi-out support - Send and view Multi-out & Multi-out-same Payments (BRS 2.3.1 and above).
- QR Codes - View account QR codes and create custom QR codes for merchants/POS terminals.
- Deep Linking - Make your apps interact with Phoenix (see [here](./DEEPLINKING.md))
- Alias support - View and register BURST Aliases.
- Messages support - Send and receive encrypted and unencrypted messages.
- Mining Setup - Allows to set your reward recipient and commitment (Poc+)
- View peers, blocks, and transactions.
- Node Configuration - Select from a predefined list of nodes or use your own, or just let select automatically
- Update Notification - Be up-to-date with inbuilt update download
- Localized in 30 languages.
- Responsive UI

*Some features not available on mobile.*

## Screenshots
![image](assets/beta.14/phoenix_2_beta.14.png)

![image](assets/beta.14/phoenix_3_beta.14.png)

![image](assets/beta.14/phoenix_4_beta.14.png)

![image](assets/beta.14/phoenix_5_beta.14.png)

![image](assets/beta.14/phoenix_6_beta.14.png)

![image](assets/beta.14/phoenix_7_beta.14.png)

![image](assets/beta.14/phoenix_8_beta.14.png)



## Application Architecture

Phoenix is comprised of two main applications: a desktop application and a mobile application, each of which share a common library called BurstJS. 

![Application Architecture Diagram](assets/architecture.png "Application Architecture Diagram")


## Installation and Build

The project is structured per platform, and further build/installation instruction can be obtained from the `README.md` in their respective folders.

### Archlinux

A package is available in [AUR](https://aur.archlinux.org/packages/phoenix/).

### Pick A Platform
- [Web Wallet](/web/angular-wallet/README.md)
- [Desktop Wallet](/desktop/wallet/README.md)
- [Mobile Wallet](/mobile/README.md)

### See Also
- [SignumJS Library](/lib/README.md)
- [Development Scripts](/scripts/README.md)

