import { type Request, type Response } from "express";
export declare class UserAuthController {
    private signupService;
    constructor(signupService: any);
    createUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=UserAuthController.d.ts.map