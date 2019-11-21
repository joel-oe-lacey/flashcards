const inquirer = require('inquirer');
const Game = require('../src/Game');
const game = new Game();

const genList = (round) => {
  let card = round.returnCurrentCard();

  let choices = card.answers.map((answer, index) => {
    return {
      key: index,
      value: answer
    }
  });
  return {
    type: 'rawlist',
    message: card.question,
    name: 'answers',
    choices: choices
  };
}

const getRound = (round) => {
  return Promise.resolve(round);
}

const confirmUpdate = (id, round) => {
  const feedback = round.takeTurn(id);
  return {
    name: 'feedback',
    message: `Your answer of ${id} is ${feedback}`
  }
}

async function main(round) {

  const currentRound = await getRound(round);
  const getAnswer = await inquirer.prompt(genList(currentRound));
  const getConfirm = await inquirer.prompt(confirmUpdate(getAnswer.answers, round));

    if(!round.returnCurrentCard()) {
      if(round.calculatePercentCorrect() < 90) {
        round.endRound('fail')''

      } else {
        round.endRound('pass');
      }
    } else {
      main(round);
    }
}

module.exports.main = main;
