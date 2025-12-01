import { Request, Response, NextFunction } from "express";
import { createBookSchema, searchBookSchema, updateBookSchema } from "../validations/book.schema";
import { deleteBookSchema } from "../validations/auth.schema";

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

const deleteBookMiddleware = (req: Request, response: Response, next: NextFunction) => {
    try {
        const parsedData = deleteBookSchema.parse({ bookId: req.params.bookId });
        req.params.bookId = parsedData.bookId;
        next();
    } catch (error) {
        throw error;
    }
}

const searchBookMiddleware = async (req: Request, response: Response, next: NextFunction) => {
    try {
        console.log(">>> [searchBookMiddleware] req.query:", req.query);
        const parsedData = searchBookSchema.parse(req.query);
        (req as any).validatedQuery = parsedData;
        next();
    } catch (error) {
        throw error;
    }
}

export {
    createBookMiddleware,
    updateBookMiddleware,
    deleteBookMiddleware,
    searchBookMiddleware
}