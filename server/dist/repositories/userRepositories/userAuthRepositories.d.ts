import { type IUser } from "../../model/userSchema.js";
export declare class UserAuthRepositories {
    private user;
    constructor(user: any);
    findUserByEmail(email: string): Promise<IUser | null>;
    createNewUser(name: string, email: string, hashPassword: string): Promise<IUser>;
    updateRefreshToken(token: string, email: string): Promise<void>;
    existingUser(email: string, id: string): Promise<any>;
    updateProfile(id: string, updateData: any): Promise<any>;
}
//# sourceMappingURL=UserAuthRepositories.d.ts.map