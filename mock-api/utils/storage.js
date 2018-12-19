const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const faker = require('faker');
const QuestionnaireSchema = require('./questionnaire.schema.json');
const QuestionSchema = require('./question.schema.json');
const storagePath = path.join(__dirname, 'text-db');
const ajv = new Ajv();

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.code = 418;
  }
};

// Who said that text databases were useless?!
const save = (questionnaireData) => {
  const validate = ajv.compile(QuestionnaireSchema);
  const valid = validate(questionnaireData);
  if (!valid) {
    // errors array will always contain one element, unless specified otherwise in the instantiation
    const error = validate.errors[0];
    console.log(error);
    const errorType = error.keyword;
    const parent = error.dataPath.split('.').splice(1);
    if (errorType === 'required') {
      const param = error.params.missingProperty
      throw new ValidationError(`Missing property "${param}" ${parent ? `from key "${parent}"` : ''}`)
    } else {
      const currentValue = parent.reduce((o, i) => o[i], questionnaireData);
      const allowedValues = error.params.allowedValues;
      throw new ValidationError(`
        Value "${JSON.stringify(currentValue, null, 2)}" for property "${parent.join('.')}" ${error.message}
        ${allowedValues ? `Allowed values: ${allowedValues}` : ''}
      `);
    }
  }
  const dataToSave = questionnaireData.map(question => {
    question.id = question.id || faker.random.uuid();
    return question;
  });
  try {
    fs.writeFileSync(storagePath, JSON.stringify(dataToSave, null, 2));
  } catch(err) {
    throw err;
  }
}

const findAll = () => {
  try {
    const fileData = fs.readFileSync(storagePath, 'utf8');
    return JSON.parse(fileData);
  } catch(err) {
    console.log(err);
    return [];
  }
}

const update = (questionId, questionData) => {
  const validate = ajv.compile(QuestionSchema);
  const valid = validate(questionData);
  if (!valid) {
    // errors array will always contain one element, unless specified otherwise in the instantiation
    const error = validate.errors[0];
    console.log(error);
    const errorType = error.keyword;
    const parent = error.dataPath.split('.').splice(1);
    if (errorType === 'required') {
      const param = error.params.missingProperty
      throw new ValidationError(`Missing property "${param}" ${parent ? `from key "${parent}"` : ''}`)
    } else {
      const currentValue = parent.reduce((o, i) => o[i], questionnaireData);
      const allowedValues = error.params.allowedValues;
      throw new ValidationError(`
        Value "${JSON.stringify(currentValue, null, 2)}" for property "${parent.join('.')}" ${error.message}
        ${allowedValues ? `Allowed values: ${allowedValues}` : ''}
      `);
    }
  }
  const data = findAll();
  const dbquestion = data.find((question) => question.id === questionId)

  const newQuestion = {...dbquestion, ...questionData};
  const index = data.indexOf(dbquestion);
  data[index] = newQuestion;
  save(data);
}

module.exports = {
  save,
  findAll,
  update,
};