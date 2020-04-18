#!/usr/bin/env bash
echo
echo ==================================
echo Building Web Wallet
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
npm run build:web

# build archive
cd dist
tar cvfz ../web-phoenix-burst-wallet.tar.gz *
