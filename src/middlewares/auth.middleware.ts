import { NextFunction, Request, Response } from "express";
import signInSchema from "../validations/signin.schema";
import signUpSchema from "../validations/signup.schema";
import { changePasswordSchema } from "../validations/forgotpassword.schema";

const signInMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsedData = signInSchema.parse(req.body);
        req.body = parsedData;
        next()
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

const changePasswordMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(">>> [changePasswordMiddleware] came");
    try {
        const parsedData = changePasswordSchema.parse(req.body);
        req.body = parsedData;
        next();
    } catch (error) {
        throw error;
    }
}

// const validateAdminToken = (req: Request, res: Response, next: NextFunction) => {

// }

export {
    signInMiddleware,
    signUpMiddleware,
    changePasswordMiddleware
}