const chai = require('chai');
const expect = chai.expect;

const Turn = require('../src/Turn');
const Card = require('../src/Card');

describe('Turn', () => {
  let card;
  let turn;

  beforeEach(() => {
    card = new Card(1, 'What allows you to define a set of related information using key-value pairs?', ['object', 'array', ''], 'object');
    turn = new Turn('array', card);
  });

  it('should be a function', () => {
    expect(Turn).to.be.a('function');
  });

  it('should be an instance of Turn', () => {
    expect(turn).to.be.an.instanceof(Turn);
  });

  it('should store user guess', () => {
    expect(turn.guess).to.equal('array');
  });

  it('should also store card associated with guess', () => {
    expect(turn.card).to.deep.equal(card);
  });

  it('should be able to return the user guess', () => {
    expect(turn.returnGuess()).to.equal('array');
  });

  it('should be able to return the associated card', () => {
    expect(turn.returnCard()).to.deep.equal(card);
  });

  describe('Turn.giveFeedback', () => {
    it('should provide feedback on an incorrect guess', () => {
      expect(turn.giveFeedback()).to.equal('incorrect!');
    });

    it('should provide feedback on a correct guess', () => {
      turn.guess = 'object';
      expect(turn.giveFeedback()).to.equal('correct!');
    });
  });
});
