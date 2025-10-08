import bcrypt from 'bcrypt';
export const comparePassword = async (passowrd, hashedPassword) => {
    return bcrypt.compare(passowrd, hashedPassword);
};
//# sourceMappingURL=checkPassword.js.map