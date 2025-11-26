import express from 'express';
import { signInController, signUpController } from '../controllers/auth.controller';
import { signInMiddleware, signUpMiddleware } from '../middlewares/auth.middleware';

const authRoute = express.Router();

authRoute.post("/sign-up", signUpMiddleware, signUpController);
authRoute.post("/sign-in", signInMiddleware, signInController);

export default authRoute;