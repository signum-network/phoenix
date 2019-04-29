#!/usr/bin/env bash

echo
echo ==================================
echo Building BurstJS
echo ==================================
echo
cd lib
npm install
npm run bootstrap

echo
echo ==================================
echo Testing Ng Wallet
echo ==================================
echo
cd ../web/angular-wallet
npm install
npm run test


