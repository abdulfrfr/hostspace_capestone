#!bin/bash

#!/bin/bash
set -e

# Perform environment variable substitution on Nginx configuration files
echo "Performing environment variable substitution on Nginx configuration files..."
envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Start Nginx
echo "Starting Nginx..."
exec "$@"
