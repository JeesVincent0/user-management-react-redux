import { type Request, type Response } from "express";
declare const authController: {
    createUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    verifyLogin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export default authController;
//# sourceMappingURL=authController.d.ts.map