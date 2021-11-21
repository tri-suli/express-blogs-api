require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const mongodb = require('./collection/mongodb');
const article = mongoose.model('Article', require('./collection/schema/article'));
const comment = mongoose.model('Comment', require('./collection/schema/comment'));

const app = express();
const port = process.env.SERVER_PORT;

mongodb.connect(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_NAME
);

const schema = buildSchema(`
  type Query {
    welcome: String
  }

  type Article {
    id: Int
    title: String
    body: String
  }

  type Comment {
    id: Int
    article_id: String
    body: String
  }

  type ArticleComments {
    id: Int!
    title: String!
    body: String!
    comments: [Comment]
  }

  input ArticleInput {
    id: Int
    title: String
    body: String
  }

  input CommentInput {
    id: Int
    article_id: Int
    body: String
  }

  input CollectionID {
    id: Int
  }

  type Mutation {
    createArticle(input: ArticleInput): String
    updateArticle(input: ArticleInput): String
    removeArticle(input: CollectionID): String
    createComment(input: CommentInput): String
    updateComment(input: CommentInput): String
    removeComment(input: CollectionID): String
    showArticle(input: CollectionID): ArticleComments
  }
`);

const resolver = {
  createArticle: async ({ input: { title, body } }) => {
    const total = await article.count();
    await article.create({
      _id: total + 1,
      title: title,
      body: body
    });
    
    return 'article created successfully!';
  },
  updateArticle: async ({ input: { id, title, body } }) => {
    await article.findOneAndUpdate(
      {_id: id},
      { title, body }
    );
    
    return 'article updated successfully!';
  },
  removeArticle: async ({ input: { id } }) => {
    await article.findOneAndRemove(
      { _id: id }
    );
    
    return 'article removed successfully!';
  },
  createComment: async ({ input }) => {
    const total = await comment.count();
    await comment.create({
      _id: total + 1,
      article_id: input.article_id,
      body: input.body
    });
    
    return 'comment created successfully!';
  },
  updateComment: async ({ input }) => {
    await comment.findOneAndUpdate(
      {_id: input.id},
      { body: input.body }
    );
    
    return 'comment updated successfully!';
  },
  removeComment: async ({ input }) => {
    await comment.findOneAndRemove(
      { _id: input.id }
    );
    
    return 'comment removed successfully!';
  },
  showArticle: async ({ input }) => {
    const record = await article.findById(input.id);
    record.comments = await comment.find({
      article_id: record.id
    });
    
    return record;
  },
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
});
