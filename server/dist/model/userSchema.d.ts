import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    name?: string;
    email: string;
    hashPassword: string;
    image?: string;
    address?: {
        houseName?: string;
        area?: string;
        city?: string;
        pic?: string;
        phone?: number;
    };
    isAdmin: boolean;
    refreshTokens: RefreshToken[];
}
interface RefreshToken {
    token: String;
    createdAt?: Date;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default User;
//# sourceMappingURL=userSchema.d.ts.map