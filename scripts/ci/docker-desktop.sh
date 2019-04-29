#!/bin/bash

# Root of docker image is /app


echo ===============================
echo Installing Scripts Dependencies
echo ===============================
echo
cd /app/scripts
npm i

echo
echo ==================================
echo Building newest version of BurstJS
echo ==================================
echo
cd /app/lib
npm install
npm run bootstrap

echo ======================================
echo Installing Angular Wallet Dependencies
echo ======================================
echo
cd /app/web/angular-wallet
npm i

echo
echo =====================================
echo Installing Desktop Wallet Dependencies
echo =====================================
echo
cd /app/desktop/wallet
npm install

echo
echo ==============================================
echo Alright. System\'s up for packaging... Let\'s go
echo ==============================================
echo
npm run release:all
