import { SignInResponseDTO, SignUpResponseDTO, ChangePasswordResponseDTO } from "../responseDtos/auth.dto";
import { UserWithRole } from "../type";

const signUpMapper = (user: UserWithRole, accessToken: string, refreshToken: string) => {
    return new SignUpResponseDTO({
        username: user.username,
        role: user.role?.roleName || "UNAUTHORIZED",
        accessToken,
        refreshToken
    });
};

const signInMapper = (user: UserWithRole, accessToken: string, refreshToken: string) => {
    return new SignInResponseDTO({
        username: user.username,
        role: user.role?.roleName || "UNAUTHORIZED",
        accessToken,
        refreshToken
    });
}

const changePasswordMapper = (accessToken: string, refreshToken: string) => {
    return new ChangePasswordResponseDTO({
        accessToken,
        refreshToken
    })
};

export {
    signUpMapper,
    signInMapper,
    changePasswordMapper
}