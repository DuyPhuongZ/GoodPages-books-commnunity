import bcrypt from 'bcrypt';

const hashPassword = (password: string) => {
    try {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    } catch (error) {
        throw new Error("Hash Password is failed");
    }
}

const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
}

export {
    hashPassword,
    comparePassword
}