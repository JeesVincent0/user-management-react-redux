import { setAuthCookies } from "../../utility/setAuthCookie.js";
class UserLoginController {
    loginService;
    constructor(loginService) {
        this.loginService = loginService;
    }
    ;
    verifyUser = async (req, res) => {
        try {
            const resData = await this.loginService.verifyLogin(req.body);
            if (!resData.valid && resData.statusCode)
                return res.status(resData.statusCode).json({ status: 'failed', message: resData.message });
            if (resData.accessToken && resData.refreshToken)
                setAuthCookies(res, resData.accessToken, resData.refreshToken);
            return res.json({ user: resData.user, status: 'success' });
        }
        catch (error) {
            console.log(error);
        }
    };
}
;
export default UserLoginController;
//# sourceMappingURL=UserLoginController.js.map