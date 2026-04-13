#!/bin/bash
# Auto-post commit notifications to Discord after each push to main/master

COMMIT_MSG="${1:-Changes pushed}"
FILE_ARG="${2:-website}"

# Get latest commit hash
COMMIT_HASH=$(git rev-parse --short HEAD)
GITHUB_REPO="${GITHUB_REPO:-afternoonplumbingcc/Afternoon-Plumbing-Website}"
BASE_URL="${BASE_URL:-https://afternoonplumbing.com}"

# Build GitHub URL
GITHUB_URL="https://github.com/${GITHUB_REPO}/commit/${COMMIT_HASH}"

# Map file argument to page URL
case "${FILE_ARG}" in
    water-heater)
        PAGE_URL="${BASE_URL}/water-heater-replacement-westminster-md.html"
        ;;
    well-pump)
        PAGE_URL="${BASE_URL}/well-pump-repair-westminster-md.html"
        ;;
    hose-bib)
        PAGE_URL="${BASE_URL}/hose-bib-replacement-westminster-md.html"
        ;;
    comparison-slider)
        PAGE_URL="${BASE_URL}/"
        ;;
    services)
        PAGE_URL="${BASE_URL}/services.html"
        ;;
    *)
        PAGE_URL="${BASE_URL}/"
        ;;
esac

# Add cache buster
PAGE_URL_WITH_CACHE="${PAGE_URL}?nocache=${COMMIT_HASH}"

# Discord message payload
PAYLOAD="{
  \"embeds\": [{
    \"title\": \"✅ Commit pushed: ${COMMIT_HASH}\",
    \"url\": \"${GITHUB_URL}\",
    \"description\": \"${COMMIT_MSG}\",
    \"fields\": [
      {
        \"name\": \"Repository\",
        \"value\": \"${GITHUB_URL}\",
        \"inline\": false
      },
      {
        \"name\": \"Website\",
        \"value\": \"${PAGE_URL_WITH_CACHE}\",
        \"inline\": false
      }
    ],
    \"color\": 5763719
  }]
}"

# Send to Discord webhook
if [ -n "$DISCORD_WEBHOOK_URL" ]; then
    curl -s -X POST -H "Content-Type: application/json" -d "$PAYLOAD" "$DISCORD_WEBHOOK_URL"
    echo ""
else
    echo "DISCORD_WEBHOOK_URL not set. Message would be sent to Discord."
    echo "Discord message preview:"
    echo "Title: Commit pushed: ${COMMIT_HASH}"
    echo "URL: ${PAGE_URL_WITH_CACHE}"
    echo "Message: ${COMMIT_MSG}"
fi
