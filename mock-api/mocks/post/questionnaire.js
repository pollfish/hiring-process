const constants = require('../constants');
const storage = require('../../utils/storage');
const generateQuestionnaire = require('../../utils/generateQuestionnaire');
const shouldFail = require('../../utils/failingChance');
const createNewQuestion = {
  path: constants.endpoints.QUESTIONS_POST,
  method: 'POST',
  render: (req, res, next) => {
    if (shouldFail(req.query)) {
      res.status(500).send({ success: false, message: 'Something went wrong.'})
      return;
    }
    const questions = req.body;
    try {
      storage.save(questions);
      res.status(200).send({ success: true, message: `Saved successfully ${questions.length} questions`, data: storage.findAll()});
    } catch (err) {
      if (err.code === 418) {
        res.status(400).send({ success: false, message: `Bad Request`, error: err.message });
      } else {
        res.status(500).send({ success: false, message: `Something went wrong`});
      }
    }
  },
};

module.exports = [createNewQuestion];
