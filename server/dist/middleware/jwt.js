import {} from "express";
import jwt from "jsonwebtoken";
export const accessTokenValidation = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken)
        return res.status(401).json({ status: 'failed', validation: 'failed', message: "access one token not valid..." });
    const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_JWT_TOKEN_SECRET_KEY || '';
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: 'failed', validation: 'failed', message: "access two token not valid..." });
        }
        req.user = decoded;
        next();
    });
};
export const refreshTokenValidation = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.status(401).json({ status: 'failed', validation: 'failed', message: "refresh token not valid..." });
    const REFRESH_JWT_TOKEN_SECRET_KEY = process.env.REFRESH_JWT_TOKEN_SECRET_KEY || '';
    jwt.verify(refreshToken, REFRESH_JWT_TOKEN_SECRET_KEY, (err, decoded) => {
        if (err)
            return res.status(401).json({ status: 'failed', validation: 'failed', message: "refresh token not valid..." });
        req.user = decoded;
        next();
    });
};
//# sourceMappingURL=jwt.js.map