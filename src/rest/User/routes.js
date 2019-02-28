import express from 'express';
import * as UserController from './controller/';

const UserRoutes = express.Router();

UserRoutes.put("/user/:id", UserController.UpdateUser);

export default UserRoutes;
