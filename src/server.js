import cors from 'cors';
import express from 'express';

import config from './constants/config';
import DBConnect from './app/db/connection';
import Routes from './routes';

const app = express();

DBConnect(config.app.env);

app.use(cors());

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome',
  });
});

Routes.forEach((route) => {
  app.use(`/${route.prefix}`, route.routes);
});

app.listen(config.app.port, () => {
  console.log(`Running a GraphQL API server at http://localhost:${config.app.port}`);
});
