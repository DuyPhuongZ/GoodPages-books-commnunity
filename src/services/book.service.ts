import prisma from "../configs/prisma.client.config";

const getBooksPaging = async (skip: number, limit: number) => {
    try {
        const books = prisma.book.findMany({
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

export {
    getBooksPaging
}