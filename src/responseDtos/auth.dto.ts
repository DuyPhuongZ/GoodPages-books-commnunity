
class SignInResponseDTO {
    username: string;
    role: string;
    accessToken: string;
    refreshToken: string;

    constructor({
        username,
        role,
        accessToken,
        refreshToken
    }: {
        username: string,
        role: string,
        accessToken: string,
        refreshToken: string
    }) {
        this.username = username;
        this.role = role;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}


class SignUpResponseDTO {
    username: string;
    role: string;
    accessToken: string;
    refreshToken: string;

    constructor({
        username = "",
        role = "",
        accessToken = "",
        refreshToken = ""
    }: {
        username: string,
        role: string,
        accessToken: string,
        refreshToken: string
    }) {
        this.username = username;
        this.role = role;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}


class ChangePasswordResponseDTO {
    accessToken: string;
    refreshToken: string;

    constructor({
        accessToken,
        refreshToken
    }: {
        accessToken: string,
        refreshToken: string
    }) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}

export {
    SignInResponseDTO,
    SignUpResponseDTO,
    ChangePasswordResponseDTO
}