import type { IhashToken } from "../../interface/ICreateUser.js";
export declare class UserLogoutService {
    private UserRepo;
    private hashToken;
    constructor(UserRepo: any, hashToken: IhashToken);
    logoutUser: () => void;
}
//# sourceMappingURL=UserLogoutService.d.ts.map