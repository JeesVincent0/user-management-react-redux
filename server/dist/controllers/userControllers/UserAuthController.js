import {} from "express";
import { setAuthCookies } from "../../utility/setAuthCookie.js";
export class UserAuthController {
    signupService;
    constructor(signupService) {
        this.signupService = signupService;
    }
    ;
    createUser = async (req, res) => {
        try {
            const resData = await this.signupService.createUser(req.body);
            if (!resData.valid && resData.statusCode)
                return res.status(resData.statusCode).json({ message: resData.message, status: 'failed' });
            if (resData.accessToken && resData.refreshToken)
                setAuthCookies(res, resData.accessToken, resData.refreshToken);
            res.json({ status: "success", message: "User created success fully.", user: resData.user });
        }
        catch (error) {
            console.log(error);
        }
    };
}
//# sourceMappingURL=UserAuthController.js.map