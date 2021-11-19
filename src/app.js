require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();
const port = process.env.SERVER_PORT;
const mongodb = require('./collection/mongodb');
const api = require('./api');

mongodb.connect(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_NAME
);

app.use('/graphql', graphqlHTTP({
  schema: api.schema,
  rootValue: api.resolver,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(api.resolver);
  console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
});
