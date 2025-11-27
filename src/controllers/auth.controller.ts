import { Request, Response } from "express";
import { signAccessToken, signInByUsername, signRefreshToken, signUp } from "../services/auth.service";
import { comparePassword, hashPassword } from "../utils/bcrypt.util";
import { findUserByEmail, findUserByUsername } from "../services/user.service";
import { signUpMapper } from "../mapper/sign-up.mapper";
import { responseMapper } from "../mapper/rest-response.mapper";
import { signInMapper } from "../mapper/sign-in.mapper";


const signUpController = async (req: Request, res: Response) => {
    const { username, email, password, confirmPassword } = req.body;
    console.log(">>> username:", username);
    console.log(">> password:", password);

    const isUsernamExisted = await findUserByUsername(username);
    if (isUsernamExisted != null) {
        throw new Error("Username has been used");
    }

    const isEmailExisted = await findUserByEmail(username);
    if (isEmailExisted != null) {
        throw new Error("Email has been used");
    }

    if (password != confirmPassword) {
        throw new Error("Password and Confirm Password is not matched");
    }

    let hashedPassword = await hashPassword(password);

    const user = await signUp({
        username,
        email,
        password: hashedPassword
    });

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    const responseData = signUpMapper(user, accessToken, refreshToken);

    const response = {
        statusCode: 201,
        isSuccess: true,
        message: "SIGN UP SUCCESSFULLY",
        data: responseData,
        error: null
    }

    return res.status(201).json(responseMapper(response));
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

    const accessToken = signAccessToken(userFound);
    const refreshToken = signRefreshToken(userFound);

    const responseData = signInMapper(userFound, accessToken, refreshToken);

    return res.status(200).json(responseMapper({
        statusCode: 200,
        isSuccess: true,
        message: "SIGN IN SUCCESSFULLY",
        data: responseData,
        error: null
    }));
}

export {
    signInController,
    signUpController
}