import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// http://localhost:3333/users
routes.post('/users', UserController.store);

// http://localhost:3333/sessions
routes.post('/sessions', SessionController.store);

// Definindo um middleware global
routes.use(authMiddleware);

// http://localhost:3333/users
routes.put('/users', UserController.update);

export default routes;
