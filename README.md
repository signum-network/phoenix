# <img src="./assets/phoenix.png" width="64" /> Phoenix Signum Wallet

Phoenix is an open source, cross-platform wallet for the Signum (former Burstcoin) blockchain. It's actually two applications: a mobile app, and a desktop/web app.

![image](assets/wallet/collage.jpg)

### Key features:
- Improved security - Private keys are encrypted with a hashed PIN, securing them in the event of data breach. That PIN is then used for locally signing transactions and decrypting messages. Passphrases are not stored locally, and never sent to the server. 
- Multi-account support - Manage multiple accounts within your wallet.
- Offline account support - Watch an account without using the passphrase for maximum security.
- Cross-platform - Runs on all popular platforms without any additional software requirements.
- Dashboard - with Market Information and Interactive Balance History Diagram.
- Powered by <a href="https://signum-network.github.io/signumjs"><img src="./assets/signumjs.png" height=32" /></a>

## Additional features:
- Multi-out support - Send and view Multi-out & Multi-out-same Payments
- QR Codes - View account QR codes and create custom QR codes for merchants/POS terminals.
- Deep Linking - Make your apps interact with Phoenix (see [here](./DEEPLINKING.md))
- Alias support - View and register Signum Aliases.
- Messages support - Send and receive encrypted and unencrypted messages.
- Mining Setup - Allows to set your reward recipient and commitment (PoC+)
- View peers, blocks, and transactions.
- Node Configuration - Select from a predefined list of nodes or use your own, or just let select automatically
- Account Activation - Once created an account, it gets activated by the network without the need of a faucet
- Update Notification - Be up-to-date with inbuilt update download
- Localized in 30 languages.
- Responsive UI

*Some features not available on mobile.*

## Application Architecture

Phoenix is comprised of two main applications: a desktop application and a mobile application 

<img src="./assets/architecture.png" height="640" alt="Phoenix Architecture Diagram"/>

The web application is built on Angular 8 and embedded into electron to be executable as desktop application.
The mobile application uses React Native to be available for Android and iOS. All these apps use the [SignumJS SDK](https://github.com/signum-network/signumjs) 
to interact with the [Signum nodes](https://github.com/signum-network/signum-node).

## Installation and Build

The project is structured per platform, and further build/installation instruction can be obtained from the `README.md` in their respective folders.

### Pick A Platform
- [Web Wallet](/web/angular-wallet/README.md)
- [Desktop Wallet](/desktop/wallet/README.md)
- [Mobile Wallet](/mobile/README.md)

### See Also
- [Development Scripts](/scripts/README.md)

