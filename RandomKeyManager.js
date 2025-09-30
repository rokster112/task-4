const { randomBytes } = require("crypto");

class RandomKeyManager {
  constructor() {
    this.key = this.createKey();
  }

  createKey() {
    return randomBytes(32).toString("hex");
  }

  getKey() {
    return this.key;
  }

  regenerateKey() {
    this.key = this.createKey();
    return this.key;
  }
}

module.exports = RandomKeyManager;
