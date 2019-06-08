#!/usr/bin/env bash

echo
echo ==================================
echo Building/Bundling BurstJS
echo ==================================
echo
cd lib
npm install
npm run bootstrap
npm run build
