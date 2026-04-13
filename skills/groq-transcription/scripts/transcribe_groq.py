#!/usr/bin/env python3
import json
import os
import subprocess
import sys
from pathlib import Path

MODEL = os.environ.get("GROQ_TRANSCRIBE_MODEL", "whisper-large-v3")
API_URL = "https://api.groq.com/openai/v1/audio/transcriptions"


def die(msg, code=1):
    print(msg, file=sys.stderr)
    sys.exit(code)


def main():
    if len(sys.argv) != 2:
        die("Usage: transcribe_groq.py <audio-file>")

    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        die("GROQ_API_KEY is not set")

    audio_file = Path(sys.argv[1])
    if not audio_file.exists():
        die(f"Audio file not found: {audio_file}")

    cmd = [
        "curl", "-sS", API_URL,
        "-H", f"Authorization: Bearer {api_key}",
        "-F", f"file=@{audio_file}",
        "-F", f"model={MODEL}",
    ]

    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        die(f"curl failed: {proc.stderr.strip() or proc.stdout.strip()}")

    try:
        payload = json.loads(proc.stdout)
    except json.JSONDecodeError:
        die(f"Unexpected response: {proc.stdout[:500]}")

    if "error" in payload:
        die(f"Groq API error: {json.dumps(payload)}")

    text = payload.get("text")
    if not text:
        die(f"No transcript returned: {json.dumps(payload)}")

    print(text.strip())


if __name__ == "__main__":
    main()
