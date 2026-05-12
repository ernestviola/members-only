import { Router } from 'express';
import indexController from '../controllers/indexController.js';

const indexRouter = Router();

indexRouter.get('/', indexController.get);

indexRouter.get('/sign-up', indexController.getSignUp);
indexRouter.post('/sign-up', indexController.postSignUp);
indexRouter.get('/log-in', (req, res) => {});

export default indexRouter;
