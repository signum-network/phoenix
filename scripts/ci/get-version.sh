#!/usr/bin/env bash
cd desktop/wallet
# Version key/value should be on his own line
export PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

cd ../..
echo "Found version: $PACKAGE_VERSION"
