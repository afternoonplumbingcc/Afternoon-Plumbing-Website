#!/bin/bash
# Afternoon Plumbing Website Audit

BASE_DIR="/root/.openclaw/workspace/Afternoon-Plumbing-Website"
PASS=0
FAIL=0

check_pass() {
  echo "✅ PASS: $1"
  ((PASS++))
}

check_fail() {
  echo "❌ FAIL: $1"
  ((FAIL++))
}

echo "============================================================"
echo "WEBSITE AUDIT: Afternoon Plumbing"
echo "============================================================"

# 1. Check all required pages exist
echo ""
echo "📄 Page Existence & Readability:"
for page in \
  "water-softener-installation-westminster-md.html" \
  "water-heater-replacement-westminster-md.html" \
  "well-pump-repair-westminster-md.html" \
  "acid-neutralizer-installation-westminster-md.html" \
  "hose-bib-replacement-westminster-md.html" \
  "contact.html" \
  "index.html"
do
  if [ -f "$BASE_DIR/$page" ]; then
    if grep -q "<!doctype html>" "$BASE_DIR/$page"; then
      check_pass "$page exists and is valid HTML"
    else
      check_fail "$page exists but missing doctype"
    fi
  else
    check_fail "$page not found"
  fi
done

# 2. Navigation consistency (all pages must have Services, FAQ, Contact links)
echo ""
echo "🧭 Navigation Consistency:"
nav_issues=0
for page in \
  "water-softener-installation-westminster-md.html" \
  "water-heater-replacement-westminster-md.html" \
  "well-pump-repair-westminster-md.html" \
  "acid-neutralizer-installation-westminster-md.html" \
  "hose-bib-replacement-westminster-md.html" \
  "contact.html" \
  "index.html"
do
  if [ -f "$BASE_DIR/$page" ]; then
    file="$BASE_DIR/$page"
    if grep -q 'services\.html' "$file"; then :; else
      echo "  ⚠️  $page missing Services link"
      ((nav_issues++))
    fi
    if grep -q 'faq\.html' "$file"; then :; else
      echo "  ⚠️  $page missing FAQ link"
      ((nav_issues++))
    fi
    if grep -q 'contact\.html' "$file"; then :; else
      echo "  ⚠️  $page missing Contact link"
      ((nav_issues++))
    fi
  fi
done
if [ $nav_issues -eq 0 ]; then
  check_pass "All pages include Services, FAQ, Contact links"
else
  check_fail "Some pages missing navigation links"
fi

# 3. Structured data on service pages
echo ""
echo "🔎 Structured Data (schema.org):"
for page in \
  "water-softener-installation-westminster-md.html" \
  "water-heater-replacement-westminster-md.html" \
  "well-pump-repair-westminster-md.html" \
  "acid-neutralizer-installation-westminster-md.html" \
  "hose-bib-replacement-westminster-md.html"
do
  file="$BASE_DIR/$page"
  if grep -q 'type="application/ld+json"' "$file" && grep -q '"@type": "Service"' "$file"; then
    check_pass "$page has Service schema"
  else
    check_fail "$page missing Service schema"
  fi
done

# Contact and index have LDJSON but different type
for page in "contact.html" "index.html"; do
  file="$BASE_DIR/$page"
  if grep -q 'type="application/ld+json"' "$file"; then
    check_pass "$page has structured data"
  else
    check_fail "$page missing structured data"
  fi
done

# 4. CSS - Service pages use inline CSS, index.html uses external
echo ""
echo "🎨 CSS Loading:"
# Check index.html uses external CSS
if grep -q 'index-CDFYR2ld.css' "$BASE_DIR/index.html"; then
  check_pass "index.html references main CSS"
else
  check_fail "index.html missing main CSS reference"
fi
# Check contact.html uses inline CSS only (no external reference required)
if grep -q '<style>' "$BASE_DIR/contact.html"; then
  check_pass "contact.html has embedded CSS (self-contained)"
else
  check_fail "contact.html missing CSS"
fi
# Check service pages - they use embedded CSS
for page in \
  "water-softener-installation-westminster-md.html" \
  "water-heater-replacement-westminster-md.html" \
  "well-pump-repair-westminster-md.html" \
  "acid-neutralizer-installation-westminster-md.html" \
  "hose-bib-replacement-westminster-md.html"
do
  file="$BASE_DIR/$page"
  if grep -q '<style>' "$file"; then
    check_pass "$page has embedded CSS (self-contained)"
  else
    check_fail "$page missing CSS"
  fi
done

# 5. Images
echo ""
echo "🖼️ Images:"
# Build list of image files (lowercase)
image_files=$(ls "$BASE_DIR/images" | tr '[:upper:]' '[:lower:]')
missing_count=0
for page in \
  "water-softener-installation-westminster-md.html" \
  "water-heater-replacement-westminster-md.html" \
  "well-pump-repair-westminster-md.html" \
  "acid-neutralizer-installation-westminster-md.html" \
  "hose-bib-replacement-westminster-md.html" \
  "contact.html" \
  "index.html"
do
  file="$BASE_DIR/$page"
  # Extract src="/images/FILE" patterns
  grep -oE 'src=["'"'"']\/images\/[^"'"'"']+' "$file" 2>/dev/null | while read -r img; do
    img_file=$(echo "$img" | sed "s/src=[\"']\\/images\\///" | tr '[:upper:]' '[:lower:]')
    if ! echo "$image_files" | grep -q "^$img_file$"; then
      echo "  ⚠️  $page references missing image: /images/$img_file"
      ((missing_count++))
    fi
  done
done
if [ $missing_count -eq 0 ]; then
  check_pass "All referenced images exist in /images/"
else
  check_fail "Some images missing (see above)"
fi

# 6. Internal links
echo ""
echo "🔗 Internal Links:"
broken_count=0
# Check each page for links to other .html files
for page in \
  "water-softener-installation-westminster-md.html" \
  "water-heater-replacement-westminster-md.html" \
  "well-pump-repair-westminster-md.html" \
  "acid-neutralizer-installation-westminster-md.html" \
  "hose-bib-replacement-westminster-md.html" \
  "contact.html" \
  "index.html" \
  "services.html" \
  "faq.html"
do
  if [ ! -f "$BASE_DIR/$page" ]; then continue; fi
  file="$BASE_DIR/$page"
  # Extract href to .html files (not external)
  grep -oE 'href=["'"'"']([^"'"'"]+\.html)["'"'"]' "$file" 2>/dev/null | while read -r href_attr; do
    href=$(echo "$href_attr" | sed -E "s/href=[\"']//;s/[\"']$//")
    # Skip external, tel, mailto, anchors
    if [[ "$href" =~ ^https?:// ]] || [[ "$href" =~ ^tel: ]] || [[ "$href" =~ ^mailto: ]] || [[ "$href" =~ ^# ]] || [[ -z "$href" ]]; then
      continue
    fi
    # Resolve relative
    if [[ "$href" =~ ^/ ]]; then
      target="$BASE_DIR$href"
    else
      dir=$(dirname "$file")
      target="$dir/$href"
    fi
    target=$(echo "$target" | sed 's/\/\//\//g')
    if [ ! -f "$target" ]; then
      echo "  ⚠️  $page -> $href (broken)"
      ((broken_count++))
    fi
  done
done
if [ $broken_count -eq 0 ]; then
  check_pass "No broken internal links"
else
  check_fail "Broken internal links found (see above)"
fi

# 7. Contact email button
echo ""
echo "📧 Contact Email Button:"
if grep -q 'mailto:afternoonplumbingcc@gmail.com' "$BASE_DIR/contact.html"; then
  check_pass "contact.html has email button (mailto)"
else
  check_fail "contact.html missing email button"
fi

# 8. Console errors (basic pattern check)
echo ""
echo "⚠️  Console Error Patterns:"
console_issues=0
for page in \
  "water-softener-installation-westminster-md.html" \
  "water-heater-replacement-westminster-md.html" \
  "well-pump-repair-westminster-md.html" \
  "acid-neutralizer-installation-westminster-md.html" \
  "hose-bib-replacement-westminster-md.html" \
  "contact.html" \
  "index.html"
do
  file="$BASE_DIR/$page"
  if grep -qE 'console\.error|throw new Error|uncaught|ReferenceError|TypeError' "$file"; then
    echo "  ⚠️  $page contains potential error code"
    ((console_issues++))
  fi
done
if [ $console_issues -eq 0 ]; then
  check_pass "No obvious JS error patterns found"
else
  echo "  ℹ️  Review the above pages for potential runtime errors"
fi

# Summary
echo ""
echo "============================================================"
echo "SUMMARY"
echo "============================================================"
echo "✅ Passed: $PASS"
echo "❌ Failed: $FAIL"
echo ""
if [ $FAIL -eq 0 ]; then
  echo "🏆 OVERALL RESULT: ✅ PASS"
  exit 0
else
  echo "🏆 OVERALL RESULT: ❌ FAIL"
  exit 1
fi
