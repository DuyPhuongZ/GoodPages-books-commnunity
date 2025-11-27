
export class SignUpResponse {
    username?: string;
    role?: string;
    accessToken?: string;
    refreshToken?: string;

    constructor({
        username = "",
        role = "",
        accessToken = "",
        refreshToken = ""
    }: {
        username?: string,
        role?: string,
        accessToken?: string,
        refreshToken?: string
    }) {
        this.username = username;
        this.role = role;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}