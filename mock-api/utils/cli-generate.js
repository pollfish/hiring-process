const storage = require('./storage');
const generator = require('./generateQuestionnaire');
storage.save(generator());