import type { Request, Response } from "express";
import type { IAuthUser } from "../../interface/ICreateUser.js";
import { setAuthCookies } from "../../utility/setAuthCookie.js";

class UserLoginController {

    constructor(private loginService: any) { };

    public verifyUser = async (req: Request, res: Response) => {
        try {

            const resData: IAuthUser = await this.loginService.verifyLogin(req.body);

            if (!resData.valid && resData.statusCode) return res.status(resData.statusCode).json({ status: 'failed', message: resData.message })

            if (resData.accessToken && resData.refreshToken) setAuthCookies(res, resData.accessToken, resData.refreshToken);

            return res.json({ user: resData.user, status: 'success' });

        } catch (error: any) {
            console.log(error)
        }
    }
};

export default UserLoginController;