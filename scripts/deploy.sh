if [ -z "$DOCKER_EMAIL" ] || [ -z "$DOCKER_USER" ] || [ -z "$DOCKER_PASS" ]; then
  echo "Please set DOCKER_EMAIL, DOCKER_USER and DOCKER_PASS first"
  exit 1
fi

docker build -t $TRAVIS_REPO_SLUG .

docker tag "$TRAVIS_REPO_SLUG" "${TRAVIS_REPO_SLUG}:${TRAVIS_BRANCH}"
docker tag "$TRAVIS_REPO_SLUG" "${TRAVIS_REPO_SLUG}:${TRAVIS_COMMIT}"
docker tag "$TRAVIS_REPO_SLUG" "${TRAVIS_REPO_SLUG}:travis-${TRAVIS_BUILD_NUMBER}"

docker push $TRAVIS_REPO_SLUG
