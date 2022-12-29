#!/bin/bash

# Define a function to check if the Elastic endpoint is available
check_elastic_endpoint() {
  # Send an HTTP request to the endpoint and check the response code
  if curl -s -o /dev/null -w "%{http_code}" "http://elastic:test1234@es01:9200" | grep -q "200"; then
    # Endpoint is available, return 0
    return 0
  else
    # Endpoint is not available, return 1
    return 1
  fi
}

# Keep calling the function until it returns 0
while ! check_elastic_endpoint; do
  # Sleep for 1 second before trying again
  echo "waiting until elastic search is available"
  sleep 1
done

# Endpoint is now available, run the monstache command
/bin/monstache -f /config.toml