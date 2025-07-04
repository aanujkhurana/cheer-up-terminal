# cheer-up-terminal

Brighten your terminal with a personalized greeting, colorful ASCII art, and a random quote—every time you open a new shell!

---

## Features

- **Personalized Greeting:** Remembers your name and favorite emoji for a custom welcome.
- **ASCII Art Banner:** Displays a cheerful, colorful banner on each run.
- **Random Quote:** Shows a random quote using the `fortune` command (if installed), or a default message.
- **Cowsay Integration:** Quotes are wrapped in a fun ASCII animal using cowsay.
- **Automatic Shell Integration:** Optionally adds itself to your shell config so it runs on every new terminal session.
- **Automatic Fortune Install:** Attempts to install `fortune` automatically on supported platforms if not found.
- **Cross-platform:** Works on macOS, Linux, and Windows (via WSL).

---

## Installation

### 1. Automated (Recommended)
Install globally via npm:
```sh
npm install -g cheer-up-cli
```
This will make the `cheerup` command available everywhere and attempt to add it to your shell config (e.g., `.zshrc`, `.bashrc`) so it runs when you open a new terminal.

> **Note:** The CLI will also attempt to install `fortune` automatically if it is not found on your system (on supported platforms). You may be prompted for your password or permission to install system packages.

### 2. Manual (From Source)
Clone this repository and install dependencies:
```sh
git clone https://github.com/yourusername/cheer-up-terminal.git
cd cheer-up-terminal
npm install
```
Run directly with:
```sh
node ./bin/index.js
```
Or link globally for the `cheerup` command:
```sh
npm link
cheerup
```

---

## Usage

After installation, simply run:
```sh
cheerup [--color | --no-color]
```
- On first run, you'll be prompted for your name, favorite emoji, and whether you want colorful output (unless you specify --color or --no-color).
- The color preference is saved in your config and used for all future runs. You can change it by running with --color or --no-color again, or by editing `~/.cheerup-config.json`.

You can also add an alias manually:
```sh
alias cheerup="node /path/to/cheer-up-terminal/bin/index.js"
```

---

## Example Output

When you run `cheerup`, you'll see output like this:

```
/ >🌈 Hi you cheer up!

 _______________________________________
/ You're awesome!                       \
|                                      |
| (Install 'fortune' to get dynamic     |
| quotes!)                             |
|                                      |
| - cheer-up-terminal                  |
\                                      /
 ---------------------------------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

> The output will vary depending on your name, emoji, available fortune quotes, and cowsay animals. If `fortune` is not installed, you'll see a default message.

---

## Configuration

- Your name and emoji are stored in `~/.cheerup-config.json`.
- To change them, delete this file or edit it manually, then rerun `cheerup`.

---

## Troubleshooting

- **Shell Integration Not Working:** If `cheerup` does not run automatically on new terminals, add `cheerup` to your shell config manually (e.g., add `cheerup` to `~/.zshrc` or `~/.bashrc`).
- **Fortune Not Installed:** If you do not see random quotes, install `fortune` manually (see below).
- **Permission Issues:** You may need to run your terminal as administrator or use `sudo` for some install steps.

---

## Installing `fortune` Manually

If `fortune` is not installed automatically, you can install it yourself:

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

---

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or pull request.

---

## License

MIT © Anuj Khurana
