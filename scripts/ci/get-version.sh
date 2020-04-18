#!/usr/bin/env bash

# Version key/value should be on his own line
export PACKAGE_VERSION=$(cat ../../desktop/wallet/package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo "Found version: $PACKAGE_VERSION"
