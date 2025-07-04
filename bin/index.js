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

// Parse CLI flags
const argv = process.argv.slice(2);
const hasColorFlag = argv.includes('--color');
const hasNoColorFlag = argv.includes('--no-color');

async function getUserConfig() {
  let config = { name: 'You', emoji: '🌈', color: true };
  if (fs.existsSync(configPath)) {
    try {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch {}
  } else {
    // Prompt user for name, emoji, and color preference (if not provided as flag)
    const questions = [
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        default: 'You',
      },
      {
        type: 'input',
        name: 'emoji',
        message: 'What emoji would you like to use?',
        default: '🌈',
      },
    ];
    let colorPref;
    if (hasColorFlag) {
      colorPref = true;
    } else if (hasNoColorFlag) {
      colorPref = false;
    } else {
      questions.push({
        type: 'confirm',
        name: 'color',
        message: 'Do you want colorful output?',
        default: true,
      });
    }
    const answers = await inquirer.prompt(questions);
    config = { ...answers, color: colorPref !== undefined ? colorPref : answers.color };
    fs.writeFileSync(configPath, JSON.stringify(config), 'utf8');
  }
  // If user provided a color flag, update config
  if (hasColorFlag || hasNoColorFlag) {
    config.color = hasColorFlag;
    fs.writeFileSync(configPath, JSON.stringify(config), 'utf8');
  }
  return config;
}

(async () => {
  // 1. Print the static ASCII art with personalized greeting
  const { name, emoji, color } = await getUserConfig();
  let asciiArt = fs.readFileSync(path.join(__dirname, '../ascii.txt'), 'utf8');
  asciiArt = asciiArt.replace(/\/ >.*Hi .*!/, `/ >${emoji} Hi ${name} cheer up!`);
  if (color) {
    console.log(chalk.cyan(asciiArt));
  } else {
    console.log(asciiArt);
  }

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
      if (color) {
        console.log(chalk.yellow(`Attempting to install 'fortune' with: ${installCmd}`));
      } else {
        console.log(`Attempting to install 'fortune' with: ${installCmd}`);
      }
      try {
        execSync(installCmd, { stdio: 'inherit' });
        // Try again
        quote = execSync('fortune', { encoding: 'utf8' });
        fortuneAvailable = true;
      } catch {
        if (color) {
          console.warn(chalk.red("Automatic installation of 'fortune' failed. Please install it manually."));
        } else {
          console.warn("Automatic installation of 'fortune' failed. Please install it manually.");
        }
        quote = "Install 'fortune' to get dynamic quotes!";
      }
    } else {
      if (color) {
        console.warn(chalk.yellow("Automatic installation of 'fortune' is not supported on this platform. Please install it manually."));
      } else {
        console.warn("Automatic installation of 'fortune' is not supported on this platform. Please install it manually.");
      }
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
    if (color) {
      console.warn(chalk.yellow("Cows directory not found. Using default cow."));
    } else {
      console.warn("Cows directory not found. Using default cow.");
    }
  }

  const randomCow = cowfiles.length
    ? cowfiles[Math.floor(Math.random() * cowfiles.length)].replace('.cow', '')
    : 'default';

  // 4. Output cowsay quote
  if (color) {
    console.log(chalk.green(cowsay.say({ text: quote, f: randomCow })));
  } else {
    console.log(cowsay.say({ text: quote, f: randomCow }));
  }
})();
