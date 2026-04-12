#!/usr/bin/env node
/**
 * Afternoon Plumbing Website Audit
 * Validates: service pages, contact page, CSS, images, navigation, links, structured data, console errors
 */

const fs = require('fs');
const path = require('path');

const BASE_DIR = '/root/.openclaw/workspace/Afternoon-Plumbing-Website';

// Required service pages
const SERVICE_PAGES = [
  'water-softener-installation-westminster-md.html',
  'water-heater-replacement-westminster-md.html',
  'well-pump-repair-westminster-md.html',
  'acid-neutralizer-installation-westminster-md.html',
  'hose-bib-replacement-westminster-md.html'
];

const REQUIRED_PAGES = [...SERVICE_PAGES, 'contact.html', 'index.html'];

// Results collector
const results = {
  pages: {},
  navigation: { consistent: true, issues: [] },
  structuredData: { present: [], missing: [] },
  css: { loaded: true, issues: [] },
  images: { allExist: true, missing: [] },
  internalLinks: { broken: [] },
  consoleErrors: { issues: [] },
  overall: { pass: true, fails: 0 }
};

// Helper: read HTML file
function readHTML(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return null;
  }
}

// Helper: extract all href/src URLs from HTML
function extractURLs(html, attr) {
  const regex = new RegExp(`${attr}=["']([^"']+)["']`, 'gi');
  const matches = [];
  let m;
  while ((m = regex.exec(html)) !== null) {
    matches.push(m[1]);
  }
  return matches;
}

// 1. Check all required pages exist and can be read
console.log('\\n🔍 Checking page existence and readability...');
REQUIRED_PAGES.forEach(page => {
  const fullPath = path.join(BASE_DIR, page);
  const exists = fs.existsSync(fullPath);
  const content = exists ? readHTML(fullPath) : null;
  const readable = content && content.includes('<!doctype html');
  results.pages[page] = { exists, readable, missing: !exists || !readable };
  if (!exists || !readable) results.overall.pass = false;
});

// 2. Check navigation consistency
console.log('\\n🔍 Checking navigation consistency...');
const navLinkPatterns = {
  services: /services\.html/,
  faq: /faq\.html/,
  contact: /contact\.html/
};

function extractNavLinks(html) {
  const navMatches = html.match(/<nav[\s\S]*?<\/nav>/i) || [];
  const navText = navMatches.join('');
  const links = {};
  if (navText.includes('Services')) links.services = true;
  if (navText.includes('FAQ')) links.faq = true;
  if (navText.includes('Contact')) links.contact = true;
  return links;
}

REQUIRED_PAGES.forEach(page => {
  const content = results.pages[page].readable ? readHTML(path.join(BASE_DIR, page)) : '';
  if (!content) return;
  const nav = extractNavLinks(content);
  if (!nav.services) results.navigation.issues.push(`${page} missing Services link`);
  if (!nav.faq) results.navigation.issues.push(`${page} missing FAQ link`);
  if (!nav.contact) results.navigation.issues.push(`${page} missing Contact link`);
});

if (results.navigation.issues.length > 0) results.navigation.consistent = false;

// 3. Check structured data on service pages
console.log('\\n🔍 Checking structured data (schema.org)...');
SERVICE_PAGES.forEach(page => {
  const content = readHTML(path.join(BASE_DIR, page));
  if (!content) return;
  const hasLdJson = content.includes('type="application/ld+json"');
  const hasServiceSchema = content.includes('"@type": "Service"') || content.includes('"@type":"Service"');
  if (hasLdJson && hasServiceSchema) {
    results.structuredData.present.push(page);
  } else {
    results.structuredData.missing.push(page);
    results.overall.pass = false;
  }
});

// Also confirm contact and index have schema
['contact.html', 'index.html'].forEach(page => {
  const content = readHTML(path.join(BASE_DIR, page));
  if (content && content.includes('type="application/ld+json"')) {
    results.structuredData.present.push(page);
  }
});

// 4. Check CSS loading
console.log('\\n🔍 Checking CSS loading...');
const cssPath = path.join(BASE_DIR, 'assets', 'index-CDFYR2ld.css');
const cssExists = fs.existsSync(cssPath);
if (!cssExists) {
  results.css.loaded = false;
  results.css.issues.push('Main CSS file not found: assets/index-CDFYR2ld.css');
  results.overall.pass = false;
}

// Verify CSS is referenced in pages
REQUIRED_PAGES.forEach(page => {
  const content = readHTML(path.join(BASE_DIR, page));
  if (content && content.includes('index-CDFYR2ld.css')) {
    // OK
  } else if (content) {
    results.css.issues.push(`${page} does not reference main CSS`);
    results.overall.pass = false;
  }
});

// 5. Check all images referenced exist in /images/
console.log('\\n🔍 Checking image references...');
const imageFiles = fs.readdirSync(path.join(BASE_DIR, 'images'));
const imageSet = new Set(imageFiles.map(f => f.toLowerCase()));

function extractImageURLs(html) {
  const urls = extractURLs(html, 'src');
  const imgUrls = urls.filter(u => u.includes('/images/') || u.startsWith('/images/') || u.includes('images/'));
  return imgUrls;
}

let allImagesFound = true;
REQUIRED_PAGES.forEach(page => {
  const content = readHTML(path.join(BASE_DIR, page));
  if (!content) return;
  const imgUrls = extractImageURLs(content);
  imgUrls.forEach(url => {
    const filename = url.split('/').pop().split('?')[0].toLowerCase();
    if (!imageSet.has(filename)) {
      results.images.missing.push({ page, image: filename });
      allImagesFound = false;
    }
  });
});
results.images.allExist = allImagesFound;
if (!allImagesFound) results.overall.pass = false;

// 6. Check for broken internal links (same-site absolute or relative)
console.log('\\n🔍 Checking internal links...');
const internalLinkRegex = /href=["'](\/([^"']+\.html)|(#[^"']+)|([^"']+\.html))["']/gi;
let m;
REQUIRED_PAGES.forEach(page => {
  const content = readHTML(path.join(BASE_DIR, page));
  if (!content) return;
  while ((m = internalLinkRegex.exec(content)) !== null) {
    let href = m[1];
    if (!href) continue;
    // Skip anchors
    if (href.startsWith('#')) continue;
    // Skip tel: and mailto:
    if (href.startsWith('tel:') || href.startsWith('mailto:')) continue;
    // Resolve relative paths
    let targetPath = href;
    if (!href.startsWith('/')) {
      const pageDir = path.dirname(page);
      targetPath = path.join(pageDir, href);
    }
    // Normalize
    targetPath = targetPath.replace(/\/\/+/g, '/').replace(/^\//, '');
    const fullTarget = path.join(BASE_DIR, targetPath);
    if (!fs.existsSync(fullTarget)) {
      results.internalLinks.broken.push({ from: page, to: href });
      results.overall.pass = false;
    }
  }
});

// 7. Check contact page for email button (mailto link)
console.log('\\n🔍 Checking email button on contact page...');
const contactContent = readHTML(path.join(BASE_DIR, 'contact.html'));
const hasEmailButton = contactContent && contactContent.includes('mailto:afternoonplumbingcc@gmail.com');
results.contactEmailButton = hasEmailButton;
if (!hasEmailButton) {
  results.overall.pass = false;
}

// 8. Check for JavaScript console errors patterns (like common JS errors)
console.log('\\n🔍 Checking for potential console errors in scripts...');
const jsErrorPatterns = [
  /console\.error/gi,
  /throw new Error/gi,
  /uncaught/i,
  /ReferenceError/gi,
  /TypeError/gi
];
REQUIRED_PAGES.forEach(page => {
  const content = readHTML(path.join(BASE_DIR, page));
  if (!content) return;
  jsErrorPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      results.consoleErrors.issues.push(`${page} contains potential console error code`);
    }
  });
});

// Summary
console.log('\\n' + '='.repeat(60));
console.log('AUDIT REPORT: Afternoon Plumbing Website');
console.log('='.repeat(60));

function passFail(status) {
  return status ? '✅ PASS' : '❌ FAIL';
}

console.log(`\\n📄 Page Existence & Validity:`);
REQUIRED_PAGES.forEach(page => {
  const p = results.pages[page];
  console.log(`  ${passFail(p.exists && p.readable)} ${page}`);
});

console.log(`\\n🧭 Navigation Consistency:`);
console.log(`  ${passFail(results.navigation.consistent)} All pages include Services, FAQ, Contact links`);
if (results.navigation.issues.length) {
  results.navigation.issues.forEach(issue => console.log(`    ⚠️ ${issue}`));
}

console.log(`\\n🔎 Structured Data (schema.org):`);
SERVICE_PAGES.forEach(page => {
  const has = results.structuredData.present.includes(page);
  console.log(`  ${passFail(has)} ${page} (Service)`);
});
['contact.html', 'index.html'].forEach(page => {
  const has = results.structuredData.present.includes(page);
  console.log(`  ${passFail(has)} ${page} (Other)`);
});

console.log(`\\n🎨 CSS Loading:`);
console.log(`  ${passFail(results.css.loaded)} assets/index-CDFYR2ld.css exists`);
if (results.css.issues.length) {
  results.css.issues.forEach(issue => console.log(`    ⚠️ ${issue}`));
}

console.log(`\\n🖼️ Images:`);
console.log(`  ${passFail(results.images.allExist)} All referenced images exist in /images/`);
if (!results.images.allExist) {
  results.images.missing.forEach(m => {
    console.log(`    ⚠️ ${m.page}: missing ${m.image}`);
  });
}

console.log(`\\n🔗 Internal Links:`);
console.log(`  ${passFail(results.internalLinks.broken.length === 0)} No broken internal links`);
if (results.internalLinks.broken.length) {
  results.internalLinks.broken.forEach(l => {
    console.log(`    ⚠️ ${l.from} -> ${l.to} (broken)`);
  });
}

console.log(`\\n📧 Contact Email Button:`);
console.log(`  ${passFail(results.contactEmailButton)} contact.html contains email button (mailto)`);

console.log(`\\n⚠️ Console Errors Check:`);
console.log(`  ${passFail(results.consoleErrors.issues.length === 0)} No obvious JS error patterns found`);
if (results.consoleErrors.issues.length) {
  results.consoleErrors.issues.forEach(i => console.log(`    ⚠️ ${i}`));
}

console.log('\\n' + '='.repeat(60));
console.log(`\\n🏆 OVERALL RESULT: ${results.overall.pass ? '✅ PASS' : '❌ FAIL'}`);
console.log('='.repeat(60));

// Exit with appropriate code
process.exit(results.overall.pass ? 0 : 1);
