#!/usr/bin/env python3
"""Afternoon Plumbing Website Audit"""

import os
import re
from pathlib import Path

BASE_DIR = Path('/root/.openclaw/workspace/Afternoon-Plumbing-Website')

# Required pages
SERVICE_PAGES = [
    'water-softener-installation-westminster-md.html',
    'water-heater-replacement-westminster-md.html',
    'well-pump-repair-westminster-md.html',
    'acid-neutralizer-installation-westminster-md.html',
    'hose-bib-replacement-westminster-md.html'
]
REQUIRED_PAGES = SERVICE_PAGES + ['contact.html', 'index.html']

results = {
    'pages': {},
    'navigation_issues': [],
    'structured_missing': [],
    'css_issues': [],
    'images_missing': [],
    'broken_links': [],
    'email_button': False,
    'console_issues': []
}

def read_html(page):
    path = BASE_DIR / page
    if not path.exists():
        return None
    try:
        return path.read_text(encoding='utf-8', errors='ignore')
    except:
        return None

print('='*60)
print('WEBSITE AUDIT: Afternoon Plumbing')
print('='*60)

# 1. Page existence
print('\n📄 Page Existence & Readability:')
for page in REQUIRED_PAGES:
    content = read_html(page)
    if content and '<!doctype html>' in content.lower():
        results['pages'][page] = True
        print(f'✅ PASS: {page}')
    else:
        results['pages'][page] = False
        print(f'❌ FAIL: {page} missing or invalid')

# 2. Navigation consistency
print('\n🧭 Navigation Consistency:')
for page in REQUIRED_PAGES:
    content = read_html(page)
    if not content:
        continue
    issues = []
    if 'services.html' not in content:
        issues.append('Services')
    if 'faq.html' not in content:
        issues.append('FAQ')
    if 'contact.html' not in content:
        issues.append('Contact')
    if issues:
        results['navigation_issues'].append(f'{page} missing: {", ".join(issues)}')
        print(f'  ⚠️  {page} missing links: {", ".join(issues)}')
if not results['navigation_issues']:
    print('✅ PASS: All pages include Services, FAQ, Contact links')
else:
    print('❌ FAIL: Some pages missing navigation links')

# 3. Structured data
print('\n🔎 Structured Data (schema.org):')
for page in SERVICE_PAGES:
    content = read_html(page)
    if content and 'type="application/ld+json"' in content and '"@type": "Service"' in content:
        print(f'✅ PASS: {page} has Service schema')
    else:
        results['structured_missing'].append(page)
        print(f'❌ FAIL: {page} missing Service schema')
for page in ['contact.html', 'index.html']:
    content = read_html(page)
    if content and 'type="application/ld+json"' in content:
        print(f'✅ PASS: {page} has structured data')
    else:
        results['structured_missing'].append(page)
        print(f'❌ FAIL: {page} missing structured data')

# 4. CSS
print('\n🎨 CSS Loading:')
# Index uses external CSS
index_content = read_html('index.html')
if index_content and 'index-CDFYR2ld.css' in index_content:
    print('✅ PASS: index.html references main CSS')
else:
    print('❌ FAIL: index.html missing main CSS reference')
# Contact and service pages use embedded CSS
for page in ['contact.html'] + SERVICE_PAGES:
    content = read_html(page)
    if content and '<style>' in content:
        print(f'✅ PASS: {page} has embedded CSS')
    else:
        print(f'❌ FAIL: {page} missing CSS')

# 5. Images
print('\n🖼️ Images:')
# Build set of existing images (lowercase)
image_dir = BASE_DIR / 'images'
existing_images = set(f.name.lower() for f in image_dir.iterdir() if f.is_file())
missing_images = set()
for page in REQUIRED_PAGES:
    content = read_html(page)
    if not content:
        continue
    # Find all /images/FILENAME references
    for match in re.finditer(r'src=["\']?/images/([^"\'>\s]+)', content):
        img = match.group(1).lower()
        if img not in existing_images:
            missing_images.add(img)
            print(f'  ⚠️  {page} references missing: /images/{img}')
if not missing_images:
    print('✅ PASS: All referenced images exist')
else:
    print(f'❌ FAIL: {len(missing_images)} missing image(s)')

# 6. Internal links
print('\n🔗 Internal Links:')
broken_links = []
for page in REQUIRED_PAGES + ['services.html', 'faq.html']:
    content = read_html(page)
    if not content:
        continue
    # Find href="something.html" (not external, tel, mailto, #anchor)
    for match in re.finditer(r'href=["\']([^"\'#]+\.html)["\']', content):
        href = match.group(1)
        # Skip external
        if href.startswith('http://') or href.startswith('https://'):
            continue
        # Skip tel/mailto
        if href.startswith('tel:') or href.startswith('mailto:'):
            continue
        # Resolve path
        if href.startswith('/'):
            target = BASE_DIR / href[1:]
        else:
            target = (BASE_DIR / page).parent / href
        target = target.resolve()
        if not target.exists():
            broken_links.append(f'{page} -> {href}')
            print(f'  ⚠️  {page} -> {href} (broken)')
if not broken_links:
    print('✅ PASS: No broken internal links')
else:
    print(f'❌ FAIL: {len(broken_links)} broken link(s)')

# 7. Contact email button
print('\n📧 Contact Email Button:')
contact_content = read_html('contact.html')
if contact_content and 'mailto:afternoonplumbingcc@gmail.com' in contact_content:
    print('✅ PASS: contact.html has email button (mailto)')
else:
    print('❌ FAIL: contact.html missing email button')

# 8. Console error patterns
print('\n⚠️  Console Error Patterns:')
console_issues = 0
for page in REQUIRED_PAGES:
    content = read_html(page)
    if content and re.search(r'console\.error|throw new Error|uncaught|ReferenceError|TypeError', content):
        print(f'  ⚠️  {page} contains potential error code')
        console_issues += 1
if console_issues == 0:
    print('✅ PASS: No obvious JS error patterns found')
else:
    print(f'ℹ️  {console_issues} page(s) with potential errors')

# Summary
print('\n' + '='*60)
print('SUMMARY')
print('='*60)
# Count checks
checks = {
    'pages': all(results['pages'].values()),
    'navigation': len(results['navigation_issues']) == 0,
    'structured': len(results['structured_missing']) == 0,
    'css': len(results['css_issues']) == 0,
    'images': len(missing_images) == 0,
    'links': len(broken_links) == 0,
    'email': contact_content and 'mailto:afternoonplumbingcc@gmail.com' in contact_content,
    'console': console_issues == 0
}
passed = sum(1 for v in checks.values() if v)
failed = sum(1 for v in checks.values() if not v)
print(f'✅ Passed: {passed}/8')
print(f'❌ Failed: {failed}/8')
print()
if failed == 0:
    print('🏆 OVERALL RESULT: ✅ PASS')
    exit(0)
else:
    print('🏆 OVERALL RESULT: ❌ FAIL')
    exit(1)
