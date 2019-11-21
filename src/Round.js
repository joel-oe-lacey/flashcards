const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
    this.cards = deck ? deck.cards : [];
    this.currentCard = this.cards[0];
    this.turn = 0;
    this.incorrectGuesses = [];
    this.incorrectCards = [];
    this.startTime = Date.now();
  }

  returnCurrentCard() {
    return this.currentCard;
  }

  //aren't calling takeTurn after last card so if condition never met.
  takeTurn(guess) {
    const turn = new Turn(guess, this.currentCard);
    this.turn++;
    this.currentCard = this.cards[this.turn];
    if (turn.evaluateGuess()) {
      return turn.giveFeedback();
    } else {
      this.incorrectCards.push(turn.card);
      this.incorrectGuesses.push(turn.guess);
      return turn.giveFeedback();
    }
  }

  calculatePercentCorrect() {
    return (((this.turn - this.incorrectGuesses.length) / this.turn) * 100);
  }

  calculateTime() {
    const gameEndTime = Date.now();
    return Math.floor((gameEndTime - this.startTime) / 1000);
  }

  incorrectRound() {
    this.cards = this.incorrectCards;
    this.incorrectGuesses = [];
    this.incorrectCards = [];
    this.turn = 0;
    this.currentCard = this.cards[0];
  }

  endRound(result) {
    switch (result) {
      case 'fail':
        return `** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly! You need 90% to pass, please try incorrect answers again.`;
        break;
      default:
        const time = this.calculateTime();
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `** Round over! ** You passed with ${this.calculatePercentCorrect()}% of the questions answered correctly! You finished in ${minutes} minutes and ${seconds} seconds`;
        break;
    }
  }
}

module.exports = Round;
