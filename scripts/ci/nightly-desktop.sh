#!/bin/bash

echo ===============================
echo Nightly Release Desktop Wallet
echo ===============================


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

echo Need to bump version to nightly

# only builds, but not publish
#npm run release:all
#npm run publish


