const { Schema } = require('mongoose');

const schema = new Schema({
  _id: Number,
  title: String,
  body: String,
});

module.exports = schema;
