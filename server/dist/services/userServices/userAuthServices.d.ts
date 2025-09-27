export declare class userAuthServices {
    validator(data: any): {
        valid: boolean;
        message?: string;
        name?: string;
        email?: string;
        password?: string;
    };
    passwordHashing(password: string): Promise<string>;
}
//# sourceMappingURL=userAuthServices.d.ts.map