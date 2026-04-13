#!/usr/bin/env node
/**
 * Site Consistency Review Tool
 * Validates HTML, CSS, JS, and content against project standards
 */

const fs = require('fs');
const path = require('path');

// ANSI colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

// Load configuration from .site-consistency.json or use defaults
function loadConfig(projectRoot) {
  const configPath = path.join(projectRoot, '.site-consistency.json');
  const defaults = {
    project: 'Untitled Project',
    designSystem: {
      primaryColor: '#0f4c81',
      fontFamily: 'Inter, system-ui, sans-serif',
      maxWidth: '1200px',
      borderRadius: '12px'
    },
    seo: {
      requiredMeta: ['title', 'description', 'viewport', 'charset'],
      maxTitleLength: 70,
      maxDescriptionLength: 160
    },
    accessibility: {
      requireAltText: true,
      minContrastRatio: 4.5,
      requireAria: false,
      requireH1: true,
      maxH1PerPage: 1
    },
    performance: {
      maxImageSizeKB: 150,
      requireLazyLoading: true,
      allowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif'],
      warnOnLargeImages: true
    },
    content: {
      phoneNumberPattern: '^\\d{3}-\\d{3}-\\d{4}$',
      requiredLinks: [],
      avoidTerms: ['#1', 'best', 'guaranteed', 'cheap'],
      tone: 'professional'
    }
  };

  if (fs.existsSync(configPath)) {
    try {
      const userConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return deepMerge(defaults, userConfig);
    } catch (err) {
      log(`Warning: Could not parse config file: ${err.message}`, colors.yellow);
    }
  }

  return defaults;
}

function deepMerge(target, source) {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        else output[key] = deepMerge(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

// Parse HTML and run checks
function reviewHTML(content, filePath, config) {
  const issues = [];
  const lines = content.split('\n');

  // Check for DOCTYPE
  if (!content.trim().toLowerCase().startsWith('<!doctype html>')) {
    issues.push({ line: 1, message: 'Missing DOCTYPE declaration', severity: 'error' });
  }

  // Check for <html lang="">
  if (!/<html[^>]+lang=/.test(content)) {
    issues.push({ line: 1, message: 'Missing lang attribute on <html>', severity: 'warning' });
  }

  // Check for charset meta
  if (!/<meta[^>]+charset/i.test(content)) {
    issues.push({ line: 1, message: 'Missing charset meta tag', severity: 'error' });
  }

  // Check for viewport meta
  if (!/<meta[^>]+viewport/i.test(content)) {
    issues.push({ line: 1, message: 'Missing viewport meta tag', severity: 'error' });
  }

  // Count H1 tags
  const h1Matches = content.match(/<h1[^>]*>/gi) || [];
  if (config.accessibility.requireH1 && h1Matches.length === 0) {
    issues.push({ line: 1, message: 'Missing H1 heading', severity: 'warning' });
  } else if (h1Matches.length > config.accessibility.maxH1PerPage) {
    issues.push({ line: 1, message: `Too many H1 tags (${h1Matches.length}, max ${config.accessibility.maxH1PerPage})`, severity: 'warning' });
  }

  // Check title length
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  if (titleMatch) {
    const title = titleMatch[1];
    if (title.length > config.seo.maxTitleLength) {
      issues.push({ line: getLineNumber(content, titleMatch.index), message: `Title too long (${title.length} chars, max ${config.seo.maxTitleLength})`, severity: 'warning' });
    }
  } else {
    issues.push({ line: 1, message: 'Missing <title> tag', severity: 'error' });
  }

  // Check meta description
  const descMatch = content.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i);
  if (descMatch) {
    const desc = descMatch[1];
    if (desc.length > config.seo.maxDescriptionLength) {
      issues.push({ line: getLineNumber(content, descMatch.index), message: `Meta description too long (${desc.length} chars, max ${config.seo.maxDescriptionLength})`, severity: 'warning' });
    }
    if (desc.length < 50) {
      issues.push({ line: getLineNumber(content, descMatch.index), message: 'Meta description too short (<50 chars)', severity: 'info' });
    }
  } else {
    issues.push({ line: 1, message: 'Missing meta description', severity: 'warning' });
  }

  // Check images for alt text
  const imgTags = content.match(/<img[^>]+>/gi) || [];
  imgTags.forEach((img, index) => {
    if (config.accessibility.requireAltText && !/alt=/.test(img)) {
      const line = getLineNumber(content, img);
      issues.push({ line, message: 'Image missing alt attribute', severity: config.accessibility.requireAltText ? 'error' : 'warning' });
    }
    // Check for lazy loading
    if (config.performance.requireLazyLoading && !/loading=/.test(img) && !/lazy/.test(img)) {
      const line = getLineNumber(content, img);
      issues.push({ line, message: 'Image missing loading="lazy"', severity: 'warning' });
    }
  });

  // Check for external script blocking
  const externalScripts = content.match(/<script[^>]+src=["']https?:/gi) || [];
  if (externalScripts.length > 3) {
    issues.push({ line: 1, message: `Multiple external scripts (${externalScripts.length}) may slow page load`, severity: 'info' });
  }

  // Check for inline styles (prefer classes)
  const inlineStyles = content.match(/style="[^"]+"/g) || [];
  if (inlineStyles.length > 10) {
    issues.push({ line: 1, message: `Many inline styles (${inlineStyles.length}) — consider moving to CSS classes`, severity: 'info' });
  }

  return issues;
}

// Parse CSS and check for issues
function reviewCSS(content, filePath, config) {
  const issues = [];

  // Check for !important abuse
  const importantCount = (content.match(/!important/g) || []).length;
  if (importantCount > 5) {
    issues.push({ line: 1, message: `Excessive !important declarations (${importantCount})`, severity: 'warning' });
  }

  // Check for magic numbers (hardcoded values that should be variables)
  // Simple heuristic: many hardcoded pixels could indicate lack of design tokens
  const hardcodedPixels = content.match(/\b\d+px\b/g) || [];
  if (hardcodedPixels.length > 50) {
    issues.push({ line: 1, message: `Many hardcoded px values (${hardcodedPixels.length}) — consider CSS custom properties`, severity: 'info' });
  }

  // Check for vendor prefixes (could use autoprefixer)
  const vendorPrefixes = content.match(/(-webkit-|-moz-|-ms-)/g) || [];
  if (vendorPrefixes.length > 10) {
    issues.push({ line: 1, message: `Many vendor prefixes (${vendorPrefixes.length}) — use autoprefixer`, severity: 'info' });
  }

  // Check for universal selector
  if (content.includes('* {') || content.match(/\*\s*{/)) {
    issues.push({ line: 1, message: 'Universal selector (*) can hurt performance', severity: 'warning' });
  }

  return issues;
}

// Review JS files
function reviewJS(content, filePath, config) {
  const issues = [];

  // Check for console.log (should be removed in production)
  const consoleLogs = content.match(/console\.(log|warn|error)\(/g) || [];
  if (consoleLogs.length > 0) {
    issues.push({ line: 1, message: `Found ${consoleLogs.length} console statements (remove before production)`, severity: 'warning' });
  }

  // Check for eval
  if (content.includes('eval(')) {
    issues.push({ line: getLineNumber(content, content.indexOf('eval(')), message: 'Use of eval() is discouraged', severity: 'error' });
  }

  // Check for document.write
  if (content.includes('document.write')) {
    issues.push({ line: 1, message: 'document.write is deprecated', severity: 'warning' });
  }

  return issues;
}

// Get line number for a position in string
function getLineNumber(content, position) {
  const before = content.substring(0, position);
  return before.split('\n').length;
}

// Format output
function formatReport(filePath, issues, config) {
  if (issues.length === 0) {
    log(`  ✓ ${filePath}`, colors.green);
    return;
  }

  log(`  ⚠ ${filePath}`, colors.yellow);
  issues.forEach(issue => {
    const severityColor = issue.severity === 'error' ? colors.red : issue.severity === 'warning' ? colors.yellow : colors.blue;
    log(`    ${issue.line}: ${issue.message}`, severityColor);
  });
}

// Main review function
function reviewFiles(files, projectRoot, config) {
  log(`\n${colors.bold}Reviewing ${files.length} file(s) for ${config.project}${colors.reset}\n`);

  let totalIssues = 0;
  let filesWithIssues = 0;
  const allIssues = [];

  files.forEach(file => {
    const fullPath = path.resolve(projectRoot, file);
    if (!fs.existsSync(fullPath)) {
      log(`  ✗ File not found: ${file}`, colors.red);
      return;
    }

    const ext = path.extname(file).toLowerCase();
    const content = fs.readFileSync(fullPath, 'utf8');
    let issues = [];

    switch (ext) {
      case '.html':
      case '.htm':
        issues = reviewHTML(content, file, config);
        break;
      case '.css':
      case '.scss':
      case '.sass':
        issues = reviewCSS(content, file, config);
        break;
      case '.js':
      case '.jsx':
      case '.ts':
      case '.tsx':
        issues = reviewJS(content, file, config);
        break;
      default:
        // Skip unknown file types
        return;
    }

    if (issues.length > 0) {
      formatReport(file, issues, config);
      totalIssues += issues.length;
      filesWithIssues++;
      allIssues.push({ file, issues });
    } else {
      formatReport(file, [], config);
    }
  });

  // Summary
  log(`\n${colors.bold}Summary:${colors.reset}`);
  log(`  Files reviewed: ${files.length}`);
  log(`  Files with issues: ${filesWithIssues}`, filesWithIssues > 0 ? colors.yellow : colors.green);
  log(`  Total issues: ${totalIssues}`, totalIssues > 0 ? colors.yellow : colors.green);

  // Save log
  const logDir = path.join(projectRoot, 'memory');
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
  const logPath = path.join(logDir, 'consistency-reviews.log');
  const timestamp = new Date().toISOString();
  const logEntry = `\n--- ${timestamp} ---\nFiles: ${files.join(', ')}\nIssues: ${totalIssues}\n`;
  fs.appendFileSync(logPath, logEntry);

  // Determine verdict
  const hasErrors = allIssues.some(f => f.issues.some(i => i.severity === 'error'));
  const hasWarnings = allIssues.some(f => f.issues.some(i => i.severity === 'warning' || i.severity === 'info'));

  log(`\n${colors.bold}VERDICT:${colors.reset}`, hasErrors ? colors.red : (hasWarnings ? colors.yellow : colors.green));
  if (hasErrors) {
    log('  REJECTED — Critical issues must be fixed', colors.red);
    process.exit(1);
  } else if (hasWarnings) {
    log('  NEEDS REVISION — Review warnings and improve', colors.yellow);
    process.exit(0); // Non-blocking
  } else {
    log('  APPROVED — All checks passed', colors.green);
    process.exit(0);
  }
}

// CLI entry point
function main() {
  const args = process.argv.slice(2);
  const projectRoot = process.cwd(); // Assume run from project root

  const config = loadConfig(projectRoot);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Site Consistency Review Tool

Usage:
  site-consistency review [--files <file1,file2,...>] [--commit <commit>] [--all]
  site-consistency audit [--all]

Options:
  --files LIST      Comma-separated list of files to review
  --commit COMMIT   Review changes in a specific commit
  --all            Review entire project
  --interactive    Ask questions when uncertain
  --help, -h       Show this help

Examples:
  site-consistency review --files "index.html,styles.css"
  site-consistency review --commit HEAD~1
  site-consistency audit --all
`);
    process.exit(0);
  }

  let filesToReview = [];

  if (args.includes('--all')) {
    // Find all HTML, CSS, JS files
    const validExts = ['.html', '.htm', '.css', '.scss', '.sass', '.js', '.jsx', '.ts', '.tsx'];
    function walk(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name.startsWith('.') || ['node_modules', 'dist', 'build', '.git'].includes(entry.name)) continue;
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(fullPath);
        } else if (validExts.includes(path.extname(entry.name).toLowerCase())) {
          filesToReview.push(path.relative(projectRoot, fullPath));
        }
      }
    }
    walk(projectRoot);
  } else if (args.includes('--commit')) {
    const commit = args[args.indexOf('--commit') + 1];
    if (!commit) {
      log('Error: --commit requires a commit reference', colors.red);
      process.exit(1);
    }
    // Get changed files in commit
    try {
      const stdout = require('child_process').execSync(`git show --name-only --pretty="" ${commit}`, { encoding: 'utf8' });
      filesToReview = stdout.split('\n').filter(f => f.trim()).filter(f => {
        const ext = path.extname(f).toLowerCase();
        return ['.html', '.htm', '.css', '.scss', '.sass', '.js', '.jsx', '.ts', '.tsx'].includes(ext);
      });
    } catch (err) {
      log(`Error: Could not get commit files: ${err.message}`, colors.red);
      process.exit(1);
    }
  } else if (args.includes('--files')) {
    const filesIndex = args.indexOf('--files');
    filesToReview = args[filesIndex + 1]?.split(',') || [];
  } else {
    // Default to staged changes
    try {
      const stdout = require('child_process').execSync('git diff --cached --name-only', { encoding: 'utf8' });
      filesToReview = stdout.split('\n').filter(f => f.trim()).filter(f => {
        const ext = path.extname(f).toLowerCase();
        return ['.html', '.htm', '.css', '.scss', '.sass', '.js', '.jsx', '.ts', '.tsx'].includes(ext);
      });
    } catch (err) {
      log('Error: Could not get staged files. Specify --files or --all.', colors.red);
      process.exit(1);
    }
  }

  if (filesToReview.length === 0) {
    log('No files to review.', colors.yellow);
    process.exit(0);
  }

  reviewFiles(filesToReview, projectRoot, config);
}

main();
