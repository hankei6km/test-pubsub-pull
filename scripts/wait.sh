#!/bin/bash

set -e

node src/sub.js "test-sub-${1}" "${1}"
echo "--- waiting message"
node src/index.js "test-sub-${1}"