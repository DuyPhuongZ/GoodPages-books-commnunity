import { Request, Response } from "express";
import { signInByUsername } from "../services/auth.service";


const signInController = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const userFound = await signInByUsername(username);
    if (!userFound) {
        throw new Error("Username is not existed");
    }

    if (userFound.password != password) {
        throw new Error("Password is not incorrect");
    }

    return userFound;
}

export {
    signInController
}