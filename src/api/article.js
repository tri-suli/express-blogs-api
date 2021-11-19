const mongoose = require('mongoose');
const schema = require('../collection/schema/article');
const article = mongoose.model('Article', schema);

const endpoint = {
  createArticle: async ({ input }) => {
    const record = await article.create({
      _id: 1,
      title: input.title,
      body: input.body
    }, (err, small) => {
      console.log(err, small);
    });

    return record;
  }
};

module.exports = endpoint;
