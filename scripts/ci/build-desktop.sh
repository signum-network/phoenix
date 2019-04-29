#!/bin/bash

echo ===============================
echo Installing Scripts Dependencies
echo ===============================
echo
cd ./scripts
npm i

echo
echo ==================================
echo Building newest version of BurstJS
echo ==================================
echo
cd ../lib
npm install
npm run bootstrap

echo ======================================
echo Installing Angular Wallet Dependencies
echo ======================================
echo
cd ../web/angular-wallet
npm i

echo
echo =====================================
echo Installing Desktop Wallet Dependencies
echo =====================================
echo
cd ../../desktop/wallet
npm install

echo
echo ==============================================
echo Alright. System\'s up for packaging... Let\'s go
echo ==============================================
echo
# npm run release:all
npm run release:win32
