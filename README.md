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

This tool is designed to brighten your terminal experience every time you run it!
