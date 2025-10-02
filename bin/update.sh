#!/bin/sh

set -e

cd /home/idch-qumemo/app
echo "Updating code..."
git fetch origin
git reset --hard origin/main

echo "Building new images..."
docker compose -f docker-compose.prod.yaml build

echo "Deploying with rolling update..."
docker compose -f docker-compose.prod.yaml up -d --no-deps --build

# echo "Migrating..."
# DB_HOST=localhost bun db:migrate

echo "Deployment successful"
