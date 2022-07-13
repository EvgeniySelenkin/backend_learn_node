import bodyParser from 'body-parser';
import express from 'express';
import { postsController } from './posts';
import { usersController } from './users';

const PORT = 3000;

export const app = express();

app.use(bodyParser.json());

app.use(postsController);
app.use(usersController);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Express application started on http://localhost:${PORT}`);
  });
}
