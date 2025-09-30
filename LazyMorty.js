const BoxManager = require("./BoxManager");
const { MortyBase } = require("./MortyBase");
const { log } = require("console");

class LazyMorty extends MortyBase {
  choice2(choice) {
    log(`Rick: ${choice}`);
    this.rickVal = choice;
    this.gunVal = this.generator.gunValue(
      this.mortyVal,
      this.rickVal,
      this.numBoxes
    );
    this.twoBoxes = BoxManager.lazyTwoBoxes(
      this.gunVal,
      this.rickVal,
      this.numBoxes
    );
  }
}

module.exports = { LazyMorty };
