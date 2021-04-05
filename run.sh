#!/bin/sh

curl https://yuanqing.github.io/figma-plugins-stats/index.json --silent --show-error --output plugins.json
node index.js > README.md
