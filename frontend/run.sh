#!/bin/sh

chmod +x /etc/nginx/conf.d/nginx.conf

envsubst < /etc/nginx/conf.d/nginx.conf > /etc/nginx/conf.d/default.conf

nginx -g 'daemon off;'