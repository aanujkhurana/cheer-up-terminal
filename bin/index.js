#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cowsay = require('cowsay');
const chalk = require('chalk');
const { execSync } = require('child_process');
const inquirer = require('inquirer');

// Config file path
const os = require('os');
const configPath = path.join(os.homedir(), '.cheerup-config.json');

async function getUserConfig() {
  let config = { name: 'Anuj', emoji: '🌈' };
  if (fs.existsSync(configPath)) {
    try {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch {}
  } else {
    // Prompt user for name and emoji
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        default: 'Anuj',
      },
      {
        type: 'input',
        name: 'emoji',
        message: 'What emoji would you like to use?',
        default: '🌈',
      },
    ]);
    config = answers;
    fs.writeFileSync(configPath, JSON.stringify(config), 'utf8');
  }
  return config;
}

(async () => {
  // 1. Print the static ASCII art with personalized greeting
  const { name, emoji } = await getUserConfig();
  let asciiArt = fs.readFileSync(path.join(__dirname, '../ascii.txt'), 'utf8');
  asciiArt = asciiArt.replace(/\/ >.*Hi .*!/, `/ >${emoji} Hi ${name} cheer up!`);
  console.log(chalk.cyan(asciiArt));

  // 2. Load quote (via `fortune` if available)
  let quote = "You're awesome!";
  let fortuneAvailable = true;
  try {
    quote = execSync('fortune', { encoding: 'utf8' });
  } catch {
    fortuneAvailable = false;
  }

  // Attempt to install fortune if not available
  if (!fortuneAvailable) {
    const platform = os.platform();
    let installCmd = null;
    if (platform === 'darwin') {
      installCmd = 'brew install fortune';
    } else if (platform === 'linux') {
      // Try to detect distro
      try {
        const lsb = execSync('lsb_release -is', { encoding: 'utf8' }).toLowerCase();
        if (lsb.includes('ubuntu') || lsb.includes('debian')) {
          installCmd = 'sudo apt-get update && sudo apt-get install -y fortune';
        } else if (lsb.includes('fedora')) {
          installCmd = 'sudo dnf install -y fortune-mod';
        } else if (lsb.includes('arch')) {
          installCmd = 'sudo pacman -S --noconfirm fortune-mod';
        }
      } catch {
        // Fallback: try common package managers
        if (fs.existsSync('/etc/debian_version')) {
          installCmd = 'sudo apt-get update && sudo apt-get install -y fortune';
        } else if (fs.existsSync('/etc/fedora-release')) {
          installCmd = 'sudo dnf install -y fortune-mod';
        } else if (fs.existsSync('/etc/arch-release')) {
          installCmd = 'sudo pacman -S --noconfirm fortune-mod';
        }
      }
    }
    if (installCmd) {
      console.log(chalk.yellow(`Attempting to install 'fortune' with: ${installCmd}`));
      try {
        execSync(installCmd, { stdio: 'inherit' });
        // Try again
        quote = execSync('fortune', { encoding: 'utf8' });
        fortuneAvailable = true;
      } catch {
        console.warn(chalk.red("Automatic installation of 'fortune' failed. Please install it manually."));
        quote = "Install 'fortune' to get dynamic quotes!";
      }
    } else {
      console.warn(chalk.yellow("Automatic installation of 'fortune' is not supported on this platform. Please install it manually."));
      quote = "Install 'fortune' to get dynamic quotes!";
    }
  }
  if (fortuneAvailable && !quote) {
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
})();
