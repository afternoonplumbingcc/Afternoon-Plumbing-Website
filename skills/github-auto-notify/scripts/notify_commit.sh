#!/bin/bash
# Auto-notify on GitHub commits - sends commit info and website URL to Discord

# Get latest commit hash (short)
COMMIT_HASH=$(git rev-parse --short HEAD)

# Check if commit message argument was provided
if [ -z "$1" ]; then
    echo "Usage: $0 <commit-message> [page-name]"
    exit 1
fi

COMMIT_MSG="$1"
PAGE_NAME="${2:-website}"

# Build URLs
GITHUB_COMMIT_URL="https://github.com/afternoonplumbingcc/Afternoon-Plumbing-Website/commit/${COMMIT_HASH}"

# Determine website URL based on page name
case "$PAGE_NAME" in
    "hose-bib"|"hosebib"|"hose-bib-replacement")
        WEBSITE_URL="https://afternoonplumbing.com/hose-bib-replacement-westminster-md.html"
        ;;
    "water-heater"|"water-heaters"|"water-heater-replacement")
        WEBSITE_URL="https://afternoonplumbing.com/water-heater-replacement-westminster-md.html"
        ;;
    "water-softener"|"water-softeners"|"water-softener-installation")
        WEBSITE_URL="https://afternoonplumbing.com/water-softener-installation-westminster-md.html"
        ;;
    "well-pump"|"well-pumps"|"well-pump-repair")
        WEBSITE_URL="https://afternoonplumbing.com/well-pump-repair-westminster-md.html"
        ;;
    "acid-neutralizer"|"acid-neutralizers")
        WEBSITE_URL="https://afternoonplumbing.com/acid-neutralizer-installation-westminster-md.html"
        ;;
    "comparison-slider"|"comparison")
        WEBSITE_URL="https://afternoonplumbing.com/hose-bib-replacement-westminster-md.html"
        ;;
    *)
        WEBSITE_URL="https://afternoonplumbing.com/"
        ;;
esac

# Add cache buster to URL
CACHE_BUSTED_URL="${WEBSITE_URL}?nocache=${COMMIT_HASH}"

# Build Discord message
MESSAGE="✅ Commit pushed: \`$COMMIT_HASH\`
🔗 [View on GitHub]($GITHUB_COMMIT_URL)
🏠 [$PAGE_NAME page]($CACHE_BUSTED_URL)

*\"$COMMIT_MSG\"*"

# Send to Discord (using webhook URL from env or default)
DISCORD_WEBHOOK_URL="${DISCORD_WEBHOOK_URL:-}"

if [ -n "$DISCORD_WEBHOOK_URL" ]; then
    curl -X POST -H "Content-Type: application/json" \
        -d "{\"content\":\"$MESSAGE\"}" \
        "$DISCORD_WEBHOOK_URL" 2>/dev/null
    echo "Notification sent!"
else
    echo "DISCORD_WEBHOOK_URL not configured."
    echo "Message would be:"
    echo "$MESSAGE"
fi
