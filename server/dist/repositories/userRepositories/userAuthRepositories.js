import User, {} from "../../model/userSchema.js";
import { userAuthServices } from "../../services/userServices/userAuthServices.js";
import { hashToken } from "../../utility/hashToken.js";
export class userAuthRepositories {
    async findUserByEmail(email) {
        return await User.findOne({ email });
    }
    async createNewUser(name, email, password) {
        const userServices = new userAuthServices();
        const hashPassword = await userServices.passwordHashing(password);
        const newUser = new User({ name, email, hashPassword });
        return await newUser.save();
    }
    async updateRefreshToken(refreshToken, email) {
        await User.updateOne({ email }, { $push: { refreshTokens: { token: hashToken(refreshToken) } } });
    }
}
//# sourceMappingURL=userAuthRepositories.js.map