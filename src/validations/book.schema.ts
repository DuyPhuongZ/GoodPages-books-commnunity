import z from "zod";
import { BookFormat } from "../generated/prisma/enums";

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
    id: z.string().min(1, "Book Id is required"),
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

export {
    createBookSchema,
    updateBookSchema
}