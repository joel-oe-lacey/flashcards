const data = require('./data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');
const Deck = require('../src/Deck');
const Round = require('../src/Round');

class Game {
  constructor() {
    this.currentRound;
  }

  printMessage(deck) {
    return `Welcome to FlashCards! You are playing with ${deck.countCards()} cards.
    -----------------------------------------------------------------------`;
  }

  printQuestion(round) {
    util.main(round);
  }

  start(evalCheck) {
    if (evalCheck) {
      const deck = new Deck(prototypeQuestions);
      const round = new Round(deck);
      this.currentRound = round;
    } else {
      const deck = new Deck(prototypeQuestions);
      const round = new Round(deck);
      this.currentRound = round;
      console.log(this.printMessage(deck));
      this.printQuestion(round);
    }
  }
}

module.exports = Game;
