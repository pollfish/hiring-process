const constants = require('../constants');
const generateQuestionnaire = require('../../utils/generateQuestionnaire');
const storage = require('../../utils/storage');
const shouldFail = require('../../utils/failingChance');
const questions = {
  path: constants.endpoints.QUESTIONS_GET,
  method: 'GET',
  cache: false,
  render: (req, res, next) => {
    // Add this if you feel you want to also handle errors while getting data
    if (shouldFail(req.query)) {
      res.status(500).send({ success: false, message: 'Something went wrong.'})
      return;
    }
    res.status(200).send(res.body);
  },
  template: (params, query) => {
    if (query.init === 'true') {
      storage.save(generateQuestionnaire());
    }
    return {
      success: true,
      data: storage.findAll(),
    };
  },
};

module.exports = [questions];
