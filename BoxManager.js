class BoxManager {
  static generateTwoBoxes(gunVal, rickVal, mortyVal, numBoxes) {
    return gunVal !== rickVal
      ? [rickVal, gunVal]
      : [rickVal, mortyVal === rickVal ? (mortyVal + 1) % numBoxes : mortyVal];
  }
  static lazyTwoBoxes(gunVal, rickVal, numBoxes) {
    if (rickVal === gunVal) {
      const otherBoxes = Array.from({ length: numBoxes }, (_, i) => i).filter((n) => n !== gunVal && n !== rickVal);
      return [rickVal, Math.max(...otherBoxes)];
    }
    return [rickVal, gunVal]
  }
}

module.exports = BoxManager;
