#!/usr/bin/env bash

echo
echo ==================================
echo Testing BurstJS
echo ==================================
echo
cd lib
npm install
npm run bootstrap
npm run test:ci
bash <(curl -s https://codecov.io/bash)
