const { Schema } = require('mongoose');

const schema = new Schema({
  _id: Number,
  article_id: String,
  body: String,
});

module.exports = schema;
