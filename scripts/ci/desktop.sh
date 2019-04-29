#!/bin/bash

ImageName=phoenix-desktop

docker build --tag=${ImageName} --file=./scripts/docker/desktop/Dockerfile  .
docker run ${ImageName}
