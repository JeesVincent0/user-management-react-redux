import type { Response, Request, NextFunction } from "express"

export const validateLoginUserInputs = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Enter credentials.", status: 'failed' });
    next();
}