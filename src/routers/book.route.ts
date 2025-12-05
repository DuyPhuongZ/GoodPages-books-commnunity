import express from 'express';
import { createBookController, deleteBookController, getBooksHomepage, getBooksPagingController, searchBookController, updateBookController } from '../controllers/book.controller';
import { upload } from '../configs/multer.config';
import passport from 'passport';
import { isAdmin, isAuthor } from '../middlewares/auth.middleware';
import { createBookMiddleware, deleteBookMiddleware, searchBookMiddleware, updateBookMiddleware } from '../middlewares/book.middleware';

const bookRoute = express.Router();

bookRoute.get("/homepage", getBooksHomepage);
bookRoute.get("/search", searchBookMiddleware, searchBookController);

//CRUD Book for admin
bookRoute.get("", getBooksPagingController);
bookRoute.post("", passport.authenticate("jwt", { session: false }), isAdmin, upload.single("picture"), createBookMiddleware, createBookController);
bookRoute.put("/:bookId", passport.authenticate("jwt", { session: false }), isAdmin, upload.single("picture"), updateBookMiddleware, updateBookController);
bookRoute.delete("/:bookId", passport.authenticate("jwt", { session: false }), isAdmin, deleteBookMiddleware, deleteBookController);


export default bookRoute;