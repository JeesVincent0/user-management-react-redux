export const validateLoginUserInputs = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "Enter credentials.", status: 'failed' });
    next();
};
//# sourceMappingURL=validateLogiUserInputs.js.map