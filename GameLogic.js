const readline = require("readline");
const { log, clear } = require("console");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class GameLogic {
  constructor({loader, keyManager, numberGenerator, stats }) {
    this.keyManager = keyManager;
    this.numberGenerator = numberGenerator;
    this.stats = stats;
    this.loader = loader;
  }

  startNewRound({ numBoxes, path, className }) {
    this.numBoxes = numBoxes;
    this.morty = this.loader.load(
      path,
      className,
      numBoxes,
      this.keyManager,
      this.numberGenerator
    );
    this.morty.run();
    this.askRickNumber();
  }

  askRickNumber() {
    rl.question(
      `Morty: Rick, enter your number [0-${
        this.numBoxes - 1
      }] so you don’t whine later that I cheated, alright? `,
      (answer) => {
        const parsed = this.validateNum(answer, () => this.askRickNumber());
        if (parsed === null) return;
        const rickVal = this.morty.choice1(parsed);
        log(rickVal);
        this.askRickGuess();
      }
    );
  }

  askRickGuess() {
    rl.question(
      `Morty: Okay, okay, I hid the gun. What’s your guess [0-${
        this.numBoxes - 1
      }]? `,
      (answer) => {
        const parsed = this.validateNum(answer, () => this.askRickGuess());
        if (parsed === null) return;
        this.morty.choice2(parsed);
        this.askStayOrSwitch();
      }
    );
  }

  askStayOrSwitch() {
    rl.question("Rick, what will you do, 'stay' or 'switch'? ", (answer) => {
      const choice = this.validateInput(answer, ["stay", "switch"], () =>
        this.askStayOrSwitch()
      );
      if (choice === null) return;
      const result = this.morty.choice3(choice);
      const won = result.toLowerCase().includes("you win");
      log(result);
      this.stats.recordRound(choice, won);
      this.askPlayAgain();
    });
  }

  askPlayAgain() {
    rl.question(
      "Morty: D-do you wanna play another round (y/n)? ",
      (answer) => {
        const choice = this.validateInput(answer, ["y", "n"], () =>
          this.askPlayAgain()
        );
        if (choice === null) return;
        if (choice === "y") {
          clear();
          return this.startNewRound();
        }
        log("Morty: Okay… uh, bye!");
        this.stats.print();
        rl.close();
      }
    );
  }

  validateNum(num, callback) {
    const parsed = parseInt(num);
    if (isNaN(parsed) || parsed < 0 || parsed >= this.numBoxes) {
      log(
        `Invalid input. Please enter a number between 0 and ${
          this.numBoxes - 1
        }.`
      );
      callback();
      return null;
    }
    return parsed;
  }

  validateInput(input, allowed, callback) {
    const choice = input.trim().toLowerCase();
    if (!allowed.includes(choice)) {
      log(`Invalid input. Allowed values: ${allowed.join(", ")}.`);
      callback();
      return null;
    }
    return choice;
  }
}

module.exports = GameLogic;
