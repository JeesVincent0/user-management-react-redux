import { type Response, type Request, type NextFunction } from "express";
import jwt from "jsonwebtoken";

export const accessTokenValidation = (req: Request, res: Response, next: NextFunction) => {

    const accessToken = req.cookies.accessToken;

    if (!accessToken) return res.status(401).json({ status: 'failed', validation: 'failed', message: "access one token not valid..." });

    const ACCESS_TOKEN_SECRET_KEY: string = process.env.ACCESS_JWT_TOKEN_SECRET_KEY || '';

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY, (err: any, decoded: any) => {
        
        if (err) {
            return res.status(401).json({ status: 'failed', validation: 'failed', message: "access two token not valid..." });
        }
        
        (req as any).user = decoded;
        
        next();
    })
}

export const refreshTokenValidation = (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ status: 'failed', validation: 'failed', message: "refresh token not valid..." });

    const REFRESH_JWT_TOKEN_SECRET_KEY: string = process.env.REFRESH_JWT_TOKEN_SECRET_KEY || '';

    jwt.verify(refreshToken, REFRESH_JWT_TOKEN_SECRET_KEY, (err: any, decoded: any) => {
        
        if (err) return res.status(401).json({ status: 'failed', validation: 'failed', message: "refresh token not valid..." });
        
        (req as any).user = decoded;
        
        next();
    })
}