export const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 60 * 1000,
        secure: false,
        sameSite: 'lax',
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        path: '/api/refresh',
        sameSite: 'lax',
        secure: false,
    });
};
//# sourceMappingURL=setAuthCookie.js.map