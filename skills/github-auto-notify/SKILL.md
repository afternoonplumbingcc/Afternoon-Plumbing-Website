---
name: github-auto-notify
description: "Auto-notify on GitHub commits: send commit hash, link, and website URL with cache buster. Use when: pushing commits to production branches. NOT for: manual commit history reviews."
---

# GitHub Auto-Notify Skill

Auto-post commit notifications to Discord after each push to main/master.

## Workflow

1. After committing changes, run `scripts/notify_commit.sh <commit-message> <file-changed>`
2. The script extracts the latest commit hash, builds the GitHub URL, and finds the affected website URL
3. Sends a formatted message to Discord

## Usage

```bash
# After committing and before pushing:
scripts/notify_commit.sh "Fix slider image resizing" hose-bib-replacement
scripts/notify_commit.sh "Add water heater service page" water-heater
scripts/notify_commit.sh "Update CSS for comparison slider" comparison-slider
```

## Configuration

Set these environment variables (in `.env.local` or system env):
- `DISCORD_WEBHOOK_URL`: Your Discord webhook URL for notifications
- `GITHUB_REPO`: Repository name (default: afternoonplumbingcc/Afternoon-Plumbing-Website)
- `BASE_URL`: Website base URL (default: https://afternoonplumbing.com)

## Example Output

```
✅ Commit pushed: a1b2c3d
🔗 https://github.com/afternoonplumbingcc/Afternoon-Plumbing-Website/commit/a1b2c3d
🏠 https://afternoonplumbing.com/hose-bib-replacement-westminster-md.html?nocache=a1b2c3d
```

## Notes

- Add `?nocache=<hash>` to URLs to force browser cache refresh
- Works with various website pages (hose-bib, water-heater, comparison-slider, etc.)
- Custom notification messages can be added per commit for context
