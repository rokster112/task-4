const { randomInt, createHmac } = require("crypto");

class ProvablyFairNumberGenerator {
  mortyValue(n) {
    return randomInt(0, n);
  }

  HMAC(key, value) {
    return createHmac("sha256", key)
      .update(value.toString())
      .digest("hex");
  }

  gunValue(mortyVal, rickVal, n) {
    return (mortyVal + rickVal) % n;
  }
}

module.exports = ProvablyFairNumberGenerator;
