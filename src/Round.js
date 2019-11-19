class Round {
  constructor(deck) {
    this.currentCard = deck ? deck.cards[0] : [];
  }
}

module.exports = Round;
