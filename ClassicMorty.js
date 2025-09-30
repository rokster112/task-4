const BoxManager = require("./BoxManager");
const { MortyBase } = require("./MortyBase")
const { log } = require("console")

class ClassicMorty extends MortyBase {
  choice2(choice) {
    this.rickSecondVal = choice;
    this.gunVal = this.generator.gunValue(
      this.mortyVal,
      this.rickVal,
      this.numBoxes
    );
    log(`Rick: ${choice}`);
    log(
      "Morty: Let’s, uh, generate another value now, I mean, to select a box to keep in the game."
    );
    this.twoBoxes = BoxManager.generateTwoBoxes(
      this.gunVal,
      this.rickVal,
      this.mortyVal,
      this.numBoxes
    );
    this.mortySecondVal = this.generator.mortyValue(this.twoBoxes.length);
    this.key2 = this.keyManager.createKey();
    this.HMAC2 = this.generator.HMAC(this.key2, this.mortySecondVal);
    log(`HMAC2=${this.HMAC2}`);
  }

  choice3log1() {
    log(`Morty: Aww man, my 2nd random value is ${this.mortySecondVal}.`);
    log(`Morty: KEY2=${this.key2}`);
    const fairNum2 = (this.calcFairNum1() + this.rickSecondVal) % this.twoBoxes.length;
    log(
      `Morty: Uh, okay, the 2nd fair number is (${this.calcFairNum1()} + ${
        this.rickSecondVal
      }) % ${this.twoBoxes.length} = ${fairNum2}`
    );
  }
}

module.exports = { ClassicMorty };
