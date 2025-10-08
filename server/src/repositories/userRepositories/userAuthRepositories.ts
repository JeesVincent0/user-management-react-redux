import { type IUser } from "../../model/userSchema.js";

export class UserAuthRepositories {

    constructor(
        private user: any,
    ) { };

    async findUserByEmail(email: string): Promise<IUser | null> {
        return await this.user.findOne({ email });
    }

    async createNewUser(name: string, email: string, hashPassword: string): Promise<IUser> {
        const newUser = new this.user({ name, email, hashPassword });
        return await newUser.save();
    }

    async updateRefreshToken(token: string, email: string) {
        await this.user.updateOne({ email }, { $push: { refreshTokens: { token } } });
    }

    async existingUser(email: string, id: string) {
        return await this.user.findOne({ email, _id: { $ne: id } });
    }

    async updateProfile(id: string, updateData: any) {
        return await this.user.findByIdAndUpdate(id, updateData, { new: true });
    }

};