# Phoenix

---

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/81a6119af03d4a7e8a55c65999884709)](https://www.codacy.com/app/ohager/phoenix?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=burst-apps-team/phoenix&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/burst-apps-team/phoenix.svg?branch=develop)](https://travis-ci.org/burst-apps-team/phoenix) 
[![Known Vulnerabilities](https://snyk.io/test/github/burst-apps-team/phoenix/badge.svg?targetFile=lib%2Fpackage.json)](https://snyk.io/test/github/burst-apps-team/phoenix?targetFile=lib%2Fpackage.json)
[![codecov](https://codecov.io/gh/burst-apps-team/phoenix/branch/develop/graph/badge.svg)](https://codecov.io/gh/burst-apps-team/phoenix)

---

## About

<img src="./assets/phoenix.png" width="120" />

Phoenix was proposed in [CIP-18](https://github.com/burst-apps-team/CIPs/blob/master/cip-0018.md) and is designed to be a cross-platform wallet for the BURST blockchain.

![image](assets/beta.7/phoenix_1_beta.7.jpg)

### Key features:
- Improved security - Private keys are encrypted with a hashed PIN, securing them in the event of data breach. That PIN is then used for locally signing transactions and decrypting messages. Passphrases are not stored locally, and never sent to the server. 
- Multi-account support - Manage multiple BURST accounts within your wallet.
- Offline account support - Add an account using just a BURST address for maximum security.
- Cross-platform - Runs on all popular platforms without any additional software requirements.
- Dashboard - with Market Information and Interactive Balance History Diagram.
- Powered by <img src="./assets/burstjs.png" width="80" />

(Mobile coming soon)

## Additional features:
- Multi-out support - Send and view Multi-out & Multi-out-same Payments (BRS 2.3.1 and above).
- QR Codes - View account QR codes and create custom QR codes for merchants/POS terminals.
- Alias support - View and register BURST Aliases.
- Messages support - Send and receive encrypted and unencrypted messages.
- View peers, blocks, and transactions.
- Node Configuration - Select from a predefined list of nodes or use your own.
- Update Notification - Be up-to-date with inbuilt update download
- Localized in 30 languages.
- Responsive UI

*Some features not available on mobile.*

#Screenshots
![image](assets/beta.7/phoenix_2_beta.7.jpg)

![image](assets/beta.7/phoenix_3_beta.7.jpg)

![image](assets/beta.7/phoenix_4_beta.7.jpg)

![image](assets/beta.7/phoenix_5_beta.7.jpg)

![image](assets/beta.7/phoenix_6_beta.7.jpg)

![image](assets/beta.7/phoenix_7_beta.7.png)


## Application Architecture

Phoenix is comprised of two main applications: a desktop application and a mobile application, each of which share a common library called BurstJS. 

![Application Architecture Diagram](assets/architecture.png "Application Architecture Diagram")


## Installation and Build

The project is structured per platform, and further build/installation instruction can be obtained from the `README.md` in their respective folders

### Required 
- [BurstJS Library](/lib/README.md)

### Optional
- [Web Wallet](/web/angular-wallet/README.md)
- [Desktop Wallet](/desktop/wallet/README.md)
- [Mobile Wallet](/mobile/README.md)
- [Development Scripts](/scripts/README.md)

