import z from "zod";
import { searchBookSchema } from "./validations/book.schema";

declare global {
    namespace Express {
        interface Request {
            validatedQuery?: z.infer<typeof searchBookSchema>;
        }
    }
}