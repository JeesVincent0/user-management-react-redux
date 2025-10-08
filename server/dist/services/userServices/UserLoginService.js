import { sanitizeUser } from "../../mappers/sanitizeUser.js";
export class UserLoginService {
    UserRepo;
    jwtTokens;
    comparePassword;
    hashToken;
    constructor(UserRepo, jwtTokens, comparePassword, hashToken) {
        this.UserRepo = UserRepo;
        this.jwtTokens = jwtTokens;
        this.comparePassword = comparePassword;
        this.hashToken = hashToken;
    }
    ;
    async verifyLogin(data) {
        const { email, password } = data;
        // email validation
        const getUser = await this.UserRepo.findUserByEmail(email);
        if (!getUser)
            return { valid: false, message: "Enter valid email.", statusCode: 400 };
        // passwrod validation
        const checkPassword = await this.comparePassword(password, getUser.hashPassword);
        if (!checkPassword)
            return { valid: false, message: "Wrong password.", statusCode: 400 };
        // generate JWT tokens.
        const payLoad = { id: getUser._id.toString(), role: "user" };
        const accessToken = this.jwtTokens.generateAccessToken(payLoad);
        const refreshToken = this.jwtTokens.generateRefreshToken(payLoad);
        // updating refresh token in DB.
        await this.UserRepo.updateRefreshToken(this.hashToken(refreshToken), email);
        // removing sensitive data.
        const userObj = sanitizeUser(getUser);
        return { user: userObj, accessToken, refreshToken };
    }
}
//# sourceMappingURL=UserLoginService.js.map