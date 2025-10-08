import type { Request, Response } from "express";
declare class UserLoginController {
    private loginService;
    constructor(loginService: any);
    verifyUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
export default UserLoginController;
//# sourceMappingURL=UserLoginController.d.ts.map