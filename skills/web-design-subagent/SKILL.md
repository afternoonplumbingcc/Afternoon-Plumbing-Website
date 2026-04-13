---
name: web-design-subagent
description: Create a specialized web design subagent for production-grade frontend UI generation. Use when the user wants to turn a design prompt into a reusable skill for building visually exceptional HTML, CSS, JavaScript, React, or full-page frontend interfaces.
---

# Web Design Subagent

Create a focused subagent skill that produces polished frontend interfaces only.

## Build the skill around one job

- Generate working HTML/CSS/JS or React code only.
- Favor bold, specific art direction over safe defaults.
- Keep the prompt/output contract strict and reusable.

## Include in the skill

- A concise system prompt for the subagent.
- The expected input fields: `type`, `purpose`, `content`, `constraints`, `tone`.
- Required output rules: one complete code block, no explanation outside code.
- Design constraints that prevent generic output.

## Recommended bundled content

- `references/prompt-template.md` for the reusable prompt template.
- Optional example briefs for landing pages, dashboards, and components.

## Editing guidance

- Keep the skill lean.
- Put reusable wording in references if it may change often.
- Make the triggering description broad enough to catch website and UI requests, but narrow enough to avoid general coding tasks.
