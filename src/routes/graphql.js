// import Express from 'express';
import { graphqlHTTP } from 'express-graphql';

import schema from '../app/graphql/schema';

// const Router = Express.Router();

// Router.get('/grapql', graphqlHTTP({
  
// }));

const router = graphqlHTTP({
  schema,
  // rootValue: resolver,
  graphiql: true,
});

export const GRAPHQL_ROUTE_PREFIX = 'graphql';

export default router;
