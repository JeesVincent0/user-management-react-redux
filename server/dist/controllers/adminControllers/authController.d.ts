import { type Request, type Response } from "express";
declare const adminAuthController: {
    verifyLogin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllUsers: (req: Request, res: Response) => Promise<void>;
    updateUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteUser: (req: Request, res: Response) => Promise<void>;
    logout: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
};
export default adminAuthController;
//# sourceMappingURL=authController.d.ts.map