import {} from "../../model/userSchema.js";
export class UserAuthRepositories {
    user;
    constructor(user) {
        this.user = user;
    }
    ;
    async findUserByEmail(email) {
        return await this.user.findOne({ email });
    }
    async createNewUser(name, email, hashPassword) {
        const newUser = new this.user({ name, email, hashPassword });
        return await newUser.save();
    }
    async updateRefreshToken(token, email) {
        await this.user.updateOne({ email }, { $push: { refreshTokens: { token } } });
    }
    async existingUser(email, id) {
        return await this.user.findOne({ email, _id: { $ne: id } });
    }
    async updateProfile(id, updateData) {
        return await this.user.findByIdAndUpdate(id, updateData, { new: true });
    }
}
;
//# sourceMappingURL=UserAuthRepositories.js.map