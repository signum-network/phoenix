#!/usr/bin/env bash
echo
echo ==================================
echo Building Ng Wallet
echo ==================================
echo

# build burstjs
cd lib
npm install
npm run bootstrap

# now build ng
cd ../web/angular-wallet
npm install
npm run build:ci


