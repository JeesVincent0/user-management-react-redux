import User, { type IUser } from "../../model/userSchema.js";
import { userAuthServices } from "../../services/userServices/userAuthServices.js";
import { hashToken } from "../../utility/hashToken.js";

export class userAuthRepositories {
    async findUserByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }
    async createNewUser(name: string, email: string, password: string): Promise<IUser> {

        const userServices = new userAuthServices();
        const hashPassword = await userServices.passwordHashing(password);

        const newUser = new User({ name, email, hashPassword });
        return await newUser.save();

    }
    async updateRefreshToken(refreshToken: string, email: string) {
        await User.updateOne({ email }, { $push: { refreshTokens: { token: hashToken(refreshToken) } } });
    }
}