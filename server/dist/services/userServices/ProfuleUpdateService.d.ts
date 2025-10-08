import type { IUserInput } from "../../interface/IUpdateProfile.js";
export declare class ProfileUpdateService {
    private UserRepo;
    constructor(UserRepo: any);
    updateProfile: (data: IUserInput, id: string, file: any) => Promise<{
        valid?: boolean;
        message?: string;
        statusCode?: number;
        user?: any;
    }>;
}
//# sourceMappingURL=ProfuleUpdateService.d.ts.map