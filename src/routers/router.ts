import express, { Express } from 'express';
import authRoute from './auth.route';
import bookRoute from './book.route';

const router = (app: Express) => {
    app.use("/auth", authRoute);
    app.use("/books", bookRoute);
}

export default router; 