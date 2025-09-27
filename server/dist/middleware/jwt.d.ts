import { type Response, type Request, type NextFunction } from "express";
export declare const accessTokenValidation: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const refreshTokenValidation: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=jwt.d.ts.map