import prisma from "../configs/prisma.client.config";

const findUserByUsername = async (username: string) => {
    const userFound = await prisma.user.findUnique({
        where: {
            username
        }
    });
    return userFound;
};

const findUserWithRoleByUsername = async (username: string) => {
    const userFound = await prisma.user.findUnique({
        where: {
            username
        },
        include: {
            role: true
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

const updatePasswordOfUser = async (password: string, username: string) => {
    const updatedUser = await prisma.user.update({
        where: {
            username
        },
        data: {
            password
        },
        include: {
            role: true
        }
    });
    return updatedUser;
}

export {
    findUserByUsername,
    findUserWithRoleByUsername,
    findUserByEmail,
    updatePasswordOfUser
}