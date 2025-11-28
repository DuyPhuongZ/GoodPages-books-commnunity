import { Request } from 'express';
import { Algorithm } from 'jsonwebtoken';
import { Strategy as JwtStrategy, ExtractJwt, VerifyCallbackWithRequest, StrategyOptionsWithRequest, VerifiedCallback, } from 'passport-jwt';
import { findUserByUsername, findUserWithRoleByUsername } from '../services/user.service';

const options: StrategyOptionsWithRequest = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "duyphuongz",
    issuer: "goodpages",
    audience: "user",
    algorithms: ["HS256"] as Algorithm[],
    passReqToCallback: true
}

const verify: VerifyCallbackWithRequest = async (req: Request, jwtPayload: any, done: VerifiedCallback) => {
    try {
        let username = jwtPayload.username;
        const userFound = await findUserWithRoleByUsername(username);

        if (userFound == null) {
            return done(null, false, {
                message: "User not found"
            });
        }

        const currentUser = {
            username: userFound.username,
            email: userFound.email,
            role: userFound.role?.roleName
        }

        return done(null, currentUser);
    } catch (error) {
        return done(error as any, false);
    }
}

const jwtStrategy = new JwtStrategy(
    options,
    verify
);

export {
    jwtStrategy
}