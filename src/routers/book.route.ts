import express from 'express';
import { getBooksHomepage } from '../controllers/book.controller';

const bookRoute = express.Router();

bookRoute.get("/homepage", getBooksHomepage);
bookRoute.post("", createBookController);

export default bookRoute;