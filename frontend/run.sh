#!/bin/sh

chmod +x /run.sh

envsubst < /etc/nginx/conf.d/nginx.conf > /etc/nginx/conf.d/default.conf

nginx -g 'daemon off;'