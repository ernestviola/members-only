import { Router } from 'express';
import indexController from '../controllers/indexController.js';

const indexRouter = Router();

indexRouter.get('/', indexController.get);

indexRouter.get('/board', indexController.getBoard);
indexRouter.post('/message', indexController.postMessage);

indexRouter.get('/sign-up', indexController.getSignUp);
indexRouter.post('/sign-up', indexController.postSignUp);
indexRouter.get('/login', indexController.getLogin);
indexRouter.post('/login', indexController.postLogin);
indexRouter.get('/logout', indexController.logout);

export default indexRouter;
