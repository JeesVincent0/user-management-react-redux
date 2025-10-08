export const clearAuthCookies = (res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/api/refresh-token",
    });
};
//# sourceMappingURL=ClearAuthCookies.js.map