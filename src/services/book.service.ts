import prisma from "../configs/prisma.client.config";
import { BookFormat, BookStatus } from "../generated/prisma/enums";
import { UpdateBookEntity } from "../type";

const getBooksPaging = async (skip: number, limit: number) => {
    try {
        const books = await prisma.book.findMany({
            skip,
            take: limit,
            orderBy: {
                title: "asc"
            }
        });
        return books;
    } catch (error) {
        throw error;
    }
}

const getBooks = async () => {
    try {
        return await prisma.book.findMany();
    } catch (error) {
        throw error;
    }
}

const getBooksWithAuthorsAndGenres = async () => {
    try {
        return prisma.book.findMany({
            include: {
                authors: true,
                genres: true
            }
        });
    } catch (error) {
        throw error;
    }
}

const getBooksWithAuthors = async () => {
    try {
        return await prisma.book.findMany({
            include: {
                authors: true
            }
        });
    } catch (error) {
        throw error;
    }
}

const getBooksWithGenres = async () => {
    try {
        return await prisma.book.findMany({
            include: {
                genres: true
            }
        });
    } catch (error) {
        throw error;
    }
}

const addBook = async ({
    title,
    description,
    publishDate,
    language,
    pageCount,
    isbn10,
    isbn13,
    publisher,
    format,
    imageCloudUrl,
    authorsId,
    genresId
}: {
    title: string,
    description: string,
    publishDate: string,
    language: string,
    pageCount: string,
    isbn10: string,
    isbn13: string,
    publisher: string,
    format: BookFormat,
    imageCloudUrl: string,
    authorsId: number[],
    genresId: number[]
}) => {
    try {
        const newBook = await prisma.book.create({
            data: {
                title,
                description,
                publishDate: new Date(publishDate).toISOString(),
                language,
                pageCount: Number(pageCount),
                isbn10,
                isbn13,
                publisher,
                format,
                coverImageUrl: imageCloudUrl,
                authors: {
                    connect: authorsId.map((id) => {
                        return { id }
                    })
                },
                genres: {
                    connect: genresId.map((id) => ({ id }))
                }
            },
            include: {
                authors: {
                    select: {
                        id: true,
                        name: true,
                        photoUrl: true
                    }
                },
                genres: {
                    select: {
                        id: true,
                        genresName: true
                    }
                }
            }
        });

        return newBook;
    } catch (error) {
        throw error;
    }
}

const updateBook = async ({
    bookId,
    title,
    description,
    publishDate,
    language,
    pageCount,
    isbn10,
    isbn13,
    publisher,
    format,
    authorsId,
    genresId
}: UpdateBookEntity) => {
    try {
        const newBook = await prisma.book.update({
            where: {
                id: bookId
            },
            data: {
                title,
                description,
                publishDate,
                language,
                pageCount: Number(pageCount),
                isbn10,
                isbn13,
                publisher,
                format,
                authors: {
                    connect: authorsId.map((id) => {
                        return { id }
                    })
                },
                genres: {
                    connect: genresId.map((id) => ({ id }))
                }
            },
            include: {
                authors: {
                    select: {
                        id: true,
                        name: true,
                        photoUrl: true
                    }
                },
                genres: {
                    select: {
                        id: true,
                        genresName: true
                    }
                }
            }
        });

        return newBook;
    } catch (error) {
        throw error;
    }
}

const updateBookImage = async (bookId: number, url: string, publicId: string) => {
    try {
        const result = await prisma.book.update({
            where: {
                id: bookId
            },
            data: {
                coverImageUrl: url,
                publicId: publicId
            },
            include: {
                authors: {
                    select: {
                        id: true,
                        name: true,
                        photoUrl: true
                    }
                },
                genres: {
                    select: {
                        id: true,
                        genresName: true
                    }
                }
            }
        });

        return result;
    } catch (error) {
        throw error;
    }
}

const deleteBookByBookId = async (bookId: number) => {
    try {
        const result = await prisma.book.delete({
            where: {
                id: bookId
            }
        });
        return result;
    } catch (error) {
        throw error;
    }
}

const searchBook = async ({
    keyword,
    skip,
    limit,
    sort,
    searchByTarget,
    sortByTarget,
    bookStatus
}: {
    keyword: string,
    skip: number,
    limit: number,
    sort: string,
    searchByTarget: string,
    sortByTarget: string,
    bookStatus: BookStatus
}) => {
    try {
        const result = await prisma.book.findMany({
            where: {
                [searchByTarget]: {
                    contains: keyword
                },
                status: bookStatus
            },
            skip,
            take: limit,
            orderBy: {
                [sortByTarget]: sort
            }
        })
        console.log(">>> [searchBook] result:", result);
        return result;
    } catch (error) {
        throw error;
    }
}

const searchBookSize = async ({
    keyword,
    skip,
    limit,
    sort,
    searchByTarget,
    sortByTarget
}: {
    keyword: string,
    skip: number,
    limit: number,
    sort: string,
    searchByTarget: string,
    sortByTarget: string
}) => {
    try {
        const result = await prisma.book.findMany({
            where: {
                [searchByTarget]: {
                    contains: keyword
                }
            },
            orderBy: {
                [sortByTarget]: sort
            }
        })
        return result.length;
    } catch (error) {
        throw error;
    }
}

export {
    getBooksPaging,
    getBooks,
    getBooksWithAuthorsAndGenres,
    getBooksWithAuthors,
    getBooksWithGenres,
    addBook,
    updateBook,
    updateBookImage,
    deleteBookByBookId,
    searchBook,
    searchBookSize
}