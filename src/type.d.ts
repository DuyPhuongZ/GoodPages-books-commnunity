import z from "zod";
import { searchBookSchema } from "./validations/book.schema";
import { Prisma } from "./generated/prisma/client";

declare global {
    namespace Express {
        interface Request {
            validatedQuery?: z.infer<typeof searchBookSchema>;
        }
    }
}

interface JwtPayload {
    username: string,
    role: string
}

interface RestResponse<T = any, E = any> {
    statusCode: number;
    isSuccess: boolean;
    message: string;
    data?: T;
    error?: E;
}

interface SignInResponse {
    username: string;
    role: string;
    accessToken: string;
    refreshToken: string;
}

type UserWithRole = Prisma.UserGetPayload<{
    include: {
        role: true
    }
}>

type UserWithRoleOrNull = Prisma.UserGetPayload<{
    include: {
        role: true
    }
}> | null