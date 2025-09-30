const CliArgsParser = require("./CliArgsParser");
const MortyLoader = require("./MortyLoader");
const RandomKeyManager = require("./RandomKeyManager");
const ProvablyFairNumberGenerator = require("./ProvablyFairNumberGenerator");
const GameStats = require("./GameStats");
const GameLogic = require("./GameLogic");

const parser = new CliArgsParser(process.argv)
const { numBoxes, path, className } = parser.parse();
const keyManager = new RandomKeyManager()
const stats = new GameStats(numBoxes);
const numberGenerator = new ProvablyFairNumberGenerator()
const loader = new MortyLoader()
const game = new GameLogic({loader, keyManager, numberGenerator, stats });
game.startNewRound({ numBoxes, path, className });
