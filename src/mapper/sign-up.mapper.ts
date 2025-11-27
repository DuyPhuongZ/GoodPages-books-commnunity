import { User } from "../generated/prisma/client";
import { SignUpResponse } from "../responseDto/sign-up.dto"

const signUpMapper = (user: any, accessToken: string, refreshToken: string) => {
    return new SignUpResponse({
        username: user.username,
        role: user.role.roleName,
        accessToken,
        refreshToken
    });
};

export {
    signUpMapper
}