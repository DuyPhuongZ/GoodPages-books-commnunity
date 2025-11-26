import { Request, Response } from "express";
import { signInByUsername, signUp } from "../services/auth.service";
import { comparePassword, hashPassword } from "../utils/bcrypt.util";


const signUpController = async (req: Request, res: Response) => {
    const { username, email, password, confirmPassword } = req.body;
    console.log(">>> username:", username);
    console.log(">> password:", password);

    if (password != confirmPassword) {
        throw new Error("Password and Confirm Password is not matched");
    }

    let hashedPassword = await hashPassword(password);

    const user = await signUp({
        username,
        email,
        password: hashedPassword
    });

    return res.status(201).json({
        statusCode: 201,
        success: true,
        message: "SIGN UP SUCCESSFULLY",
        data: {
            accessToken: "123456789",
            refreshToken: "123456789"
        },
        error: null
    })
}

const signInController = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log(">>> username:", username);
    console.log(">> password:", password);

    const userFound = await signInByUsername(username);
    if (!userFound) {
        throw new Error("Username is not existed");
    }

    let isPasswordMatched = comparePassword(password, userFound.password);

    if (!isPasswordMatched) {
        throw new Error("Password is not incorrect");
    }

    return res.status(200).json({
        statusCode: 200,
        success: true,
        message: "SIGN IN SUCCESSFULLY",
        data: {
            accessToken: "123456789",
            refreshToken: "123456789"
        },
        error: null
    });
}

export {
    signInController,
    signUpController
}