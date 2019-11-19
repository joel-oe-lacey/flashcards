class Card {
  constructor(id, question, possAnswers, corrAnswer) {
    this.id = id;
    this.question = question;
    this.answers = possAnswers;
    this.correctAnswer = corrAnswer;
  }
}

module.exports = Card;
