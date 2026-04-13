#!/usr/bin/env node
/**
 * Site Consistency Skill Entry Point
 * Wraps the review tool for OpenClaw integration
 */

const { spawn } = require('child_process');
const path = require('path');

// Get arguments from OpenClaw
const args = process.argv.slice(2);

// Build command to run the review tool
const reviewScript = path.join(__dirname, 'review.js');
const command = 'node';
const commandArgs = [reviewScript, ...args];

// Spawn the review process
const child = spawn(command, commandArgs, {
  stdio: 'inherit',
  env: { ...process.env }
});

child.on('close', (code) => {
  process.exit(code);
});

child.on('error', (err) => {
  console.error('Failed to start review tool:', err);
  process.exit(1);
});
