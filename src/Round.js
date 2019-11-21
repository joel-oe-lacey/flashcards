const Turn = require('../src/Turn');

class Round {
  constructor(deck) {
    this.cards = deck ? deck.cards : [];
    this.currentCard = this.cards[0];
    this.turn = 0;
    this.incorrectGuesses = [];
  }

  returnCurrentCard() {
    return this.currentCard;
  }

  //aren't calling takeTurn after last card so if condition never met.
  takeTurn(guess) {
    const turn = new Turn(guess, this.currentCard);
    this.turn++;
    this.currentCard = this.cards[this.turn];
    if(turn.evaluateGuess()) {
      return turn.giveFeedback();
      } else {
      this.incorrectGuesses.push(turn.guess);
      return turn.giveFeedback();
      }
  }

  calculatePercentCorrect() {
    return (((this.turn - this.incorrectGuesses.length) / this.turn) * 100);
  }

  endRound(result) {
    switch(result) {
      case 'pass':
        console.log(`** Round over! ** You passed with ${this.calculatePercentCorrect()}% of the questions answered correctly!`)
        break;
      case 'fail':
        console.log(`** Round over! ** You answered ${this.calculatePercentCorrect()}% of the questions correctly! You need 90% to pass, please try again.`)
        break;
    }
  }
}

module.exports = Round;
