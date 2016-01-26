#!/bin/sh

set -e

if [ -z "$DOCKER_EMAIL" ] || [ -z "$DOCKER_USER" ] || [ -z "$DOCKER_PASS" ]; then
  echo "[deploy] Please set DOCKER_EMAIL, DOCKER_USER and DOCKER_PASS first"
  exit 1
fi

echo "[deploy] logging in to docker hub"
docker login -e "$DOCKER_EMAIL" -u "$DOCKER_USER" -p "$DOCKER_PASS"

echo "[deploy] removing dev deps"
npm prune --production

echo "[deploy] building docker image"
docker build --no-cache -t "$TRAVIS_REPO_SLUG" .

echo "[deploy] tagging docker image"
docker tag "$TRAVIS_REPO_SLUG" "${TRAVIS_REPO_SLUG}:${TRAVIS_BRANCH}"
docker tag "$TRAVIS_REPO_SLUG" "${TRAVIS_REPO_SLUG}:${TRAVIS_COMMIT}"
docker tag "$TRAVIS_REPO_SLUG" "${TRAVIS_REPO_SLUG}:travis-${TRAVIS_BUILD_NUMBER}"

echo "[deploy] pushing docker image"
docker push "$TRAVIS_REPO_SLUG"

echo "[deploy] success!"
docker images
