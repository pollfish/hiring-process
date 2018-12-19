const faker = require('faker');
class Question {
  constructor({ order }) {
    this.id = faker.random.uuid();
    this.prompt = `Would you consider buying "${faker.commerce.productName()}"`;
    this.order = order;
    this.answers = [{
      order: 1,
      body: 'Yes',
    }, {
      order: 2,
      body: 'No',
    }];
  }
}

const generateQuestionnaire = () => {
  const maxQuestions = 10;
  const numberOfQuestions = Math.floor(Math.random() * Math.floor(maxQuestions));
  let questions = [];
  for (var i = 0; i < numberOfQuestions; i++) {
    const question = new Question({ order: i });
    questions = [...questions, question];
  }

  return questions;
}

module.exports = generateQuestionnaire;