# cheer-up-terminal
cheer up your terminal

## How to Use

### Installation

1. **Automated Installation (Recommended):**
   Install globally via npm to set up the CLI and automate shell integration:
   ```sh
   npm install -g cheer-up-cli
   ```
   This will make the `cheerup` command available everywhere and attempt to add it to your shell config so it runs when you open a new terminal.

   > **Note:** The CLI will also attempt to install `fortune` automatically if it is not found on your system (on supported platforms). You may be prompted for your password or permission to install system packages.

2. **Manual Installation:**
   Clone this repository:
   ```sh
   git clone https://github.com/yourusername/cheer-up-terminal.git
   cd cheer-up-terminal
   npm install
   ```

### Run the CLI

You can run the tool directly with:
```sh
node ./bin/index.js
```

Or, use the CLI command (after global install or linking):
```sh
cheerup
```

Or, add an alias to your shell for convenience:
```sh
alias cheerup="node /path/to/cheer-up-terminal/bin/index.js"
```

If you want to use the CLI command globally from source, you can link it:
```sh
npm link
cheerup
```

## How Does It Work?

- **ASCII Art:** Prints a cheerful ASCII bunny with a message.
- **Random Quote:** Shows a random quote using the `fortune` command (if installed). If not, it displays a default message.
- **Cowsay Integration:** The quote is displayed using cowsay, which wraps the message in a fun ASCII animal.
- **Colorful Output:** Uses colors to make the output more visually appealing.
- **Shell Automation:** On install, the CLI attempts to add itself to your shell config so it runs automatically when you open a new terminal.
- **Fortune Automation:** If `fortune` is not found, the CLI will attempt to install it automatically (on supported platforms).

This tool is designed to brighten your terminal experience every time you run it!

---

## Installing `fortune` Manually

If you want to install `fortune` yourself, here are instructions for common platforms:

- **macOS (Homebrew):**
  ```sh
  brew install fortune
  ```
- **Ubuntu/Debian:**
  ```sh
  sudo apt-get update
  sudo apt-get install fortune
  ```
- **Fedora:**
  ```sh
  sudo dnf install fortune-mod
  ```
- **Arch Linux:**
  ```sh
  sudo pacman -S fortune-mod
  ```
- **Windows:**
  - Use Windows Subsystem for Linux (WSL) and follow the Linux instructions above, or
  - Download a Windows-compatible version from [GnuWin32](http://gnuwin32.sourceforge.net/packages/fortune.htm) or use a similar tool.

If you have any issues, please check your platform's package manager or documentation for details.
