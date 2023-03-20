import { Router } from 'express';
import userRouter from './api/user.routes';

const routes = Router();

routes.use('/', userRouter);

export default routes;
