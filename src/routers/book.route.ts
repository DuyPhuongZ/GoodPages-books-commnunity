import express from 'express';
import { createBookController, getBooksHomepage, getBooksPagingController, updateBookController } from '../controllers/book.controller';
import { upload } from '../configs/multer.config';
import passport from 'passport';
import { isAdmin, isAuthor } from '../middlewares/auth.middleware';
import { createBookMiddleware, updateBookMiddleware } from '../middlewares/book.middleware';

const bookRoute = express.Router();

bookRoute.get("/homepage", getBooksHomepage);

//CRUD Book for admin
bookRoute.get("", getBooksPagingController);
bookRoute.post("", passport.authenticate("jwt", { session: false }), isAdmin, upload.single("picture"), createBookMiddleware, createBookController);
bookRoute.put("", passport.authenticate("jwt", { session: false }), isAdmin, upload.single("picture"), updateBookMiddleware, updateBookController);

export default bookRoute;