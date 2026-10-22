#!/bin/bash
# Afternoon Plumbing Website Audit
# Resolves paths relative to this script, so it runs from any directory.

BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
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

# Pages that must exist and be valid HTML
REQUIRED_PAGES=(
  "service-pages/water-softener-installation-westminster-md.html"
  "service-pages/water-heater-replacement-westminster-md.html"
  "service-pages/well-pump-repair-westminster-md.html"
  "service-pages/acid-neutralizer-installation-westminster-md.html"
  "service-pages/hose-bib-replacement-westminster-md.html"
  "contact/contact.html"
  "index.html"
)

# Pages that carry Service schema
SERVICE_PAGES=(
  "service-pages/water-softener-installation-westminster-md.html"
  "service-pages/water-heater-replacement-westminster-md.html"
  "service-pages/well-pump-repair-westminster-md.html"
  "service-pages/acid-neutralizer-installation-westminster-md.html"
  "service-pages/hose-bib-replacement-westminster-md.html"
)

# Pages that are checked for nav links, images, and console error patterns
AUDITED_PAGES=(
  "service-pages/water-softener-installation-westminster-md.html"
  "service-pages/water-heater-replacement-westminster-md.html"
  "service-pages/well-pump-repair-westminster-md.html"
  "service-pages/acid-neutralizer-installation-westminster-md.html"
  "service-pages/hose-bib-replacement-westminster-md.html"
  "contact/contact.html"
  "index.html"
  "services.html"
  "faq/faq.html"
)

echo "============================================================"
echo "WEBSITE AUDIT: Afternoon Plumbing"
echo "============================================================"

# 1. Page existence and readability
echo ""
echo "📄 Page Existence & Readability:"
for page in "${REQUIRED_PAGES[@]}"; do
  if [ -f "$BASE_DIR/$page" ]; then
    if grep -qi "<!doctype html>" "$BASE_DIR/$page"; then
      check_pass "$page exists and is valid HTML"
    else
      check_fail "$page exists but missing doctype"
    fi
  else
    check_fail "$page not found"
  fi
done

# 2. Navigation consistency
echo ""
echo "🧭 Navigation Consistency:"
nav_issues=0
for page in "${REQUIRED_PAGES[@]}"; do
  [ -f "$BASE_DIR/$page" ] || continue
  file="$BASE_DIR/$page"
  for link in "services\.html" "faq\.html" "contact\.html"; do
    if ! grep -q "$link" "$file"; then
      echo "  ⚠️  $page missing $link link"
      ((nav_issues++))
    fi
  done
done
if [ $nav_issues -eq 0 ]; then
  check_pass "All pages include Services, FAQ, Contact links"
else
  check_fail "Some pages missing navigation links"
fi

# 3. Structured data
echo ""
echo "🔎 Structured Data (schema.org):"
for page in "${SERVICE_PAGES[@]}"; do
  file="$BASE_DIR/$page"
  if grep -q 'type="application/ld+json"' "$file" && grep -q '"@type": *"Service"' "$file"; then
    check_pass "$page has Service schema"
  else
    check_fail "$page missing Service schema"
  fi
done

for page in "contact/contact.html" "index.html"; do
  file="$BASE_DIR/$page"
  if grep -q 'type="application/ld+json"' "$file"; then
    check_pass "$page has structured data"
  else
    check_fail "$page missing structured data"
  fi
done

# 4. CSS loading
# index.html loads a compiled bundle stylesheet; other pages load shared
# stylesheets from /styles/. A page is styled if it links a stylesheet
# or carries an embedded <style> block.
echo ""
echo "🎨 CSS Loading:"
if grep -q 'index-CDFYR2ld.css' "$BASE_DIR/index.html"; then
  check_pass "index.html references main CSS"
else
  check_fail "index.html missing main CSS reference"
fi

for page in "contact/contact.html" "${SERVICE_PAGES[@]}"; do
  file="$BASE_DIR/$page"
  if grep -qE '<link[^>]+href="[^"]*\.css' "$file" || grep -q '<style>' "$file"; then
    check_pass "$page has CSS"
  else
    check_fail "$page missing CSS"
  fi
done

# 5. Images
# Extract /images/... references, URL-decode them, and confirm the file
# exists on disk.
echo ""
echo "🖼️ Images:"
missing_count=0
for page in "${AUDITED_PAGES[@]}"; do
  file="$BASE_DIR/$page"
  [ -f "$file" ] || continue
  while IFS= read -r img_path; do
    [ -z "$img_path" ] && continue
    decoded=$(printf '%s' "$img_path" | sed -e 's/%20/ /g' -e 's/%2B/+/g' -e 's/%28/(/g' -e 's/%29/)/g')
    if [ ! -f "$BASE_DIR/images/$decoded" ]; then
      echo "  ⚠️  $page references missing image: /images/$decoded"
      ((missing_count++))
    fi
  done < <(grep -oE "src=[\"']/images/[^\"']+" "$file" 2>/dev/null | sed -E "s/src=[\"']\/images\///")
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
for page in "${AUDITED_PAGES[@]}"; do
  file="$BASE_DIR/$page"
  [ -f "$file" ] || continue
  while IFS= read -r href; do
    [ -z "$href" ] && continue
    # Skip external, tel, mailto, anchors
    case "$href" in
      http://*|https://*|tel:*|mailto:*|\#*) continue ;;
    esac
    if [[ "$href" == /* ]]; then
      target="$BASE_DIR$href"
    else
      target="$(dirname "$file")/$href"
    fi
    if [ ! -f "$target" ]; then
      echo "  ⚠️  $page -> $href (broken)"
      ((broken_count++))
    fi
  done < <(grep -oE "href=[\"']([^\"']+\.html)[\"']" "$file" 2>/dev/null | sed -E "s/^href=[\"']//; s/[\"']$//")
done
if [ $broken_count -eq 0 ]; then
  check_pass "No broken internal links"
else
  check_fail "Broken internal links found (see above)"
fi

# 7. Contact email button
echo ""
echo "📧 Contact Email Button:"
if grep -q 'mailto:afternoonplumbingcc@gmail.com' "$BASE_DIR/contact/contact.html"; then
  check_pass "contact.html has email button (mailto)"
else
  check_fail "contact.html missing email button"
fi

# 8. Console error patterns
echo ""
echo "⚠️  Console Error Patterns:"
console_issues=0
for page in "${AUDITED_PAGES[@]}"; do
  file="$BASE_DIR/$page"
  [ -f "$file" ] || continue
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
