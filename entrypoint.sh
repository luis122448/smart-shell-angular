#!/bin/sh
set -e

# Health check logic (uses variables from .env)
HEALTH_CHECK_URL=$(echo "${HEALTH_CHECK_URL}" | sed 's|/$||g')

echo "Performing health check on: ${HEALTH_CHECK_URL}"

if ! curl --fail -s ${HEALTH_CHECK_URL}; then
    echo "--------------------------------------------------"
    echo "ERROR: Backend health check failed on: ${HEALTH_CHECK_URL}"
    echo "Please check API_URL and HEALTH_CHECK_PATH in your .env file."
    echo "Hint: For local development, use http://host.docker.internal instead of http://localhost."
    echo "--------------------------------------------------"
    exit 1
fi

echo "Health check successful. Starting Nginx."

# Substitute all environment variables starting with NGINX_ in the template.
envsubst '${API_URL}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Start Nginx in the foreground.
nginx -g 'daemon off;'
