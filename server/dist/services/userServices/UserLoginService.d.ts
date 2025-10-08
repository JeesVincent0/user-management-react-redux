import type { IAuthUser, IhashToken, IjwtTokens, IUserRepository } from "../../interface/ICreateUser.js";
export declare class UserLoginService {
    private UserRepo;
    private jwtTokens;
    private comparePassword;
    private hashToken;
    constructor(UserRepo: IUserRepository, jwtTokens: IjwtTokens, comparePassword: any, hashToken: IhashToken);
    verifyLogin(data: {
        email: string;
        password: string;
    }): Promise<IAuthUser>;
}
//# sourceMappingURL=UserLoginService.d.ts.map