import { AppError } from "../errors/AppError.js";
export const validateCreateUserInput = (req, res, next) => {
    const { name, email, newPassword, confirmPassword } = req.body;
    if (!email || !newPassword || !confirmPassword || !name)
        throw new AppError("Enter credentials.", 400);
    if (newPassword !== confirmPassword)
        throw new AppError("Password not matching.", 400);
    next();
};
//# sourceMappingURL=validateCreateUserInput.js.map