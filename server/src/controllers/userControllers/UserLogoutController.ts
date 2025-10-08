import type { Request, Response } from "express";
import { clearAuthCookies } from "../../utility/ClearAuthCookies.js";

export class UserLogoutController {

    public logutUser = (req: Request, res: Response) => {
        try {
            clearAuthCookies(res);
            res.json({ status: "success", message: "Successfully logout." })
        } catch (error: any) {
            console.log(error);
        }
    }
}