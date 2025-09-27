import { type Response, type Request, type NextFunction } from "express";
import jwt from "jsonwebtoken";

export const accessTokenValidation = (req: Request, res: Response, next: NextFunction) => {

    const accessToken = req.cookies.accessToken;

    if (!accessToken) return res.status(401).json({ status: 'failed', validation: false, message: "access token not valid..." });

    const ACCESS_TOKEN_SECRET_KEY: string = process.env.ACCESS_JWT_TOKEN_SECRET_KEY || '';

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY, (err: any, decoded: any) => {
        
        if (err) {
            return res.status(401).json({ status: 'failed', validation: false, message: "access token not valid..." });
        }
        
        (req as any).user = decoded;
        
        next();
    })
}

export const refreshTokenValidation = (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({ status: 'failed', validation: false, message: "access token not valid..." });

    const ACCESS_TOKEN_SECRET_KEY: string = process.env.ACCESS_JWT_TOKEN_SECRET_KEY || '';

    jwt.verify(refreshToken, ACCESS_TOKEN_SECRET_KEY, (err: any, decoded: any) => {
        
        if (err) return res.status(401).json({ status: 'failed', validation: false, message: "access token not valid..." });
        
        (req as any).user = decoded;
        
        next();
    })
}