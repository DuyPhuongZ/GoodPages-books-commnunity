import { Book, Prisma } from "../generated/prisma/client";
import { BookResponse, booksPagingResponse } from "../responseDtos/book.dto";
import { BookWithAuthorsWithGenres, MetaPaging } from "../type";

const booksPagingMapper = (books: Book[], meta: MetaPaging) => {
    return new booksPagingResponse({
        books,
        meta
    });
}

const bookWithAuthorAndGenresMapper = (book: BookWithAuthorsWithGenres) => {
    const {
        id,
        title,
        description,
        publishDate,
        language,
        pageCount,
        isbn10,
        isbn13,
        publisher,
        format,
        averageRating,
        ratingsCount,
        reviewsCount,
        coverImageUrl,
        publicId,
        authors,
        genres,
        createdAt,
        updatedAt
    } = book;

    return new BookResponse({
        id,
        title,
        description,
        publishDate,
        language,
        pageCount,
        isbn10,
        isbn13,
        publisher,
        format,
        averageRating,
        ratingsCount,
        reviewsCount,
        coverImageUrl,
        publicId,
        authors,
        genres,
        createdAt,
        updatedAt
    });
}

export {
    booksPagingMapper,
    bookWithAuthorAndGenresMapper
}