#!/bin/bash

docker build --tag=devtest --file=./scripts/docker/desktop/Dockerfile  .
docker run devtest
