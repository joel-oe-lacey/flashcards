class Turn {
  constructor(guess, card) {
    this.guess = guess;
    this.card = card;
  }

  returnGuess() {
    return this.guess;
  }

  returnCard() {
    return this.card;
  }

  evaluateGuess() {
    return (this.guess === this.card.correctAnswer);
  }

  giveFeedback() {
    const answer = this.evaluateGuess();
    return (answer ? 'correct!' : 'incorrect!');
  }
}

module.exports = Turn;
