import { Request, Response } from "express";
import { getBooksPaging } from "../services/book.service";
import { booksPagingMapper } from "../mappers/book.mapper";

const getBooksHomepage = async (req: Request, res: Response) => {
    try {
        const { page, limit } = req.query;

        const safePage = Number(page) < 1 ? 1 : Number(page);
        const safeLimit = limit == null ? 10 : Number(limit);

        const bookList = await getBooksPaging(safePage * 10, safeLimit);

        const metaPaging: metaPaging = {
            page,
            limit,
            totalPages,
            totalItems,
            hasNextPage,
            hasPreviousPage
        }

        const responseData = booksPagingMapper(bookList, metaPaging);
    } catch (error) {
        throw error;
    }
}

export {
    getBooksHomepage
}