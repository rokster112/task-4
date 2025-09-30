const { log } = require("console");

class MortyBase {
  constructor(numBoxes, keyManager, generator) {
    this.numBoxes = numBoxes;
    this.keyManager = keyManager;
    this.generator = generator;
    this.key1 = this.keyManager.getKey();
    this.mortyVal = this.generator.mortyValue(this.numBoxes);
    this.HMAC1 = this.generator.HMAC(this.key1, this.mortyVal);
    this.rickVal = null;
    this.gunVal = null;
    this.twoBoxes = [];
  }
  calcFairNum1() {
    return (this.mortyVal + this.rickVal) % this.numBoxes;
  }

  run() {
    log(
      `Morty: Oh geez, Rick, I'm gonna hide your portal gun in one of the ${this.numBoxes} boxes, okay?`
    );
    log(`Morty: HMAC1=${this.HMAC1}`);
  }

  choice1(choice) {
    this.rickVal = choice;
    return `Rick: ${choice}`;
  }

  choice2(choice) {
    throw new Error("choice2() must be implemented by subclass");
  }

  choice3(choice) {
    const rickBox = choice === "stay" ? this.twoBoxes[0] : this.twoBoxes[1];
    log(`Morty: Aww man, my 1st random value is ${this.mortyVal}.`);
    log(`Morty: KEY1=${this.key1}`);
    const fairNum1 = this.calcFairNum1()
    log(
      `Morty: So the 1st fair number is (${this.mortyVal} + ${this.rickVal}) % ${this.numBoxes} = ${fairNum1}`
    );
    this.choice3log1();
    log(`Morty: You portal gun is in the box ${this.gunVal}.`);
    return rickBox === this.gunVal
      ? "Aww man, You win, Rick. I'll get you next time!"
      : "Aww man, You lost, Rick. Now we gotta go on one of *my* adventures!";
  }
  choice3log1() {}
}

module.exports = { MortyBase };
