import { NextFunction, Request, Response } from "express";
import signUpSchema from "../validation/signup.schema";

const signUpMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsedData = signUpSchema.parse(req.body);
        req.body = parsedData;
        next();
    } catch (error) {
        throw error;
    }
    next();
}

export {
    signUpMiddleware
}