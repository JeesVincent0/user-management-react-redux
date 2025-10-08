import type { ICreateUser, Idata, IhashPassword, IhashToken, IjwtTokens, IUserRepository } from "../../interface/ICreateUser.js";
export declare class UserAuthServices {
    private UserRepository;
    private jwtTokens;
    private hashToken;
    private hashPassword;
    constructor(UserRepository: IUserRepository, jwtTokens: IjwtTokens, hashToken: IhashToken, hashPassword: IhashPassword);
    createUser(data: Idata): Promise<ICreateUser>;
}
export declare class UserLoginServices {
}
//# sourceMappingURL=userAuthServices.d.ts.map