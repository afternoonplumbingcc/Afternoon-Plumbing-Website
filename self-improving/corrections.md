# Corrections Log

Last updated: 2026-04-12 23:59 UTC

---

## 2026-04-12

- **Context:** Cron job health review for Night Anti-Snack Reminder
- **Observation:** Job shows `consecutiveErrors: 3` with `lastError: "FallbackSummaryError: All models failed..."`
- **Lesson:** Rate-limit or billing errors on isolated cron jobs should trigger a human alert during heartbeat review, even if the job is configured to run in isolation.
- **Action:** Flag failed jobs in heartbeat summary with specific error reason and next steps.

---

## Template for future entries

```
- **Context:** [type of task or review]
- **Observation:** [what went wrong or could be better]
- **Lesson:** [what to do differently next time]
- **Action:** [how to prevent recurrence]
```
