#!/bin/bash
# Transcribe voice notes in .ogg format from inbound media folder

INPUT_DIR="/root/.openclaw/media/inbound"
OUTPUT_DIR="/root/.openclaw/workspace/transcribed"
MODEL="base"  # Options: tiny, base, small, medium, large

mkdir -p "$OUTPUT_DIR"

echo "=== Starting Whisper transcription ==="
echo "Input: $INPUT_DIR"
echo "Output: $OUTPUT_DIR"
echo ""

# Check if any ogg files exist
shopt -s nullglob
ogg_files=("$INPUT_DIR"/*.ogg)
shopt -u nullglob

if [[ ${#ogg_files[@]} -eq 0 ]]; then
  echo "No .ogg files found in $INPUT_DIR"
  exit 0
fi

echo "Found ${#ogg_files[@]} file(s) to process"
echo ""

for file in "${ogg_files[@]}"; do
  filename=$(basename "$file" .ogg)
  output_txt="$OUTPUT_DIR/${filename}.txt"
  
  if [[ -f "$output_txt" ]]; then
    echo "✓ Already transcribed: $filename"
    continue
  fi
  
  echo "Transcribing: $filename..."
  
  # Convert ogg to mp3 using ffmpeg (if available)
  if command -v ffmpeg &> /dev/null; then
    temp_mp3="/tmp/${filename}.mp3"
    ffmpeg -y -i "$file" -ar 16000 -ac 1 "$temp_mp3" 2>/dev/null && \
      whisper "$temp_mp3" --model "$MODEL" --output_dir "$OUTPUT_DIR" --output_format txt --language en 2>/dev/null && \
      rm -f "$temp_mp3"
  else
    # Fallback: use whisper directly on ogg (newer versions support it)
    whisper "$file" --model "$MODEL" --output_dir "$OUTPUT_DIR" --output_format txt --language en 2>/dev/null
  fi
  
  # Move result if needed
  if [[ -f "$OUTPUT_DIR/${filename}.txt" ]]; then
    echo "  → $filename.txt created"
  else
    echo "  ✗ Failed to transcribe $filename"
  fi
done

echo ""
echo "=== Transcription complete ==="
