const { buildSchema } = require('graphql');
const article = require('./article');
const comment = require('./comment');

const schema = buildSchema(`
  type Query {
    welcome: String
  }

  type Article {
    _id: ID!
    title: String
    body: String
  }

  type Comment {
    _id: ID!
    article_id: String
    body: String
  }

  input CreateArticleInput {
    title: String
    body: String
  }

  type Mutation {
    createArticle(input: CreateArticleInput): Article
  }
`)

module.exports = {
  schema,
  resolver: { ...article, ...comment, }
};
