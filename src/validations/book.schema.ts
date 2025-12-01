import z from "zod";
import { BookFormat, BookStatus } from "../generated/prisma/enums";

const createBookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional().nullable(),
    publishDate: z.string().optional().nullable(),
    language: z.string().min(1, "Language is required"),
    pageCount: z.string().optional().nullable().transform((val) => val ? Number(val) : null),
    isbn10: z.string().optional().nullable(),
    isbn13: z.string().optional().nullable(),
    publisher: z.string().optional().nullable(),
    format: z.enum(BookFormat).optional().nullable(),
    authorsIdRaw: z.union([
        z.string(),
        z.array(z.string())
    ]).optional(),
    genresIdRaw: z.union([
        z.string(),
        z.array(z.string())
    ]).optional()
});

const updateBookSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional().nullable(),
    publishDate: z.string().optional().nullable(),
    language: z.string().min(1, "Language is required"),
    pageCount: z.string().optional().nullable().transform((val) => val ? Number(val) : null),
    isbn10: z.string().optional().nullable(),
    isbn13: z.string().optional().nullable(),
    publisher: z.string().optional().nullable(),
    format: z.enum(BookFormat).optional().nullable(),
    authorsIdRaw: z.union([
        z.string(),
        z.array(z.string())
    ]).optional(),
    genresIdRaw: z.union([
        z.string(),
        z.array(z.string())
    ]).optional()
});

const searchBookSchema = z.object({
    keyword: z.string().trim().optional().transform((item) => item || ""),
    page: z.string().min(1, "Page is required"),
    limit: z.string().min(1, "Limit is required"),
    sort: z.enum(["asc", "desc"]).catch("asc"),
    searchByTarget: z.enum(["title", "author", "publishDate", "isbn10", "isbn13", "rating", "reviews", "genres"]).catch("title"),
    sortByTarget: z.enum(["title", "author", "publishDate", "isbn10", "isbn13", "rating", "reviews", "genres"]).catch("title"),
    bookStatus: z.enum(BookStatus).catch(BookStatus.PUBLISHED)
});

export {
    createBookSchema,
    updateBookSchema,
    searchBookSchema
}