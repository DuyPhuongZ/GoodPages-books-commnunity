import { Request, Response, NextFunction } from "express";
import z from "zod";
import signInSchema from "../validation/signin.schema";

const signInMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsedData = await signInSchema.parse(req.body);
        req.body = parsedData;
    } catch (error) {
        throw error;
    }
}

export {
    signInMiddleware
}