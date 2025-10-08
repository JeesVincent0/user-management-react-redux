import { type Request, type Response } from "express";
declare const authController: {
    verifyLogin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export declare class AuthController {
    private userAuthService;
    constructor();
    createUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
export default authController;
//# sourceMappingURL=authController.d.ts.map