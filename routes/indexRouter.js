import { Router } from 'express';

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.render('index');
});

indexRouter.get('/sign-up', (req, res) => {});
indexRouter.post('/sign-up', (req, res) => {});
indexRouter.get('/log-in', (req, res) => {});

export default indexRouter;
