import express from 'express';
import { signInController, signUpController } from '../controllers/auth.controller';
import { signUpMiddleware } from '../middlewares/signUp.middleware';
import { signInMiddleware } from '../middlewares/signin.middleware';

const authRoute = express.Router();

authRoute.post("/sign-up", signUpMiddleware, signUpController);
authRoute.post("/sign-in", signInMiddleware, signInController);

export default authRoute;