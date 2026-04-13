# HEARTBEAT.md

Run every 30m.

Purpose: business ops + lead-gen monitoring.

Check these each heartbeat:
3) Failed cron jobs / automation failures.
5) Review requests not sent after completed jobs.

Alert rules:
- If action is needed now, send a short alert with:
  - Issue
  - Why it matters
  - Next best action
- If nothing actionable, reply exactly: HEARTBEAT_OK

Quiet hours:
- 9:00 PM to 8:00 AM (America/New_York)
- During quiet hours, only alert for urgent issues (critical failures, time-sensitive missed lead response).

Keep heartbeat messages concise (max 3 lines unless critical).
