const ErrorHandler = require("./ErrorHandler");

class MortyLoader {
  load(modulePath, className, ...args) {
    try {
      const Module = require(modulePath);
      const MortyClass = Module[className];

      if (!MortyClass) {
        throw new Error(`Class ${className} not found in ${modulePath}`);
      }

      return new MortyClass(...args);
    } catch (err) {
      ErrorHandler.exit(
        `Failed to load Morty class: ${err.message} (modulePath: ${modulePath}, className: ${className})`
      );
      return null;
    }
  }
}

module.exports = MortyLoader;
