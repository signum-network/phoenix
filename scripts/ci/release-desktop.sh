#!/bin/bash

echo ===============================
echo Releasing Desktop Wallet
echo ===============================

if [[ $1 = "--force" ]]
then
echo ===============================
echo  FORCED DEPLOY
echo ===============================
fi

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

if [[ $1 = "--force" ]]
then
    npm run build
#    electron-builder -p "always" -wml
    electron-builder -p "always" -l
else
    npm run release:all
fi


