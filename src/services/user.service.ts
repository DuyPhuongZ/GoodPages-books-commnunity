import prisma from "../config/prisma.client.config";

const findUserByUsername = async (username: string) => {
    const userFound = await prisma.user.findUnique({
        where: {
            username
        }
    });
    return userFound;
};

const findUserByEmail = async (email: string) => {
    const userFound = await prisma.user.findUnique({
        where: {
            email
        }
    });
    return userFound;
}

export {
    findUserByUsername,
    findUserByEmail
}