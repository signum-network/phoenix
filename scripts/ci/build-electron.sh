#!/usr/bin/env bash
echo
echo ==================================
echo Building Electron Wallet
echo ==================================
echo
# -l option is for mac only
top -l 1 | grep "KiB Mem"

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
top -l 1 | grep "KiB Mem"
npm install
npm run build


