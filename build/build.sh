#!/bin/bash

npm --prefix /opt/code/ run build:docker

echo "NPM BUILD COMPLETED"

cp -ar /opt/code/dist/. /usr/share/nginx/html/

echo "DIST SOURCE COPIED"

nginx -g "daemon off;"
