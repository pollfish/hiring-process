const constants = require('../constants');
const storage = require('../../utils/storage');
const shouldFail = require('../../utils/failingChance');
const editQuestion = {
  path: constants.endpoints.QUESTION_PUT,
  method: 'PUT',
  render: (req, res, next) => {
    if (!req.query.debug && shouldFail()) {
      res.status(500).send({ success: false, message: 'Something went wrong.'})
      return;
    }
    const questionId = req.params.question_id;
    const question = req.body;
    try {
      storage.update(questionId, question);
      res.status(200).send({ success: true, message: `Question with id ${questionId} was updated successfully`});
    } catch (err) {
      if (err.code === 418) {
        res.status(400).send({ success: false, message: `Bad Request`, error: err.message });
      } else {
        res.status(500).send({ success: false, message: `Something went wrong`});
      }
    }
  },
};

module.exports = [editQuestion];
