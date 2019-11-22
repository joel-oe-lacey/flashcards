const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Round = require('../src/Round');

describe('Round', () => {
  let card1;
  let card2;
  let card3;
  let card4;
  let deck;
  let round;

  beforeEach(() => {
    card1 = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    card2 = new Card(2, 'What is a comma-separated list of related values?', ['array', 'object', 'function'], 'array');
    card3 = new Card(3, 'What type of prototype method directly modifies the existing array?', ['mutator method', 'accessor method', 'iteration method'], 'mutator method');
    card4 = new Card(4, 'What type of prototype method does not modify the existing array but returns a particular representation of the array?', ['mutator method', 'accessor method', 'iteration method'], 'accessor method');
    deck = new Deck([card1, card2, card3, card4]);
    round = new Round(deck);
  });

  it('should be a function', () => {
    expect(Round).to.be.a('function');
  });

  it('should be an instance of Round', () => {
    expect(round).to.be.an.instanceof(Round);
  });

  it('should have a count of the turns', () => {
    expect(round.turn).to.equal(0);
  });

  it('should have a currentCard property, which starts as the first card in the Deck', () => {
    expect(round.currentCard).to.deep.equal(card1);
  });

  it('should update the turn count after taking a turn ', () => {
    expect(round.turn).to.equal(0);
    round.takeTurn('array', card1);
    expect(round.turn).to.equal(1);
  });

  it('should update the current card after taking a turn', () => {
    expect(round.returnCurrentCard()).to.deep.equal(card1);
    round.takeTurn('array');
    expect(round.returnCurrentCard()).to.deep.equal(card2);
  });

  it('should update the incorrectGuesses if user makes wrong guess', () => {
    expect(round.incorrectGuesses).to.deep.equal([]);
    round.takeTurn('array');
    expect(round.incorrectGuesses).to.deep.equal(['array']);
  });

  it('should calculate the percentage of guesses correct', () => {
    round.takeTurn('array');
    round.takeTurn('function');
    round.takeTurn('mutator method');
    round.takeTurn('mutator method');
    expect(round.calculatePercentCorrect()).to.equal(25);
  });

  describe('Round.incorrectRound', () => {
    it('should set cards to all incorrect cards', () => {
      expect(round.cards.length).to.equal(4);
      round.takeTurn('array');
      round.takeTurn('object');
      round.incorrectRound();
      expect(round.cards.length).to.equal(2);
    });
    it('should clear incorrectGuesses storage', () => {
      round.takeTurn('array');
      round.takeTurn('object');
      expect(round.incorrectGuesses).to.deep.equal(['array', 'object']);
      round.incorrectRound();
      expect(round.incorrectGuesses).to.deep.equal([]);
    });
    it('should clear incorrectCards storage', () => {
      round.takeTurn('array');
      round.takeTurn('object');
      expect(round.incorrectCards).to.deep.equal([card1, card2]);
      round.incorrectRound();
      expect(round.incorrectCards).to.deep.equal([]);
    });
    it('should reset the turn count', () => {
      round.takeTurn('array');
      round.takeTurn('object');
      expect(round.turn).to.equal(2);
      round.incorrectRound();
      expect(round.turn).to.equal(0);
    });
    it('should set current card to first card in new set', () => {
      round.takeTurn('array');
      round.takeTurn('object');
      expect(round.currentCard).to.deep.equal(card3);
      round.incorrectRound();
      expect(round.currentCard).to.deep.equal(card1);
    });
  });

  describe('Round.takeTurn', () => {
    it('should provide feedback on incorrect guess', () => {
      expect(round.takeTurn('array', card1)).to.equal('incorrect!');
    });

    it('should provide feedback on correct guess', () => {
      expect(round.takeTurn('object', card1)).to.equal('correct!');
    });
  });

  describe('Round.endRound', () => {
    it('should provide a failed notification', () => {
      expect(round.endRound('fail')).to.equal('** Round over! ** You answered NaN% of the questions correctly! You need 90% to pass, please try incorrect answers again.');
    });
    it('should provide a passed notification', () => {
      expect(round.endRound()).to.equal('** Round over! ** You passed with NaN% of the questions answered correctly! You finished in 0 minutes and 0 seconds');
    });
  });
});
