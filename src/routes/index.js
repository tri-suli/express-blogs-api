import ArticleRouter, { ARTICLE_ROUTE_PREFIX } from './articles';
import CommentRouter, { COMMENT_ROUTE_PREFIX } from './comments';
import GraphqlRouter, { GRAPHQL_ROUTE_PREFIX } from './graphql';

const Routes = [{
  prefix: ARTICLE_ROUTE_PREFIX,
  routes: ArticleRouter,
}, {
  prefix: COMMENT_ROUTE_PREFIX,
  routes: CommentRouter,
}, {
  prefix: GRAPHQL_ROUTE_PREFIX,
  routes: GraphqlRouter
}];

export default Routes;
