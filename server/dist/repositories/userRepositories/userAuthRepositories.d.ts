import { type IUser } from "../../model/userSchema.js";
export declare class userAuthRepositories {
    findUserByEmail(email: string): Promise<IUser | null>;
    createNewUser(name: string, email: string, password: string): Promise<IUser>;
    updateRefreshToken(refreshToken: string, email: string): Promise<void>;
}
//# sourceMappingURL=userAuthRepositories.d.ts.map