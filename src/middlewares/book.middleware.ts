import { Request, Response, NextFunction } from "express";
import { createBookSchema, updateBookSchema } from "../validations/book.schema";

const createBookMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsedData = createBookSchema.parse(req.body);
        req.body = parsedData;
        next();
    } catch (error) {
        throw error;
    }
}

const updateBookMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsedData = updateBookSchema.parse(req.body);
        req.body = parsedData;
        next();
    } catch (error) {
        throw error;
    }
}

export {
    createBookMiddleware,
    updateBookMiddleware
}