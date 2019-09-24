#!/bin/sh

npm run migration:run
node -r ./tsconfig-paths.js dist/main.js
