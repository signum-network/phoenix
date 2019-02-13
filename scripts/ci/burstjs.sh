#!/usr/bin/env bash

cd lib
npm install
npm run bootstrap
npm run test:ci
bash <(curl -s https://codecov.io/bash)

