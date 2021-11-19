const mongoose = require('mongoose');
const schema = require('../collection/schema/comment');
const comment = mongoose.model('Comment', schema);

const endpoint = {
  createComment: async ({ input }) => {

  },
};

module.exports = endpoint;