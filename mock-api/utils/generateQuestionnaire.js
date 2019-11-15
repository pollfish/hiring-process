const faker = require('faker');
class Question {
  constructor() {
    this.id = faker.random.uuid();
    this.prompt = `Would you consider buying "${faker.commerce.productName()}"`;
    this.answers = ['Yes', 'No', 'Maybe'];
  }
}

const generateQuestionnaire = () => {
  const maxQuestions = 10;
  const numberOfQuestions = Math.floor(Math.random() * Math.floor(maxQuestions));
  let questions = [];
  for (var i = 0; i < numberOfQuestions; i++) {
    const question = new Question();
    questions = [...questions, question];
  }

  return questions;
}

module.exports = generateQuestionnaire;