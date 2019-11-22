const chai = require('chai');
const expect = chai.expect;

const Game = require('../src/Game');
const Card = require('../src/Card');
const Deck = require('../src/Deck');

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  it('should be a function', () => {
    expect(Game).to.be.a('function');
  });

  it('should be an instance of Round', () => {
    expect(game).to.be.an.instanceof(Game);
  });

  it('should be able to start a round', () => {
    expect(game.currentRound).to.not.be.an('object');
    game.start('eval');
    expect(game.currentRound).to.be.an('object');
  });

  it('should print start message', () => {
    card1 = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', 'function'], 'object');
    card2 = new Card(2, 'What is a comma-separated list of related values?', ['array', 'object', 'function'], 'array');
    card3 = new Card(3, 'What type of prototype method directly modifies the existing array?', ['mutator method', 'accessor method', 'iteration method'], 'mutator method');
    card4 = new Card(4, 'What type of prototype method does not modify the existing array but returns a particular representation of the array?', ['mutator method', 'accessor method', 'iteration method'], 'accessor method');
    deck = new Deck([card1, card2, card3, card4]);
    expect(game.printMessage(deck)).to.equal(`Welcome to FlashCards! You are playing with 4 cards.
-----------------------------------------------------------------------`);
  })
});
