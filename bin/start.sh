#!/bin/sh

npm run migration:run-prod
node -r ./tsconfig-paths.js dist/main.js
