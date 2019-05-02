#!/usr/bin/env bash
echo
echo ==================================
echo Building Electron Wallet
echo ==================================
echo

# install script deps
cd scripts
npm install

# build burstjs
cd ../lib
npm install
npm run bootstrap

# install angular deps
cd ../web/angular-wallet
npm install

# now build
cd ../../desktop/wallet
npm install
npm run build


