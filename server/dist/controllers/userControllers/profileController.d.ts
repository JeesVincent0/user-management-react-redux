import type { Response, Request } from "express";
export declare const profileController: {
    getUserData: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    sendAccessToke: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
};
//# sourceMappingURL=profileController.d.ts.map