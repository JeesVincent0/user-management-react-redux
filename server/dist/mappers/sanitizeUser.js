export const sanitizeUser = (user) => {
    const userObject = user.toObject();
    delete userObject.hashPassword;
    delete userObject.refreshTokens;
    return userObject;
};
//# sourceMappingURL=sanitizeUser.js.map