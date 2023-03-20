import { Router } from 'express';
import * as controllers from '../../controllers/controller';
import authenticatedmidddleware from '../../middleware/authenticate.middleware';

const routes = Router();

// register new user
routes.post('/users/register', controllers.create);
// get all users
routes.get('/users/getdate', authenticatedmidddleware, controllers.getData);
// auth user
routes.post('/users/authenticated', controllers.authenticated);

export default routes;
