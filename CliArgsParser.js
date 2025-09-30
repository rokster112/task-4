const ErrorHandler = require("./ErrorHandler");

class CliArgsParser {
  constructor(argv) {
    this.argv = argv.slice(2)
  }

  parse() {
    if (this.argv.length < 3) {
      ErrorHandler.exit(
        "You are missing some arguments. \nUsage: node run.js <numBoxes> <pathToMorty.js> <className>"
      );
    }

    const [numBoxesStr, path, className] = this.argv;
    const numBoxes = parseInt(numBoxesStr, 10);

    const validMorties = [
      { path: "./ClassicMorty.js", className: "ClassicMorty" },
      { path: "./LazyMorty.js", className: "LazyMorty" },
    ];
    const isValid = validMorties.some(
      (m) => m.path === path && m.className === className
    );

    if (isNaN(numBoxes) || numBoxes < 3) {
      ErrorHandler.exit(
        `Box count needs to be an integer >= 3. Got: ${numBoxesStr}`
      );
    }

    if (!isValid) {
      ErrorHandler.exit(
        `Invalid combination: path="${path}" and className="${className}". Valid combinations are:\n` +
          validMorties.map((m) => `${m.path} -> ${m.className}`).join("\n")
      );
    }

    return { numBoxes, path, className };
  }
}

module.exports = CliArgsParser;
