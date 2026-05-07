import { Router } from 'express';

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

indexRouter.get('/sign-up', (req, res) => {});
indexRouter.post('/sign-up', (req, res) => {});
indexRouter.get('/log-in', (req, res) => {});

export default indexRouter;
