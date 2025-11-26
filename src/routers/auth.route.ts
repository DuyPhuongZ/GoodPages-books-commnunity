import express from 'express';
import { signInController } from '../controllers/auth.controller';

const authRoute = express.Router();

authRoute.get("/sign-in", signInController);

export default authRoute;