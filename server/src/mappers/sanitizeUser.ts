import type { IUser } from "../model/userSchema.js";

export const sanitizeUser = (user: IUser): Partial<IUser> => {
    const userObject = user.toObject();
    delete userObject.hashPassword;
    delete userObject.refreshTokens;
    return userObject;
};