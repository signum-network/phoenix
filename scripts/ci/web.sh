#!/bin/bash

cd web/angular-wallet
npm install
npm run test:ci
npm run build:ci
