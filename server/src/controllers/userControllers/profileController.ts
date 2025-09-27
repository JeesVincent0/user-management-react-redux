import type { Response, Request } from "express";
import User from "../../model/userSchema.js";

export const profileController = {
    getUserData: async (req: Request, res: Response) => {
        try {
            const payload = req.user;
            const user = await User.findOne({ _id: payload.id })
            res.json({
                status: "success", user: {
                    name: user?.name,
                    email: user?.email,
                }
            })
        } catch (error) {
            console.log(error);
        }
    },
    logout: (req: Request, res: Response) => {
        try {
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

            res.json({ status: "success", message: "Logged out successfully..." });

        } catch (error) {

        }
    }

}