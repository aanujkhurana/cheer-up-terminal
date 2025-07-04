#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path');

const SHELL_FILES = ['.zshrc', '.bashrc', '.bash_profile', '.profile'];
const HOME_DIR = os.homedir();
const HOOK_LINE = '\n# 👋 cheerup CLI\ncheerup\n';

let updated = false;

for (const file of SHELL_FILES) {
  const fullPath = path.join(HOME_DIR, file);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    if (!content.includes('cheerup')) {
      fs.appendFileSync(fullPath, HOOK_LINE);
      console.log(`✅ cheerup added to ${file}`);
      updated = true;
      break;
    }
  }
}

if (!updated) {
  console.log(
    `⚠️ Could not automatically add 'cheerup' to your shell config.\n` +
    `Please add it manually to your ~/.zshrc or ~/.bashrc:\n\n  cheerup\n`
  );
}
