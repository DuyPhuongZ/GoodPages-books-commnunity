import prisma from "../config/prisma.client.config"

const signUp = async ({
    username,
    password,
    email
}: {
    username: string,
    password: string,
    email: string
}) => {
    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password,
            role: "User",
        }
    })
    return newUser;
}

const signInByUsername = async (username: string) => {
    const foundUser = await prisma.user.findUnique({
        where: {
            username
        }
    })
    return foundUser;
}

export {
    signInByUsername,
    signUp
}