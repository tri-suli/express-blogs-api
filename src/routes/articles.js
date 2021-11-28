import Express from "express";

import Article from '../app/models/article';

const Router = Express.Router();

// Router.get('/', action.index);

// Router.get('/', action.show);

Router.post('/store', async (req, res) => {
  // const article = await Article
  res.send("create articles");
});

// Router.put('/update', action.update);

// Router.delete('/delete', action.remove);

export const ARTICLE_ROUTE_PREFIX = 'articles';

export default Router;
