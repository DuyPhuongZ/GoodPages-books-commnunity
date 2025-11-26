import { NextFunction, Request, Response } from "express";
import signInSchema from "../validation/signin.schema";
import signUpSchema from "../validation/signup.schema";

const signInMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsedData = signInSchema.parse(req.body);
        req.body = parsedData;
    } catch (error) {
        throw error;
    }
}

const signUpMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsedData = signUpSchema.parse(req.body);
        req.body = parsedData;
        next();
    } catch (error) {
        throw error;
    }
}

export {
    signInMiddleware,
    signUpMiddleware
}