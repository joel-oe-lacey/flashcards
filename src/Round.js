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

  takeTurn(turn) {
    this.turn++;
    this.currentCard = this.cards[this.turn];
    if(turn.evaluateGuess()) {
      return turn.giveFeedback();
    } else {
      this.incorrectGuesses.push(turn.guess);
      return turn.giveFeedback();
    }
  }
}

module.exports = Round;
