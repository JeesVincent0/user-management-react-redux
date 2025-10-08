import type { Request, Response } from "express-serve-static-core";
export declare class ProfileUpdateController {
    private profileUpdateService;
    constructor(profileUpdateService: any);
    profileUpdate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>, number> | undefined>;
}
//# sourceMappingURL=ProfileUpdateController.d.ts.map