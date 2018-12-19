const dyson = require('dyson');
const path = require('path');
const constants = require('./mocks/constants')
const options = {
  configDir: path.join(__dirname, 'mocks'),
  port: 5000,
};

const configs = dyson.getConfigurations(options);
const appBefore = dyson.createServer(options);
const appAfter = dyson.registerServices(appBefore, options, configs);

console.log(`Dyson listening on port ${options.port}

Available Endpoints:

  GET http://localhost:5000/questionnaire               // gets a questionnaire
  POST http://localhost:5000/questionnaire              // creates a questionnaire
  PUT http://localhost:5000/question/:question_id       // edits a question by id
`);