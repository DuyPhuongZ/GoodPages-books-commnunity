import prisma from "../config/prisma.client.config"

const signInByUsername = async (username: string) => {
    const foundUser = await prisma.user.findUnique({
        where: {
            username
        }
    })
    return foundUser;
}

export {
    signInByUsername
}