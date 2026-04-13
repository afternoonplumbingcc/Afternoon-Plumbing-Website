---
name: groq-transcription
description: Transcribe audio files with Groq speech-to-text using the GROQ_API_KEY environment variable. Use when the user sends voice notes, audio attachments, or asks to convert speech audio into text. Use when a local script should call Groq's audio transcription endpoint for .ogg, .mp3, .wav, .m4a, or similar files.
---

Use this skill to transcribe audio files through Groq.

## Workflow

1. Confirm `GROQ_API_KEY` is available in the environment before calling the script.
2. Run `scripts/transcribe_groq.py <audio-file>`.
3. If transcription fails, briefly report the error.
4. If transcription succeeds, treat the transcript as the user’s prompt and continue by answering or acting on it normally.

## Notes

- Prefer this skill when the user sends Telegram voice notes or audio attachments.
- The bundled script uses `curl` because it is more reliable in this environment than the earlier raw Python multipart request.
- If Groq returns an API error, report the exact issue briefly.
- Resolve relative script paths against this skill directory.
