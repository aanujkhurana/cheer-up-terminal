#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cowsay = require('cowsay');
const chalk = require('chalk');
const { execSync } = require('child_process');

// 1. Print the static ASCII art
const asciiArt = fs.readFileSync(path.join(__dirname, '../ascii.txt'), 'utf8');
console.log(chalk.cyan(asciiArt));

// 2. Load quote (via `fortune` if available)
let quote = "You're awesome!";
try {
  quote = execSync('fortune', { encoding: 'utf8' });
} catch {
  quote = "Install 'fortune' to get dynamic quotes!";
}

// 3. Find cowsay cowfiles
const cowsDir = "/opt/homebrew/Cellar/cowsay/3.8.4/share/cowsay/cows";
let cowfiles = [];
try {
  cowfiles = fs.readdirSync(cowsDir).filter(f => f.endsWith('.cow'));
} catch {
  console.warn(chalk.yellow("Cows directory not found. Using default cow."));
}

const randomCow = cowfiles.length
  ? cowfiles[Math.floor(Math.random() * cowfiles.length)].replace('.cow', '')
  : 'default';

// 4. Output cowsay quote
console.log(cowsay.say({ text: quote, f: randomCow }));
