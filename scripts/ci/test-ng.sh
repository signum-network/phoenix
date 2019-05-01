#!/usr/bin/env bash

echo
echo ==================================
echo Testing Ng Wallet
echo ==================================
echo

# building burstjs
cd lib
npm install
npm run bootstrap

# testing ng
cd ../web/angular-wallet
npm install
npm run test


