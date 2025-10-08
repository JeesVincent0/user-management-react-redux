import { sanitizeUser } from "../../mappers/sanitizeUser.js";
export class UserAuthServices {
    UserRepository;
    jwtTokens;
    hashToken;
    hashPassword;
    constructor(UserRepository, jwtTokens, hashToken, hashPassword) {
        this.UserRepository = UserRepository;
        this.jwtTokens = jwtTokens;
        this.hashToken = hashToken;
        this.hashPassword = hashPassword;
    }
    ;
    async createUser(data) {
        const { name, email, newPassword } = data;
        // chekcing new user email taken by another user.
        const checkEmail = await this.UserRepository.findUserByEmail(email);
        if (checkEmail)
            return { valid: false, message: "email already taken.", statusCode: 400 };
        // password hashing.
        const hashedPassword = await this.hashPassword(newPassword);
        // creating new user.
        const newUser = await this.UserRepository.createNewUser(name, email, hashedPassword);
        // generatin JWT tokens.
        const payLoad = { id: newUser._id.toString(), role: "user" };
        const accessToken = this.jwtTokens.generateAccessToken(payLoad);
        const refreshToken = this.jwtTokens.generateRefreshToken(payLoad);
        // updating refresh token in DB.
        await this.UserRepository.updateRefreshToken(this.hashToken(refreshToken), email);
        // removing sensitive fields from newUser.
        const newUserObject = sanitizeUser(newUser);
        return { user: newUserObject, accessToken, refreshToken };
    }
}
;
export class UserLoginServices {
}
//# sourceMappingURL=userAuthServices.js.map