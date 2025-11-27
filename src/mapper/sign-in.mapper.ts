import { SignInResponse } from "../responseDto/sign-in.dto"

const signInMapper = (user: any, accessToken: string, refreshToken: string) => {
    return new SignInResponse({
        username: user.username,
        role: user.role.roleName,
        accessToken,
        refreshToken
    });
}

export {
    signInMapper
}