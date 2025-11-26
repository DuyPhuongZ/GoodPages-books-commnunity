import { Request, Response } from "express";
import { signInByUsername, signUp } from "../services/auth.service";


const signUpController = async (req: Request, res: Response) => {
    const { username, email, password, confirmPassword } = req.body;
    console.log(">>> username:", username);
    console.log(">> password:", password);

    if (password != confirmPassword) {
        throw new Error("Password and Confirm Password is not matched");
    }

    const user = await signUp({
        username,
        email,
        password
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

    if (userFound.password != password) {
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