# HOT: Always Loaded Rules

- When checking cron jobs, flag rate-limit errors on Night Anti-Snack Reminder (consecutiveErrors: 3) and advise user to check API key balance or switch models.
- Website health check cron jobs run daily at 17:00 ET; mark success unless URLs fail.
- During heartbeat cycles, batch checks (cron status, memory review, website status) to avoid redundant API calls.
