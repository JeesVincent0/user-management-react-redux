import { type Request, type Response } from "express"
import type { IAuthUser } from "../../interface/ICreateUser.js";
import { setAuthCookies } from "../../utility/setAuthCookie.js";

export class UserAuthController {

    constructor(private signupService: any) { };

    public createUser = async (req: Request, res: Response) => {
        try {

            const resData: IAuthUser = await this.signupService.createUser(req.body);

            if (!resData.valid && resData.statusCode) return res.status(resData.statusCode).json({ message: resData.message, status: 'failed' });

            if (resData.accessToken && resData.refreshToken) setAuthCookies(res, resData.accessToken, resData.refreshToken);

            res.json({ status: "success", message: "User created success fully.", user: resData.user });

        } catch (error: any) {
            console.log(error);
        }
    }


}