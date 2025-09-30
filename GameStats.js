const Table = require("cli-table3");

class GameStats {
  constructor(numBoxes) {
    this.numBoxes = numBoxes;
    this.roundsSwitched = 0;
    this.roundsStayed = 0;
    this.winsSwitched = 0;
    this.winsStayed = 0;
  }

  recordRound(choice, won) {
    if (choice === "switch") {
      this.roundsSwitched++;
      if (won) this.winsSwitched++;
    } else if (choice === "stay") {
      this.roundsStayed++;
      if (won) this.winsStayed++;
    }
  }

  print() {
    const pEstimateSwitched = this.roundsSwitched
      ? (this.winsSwitched / this.roundsSwitched)
      : 0;
    const pEstimateStayed = this.roundsStayed
      ? (this.winsStayed / this.roundsStayed)
      : 0;

    const pExactStayed = 1 / this.numBoxes;
    const pExactSwitched = (this.numBoxes - 1) / this.numBoxes;

    const table = new Table({
      head: ["Game results", "Rick switched", "Rick stayed"],
      colWidths: [16, 15, 13],
      style: { head: [], border: [] },
    });

    table.push(
      ["Rounds", this.roundsSwitched, this.roundsStayed],
      [
        "Wins",
        this.roundsSwitched ? this.winsSwitched : 0,
        this.roundsStayed ? this.winsStayed : 0,
      ],
      [
        "P (estimate)",
        pEstimateSwitched.toFixed(3),
        pEstimateStayed.toFixed(3),
      ],
      ["P (exact)", pExactSwitched.toFixed(3), pExactStayed.toFixed(3)]
    );
        console.log("                  GAME STATS ");
        console.log(table.toString());
  }
}

module.exports = GameStats;
