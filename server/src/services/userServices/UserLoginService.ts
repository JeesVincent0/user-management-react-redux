import type { ObjectId } from "mongoose";
import type { IAuthUser, IhashToken, IjwtTokens, IPayLoad, IUserRepository } from "../../interface/ICreateUser.js";
import { sanitizeUser } from "../../mappers/sanitizeUser.js";

export class UserLoginService {
    constructor(
        private UserRepo: IUserRepository,
        private jwtTokens: IjwtTokens,
        private comparePassword: any,
        private hashToken: IhashToken,
    ) { };

    public async verifyLogin(data: { email: string, password: string }): Promise<IAuthUser> {

        const { email, password } = data;

        // email validation
        const getUser = await this.UserRepo.findUserByEmail(email);
        if (!getUser) return { valid: false, message: "Enter valid email.", statusCode: 400 };

        // passwrod validation
        const checkPassword = await this.comparePassword(password, getUser.hashPassword);
        if (!checkPassword) return { valid: false, message: "Wrong password.", statusCode: 400 };

        // generate JWT tokens.
        const payLoad: IPayLoad = { id: (getUser._id as ObjectId).toString(), role: "user" };
        const accessToken = this.jwtTokens.generateAccessToken(payLoad);
        const refreshToken = this.jwtTokens.generateRefreshToken(payLoad);

        // updating refresh token in DB.
        await this.UserRepo.updateRefreshToken(this.hashToken(refreshToken), email);

        // removing sensitive data.
        const userObj = sanitizeUser(getUser);

        return { user: userObj, accessToken, refreshToken };


    }
}