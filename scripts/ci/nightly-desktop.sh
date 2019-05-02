#!/bin/bash

echo ===============================
echo Nightly Release Desktop Wallet
echo ===============================

# install script deps
echo
cd ./scripts
npm i
npm run version:nightly

# install/update version of burstjs
cd ../lib
npm install
npm run bootstrap

# install/update angular wallet deps
cd ../web/angular-wallet
npm i

# install/update desktop wallet deps
cd ../../desktop/wallet
npm install

# only builds and publish
npm run release:all
npm run publish


