import prisma from "../configs/prisma.client.config"
import { UserWithRole } from "../type";
import { signToken } from "../utils/jwt.util";

const signUp = async ({
    username,
    password,
    email
}: {
    username: string,
    password: string,
    email: string
}) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password,
                role: {
                    connect: {
                        roleName: "READER"
                    }
                },
            },
            include: {
                role: true
            }
        });
        return newUser;
    } catch (error) {
        throw error;
    }
}

const signInByUsername = async (username: string) => {
    try {
        const foundUser = await prisma.user.findUnique({
            where: {
                username
            },
            include: {
                role: true
            }
        });
        return foundUser;
    } catch (error) {
        throw error;
    }
}

const signAccessToken = (user: UserWithRole) => {
    const payload = {
        username: user.username,
        role: user.role?.roleName || "UNAUTHORIZED"
    };
    const accessToken = signToken(payload, "1d");
    return accessToken;
}

const signRefreshToken = (user: UserWithRole) => {
    const payload = {
        username: user.username,
        role: user.role?.roleName || "UNAUTHORIZED"
    };
    const accessToken = signToken(payload, "7d");
    return accessToken;
}

export {
    signInByUsername,
    signUp,
    signAccessToken,
    signRefreshToken
}