import type { IUser } from "../model/userSchema.js";

export interface IAuthUser {
    user?: Partial<IUser>;
    accessToken?: string;
    refreshToken?: string;
    valid?: boolean;
    message?: string;
    statusCode?: number;
}

export interface Idata {
    name: string;
    email: string;
    newPassword: string;
};

export interface IUserRepository {
    findUserByEmail(email: string): Promise<IUser | null>;
    createNewUser(name: string, email: string, hashedPassword: string): Promise<IUser>;
    updateRefreshToken(token: string, email: string): void;
}

export interface IPayLoad {
    id: string;
    role: "user" | "admin";
};

export interface IjwtTokens {
    generateAccessToken(payload: IPayLoad): string;
    generateRefreshToken(payLoad: IPayLoad): string;
}

export interface IhashToken {
    (token: string): string;
}

export interface IhashPassword {
    (password: string): Promise<string>;
}