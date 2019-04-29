#!/bin/bash

echo ===============================
echo Nightly Release Desktop Wallet
echo ===============================

brew install rpm
npm i @angular/cli -g

# install script deps
echo
cd ./scripts
npm i

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

git tag nightly-desktop --force
git push --tags --force

npm run release:all
electron-builder -p "always"


