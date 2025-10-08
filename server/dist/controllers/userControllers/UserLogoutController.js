import { clearAuthCookies } from "../../utility/ClearAuthCookies.js";
export class UserLogoutController {
    logutUser = (req, res) => {
        try {
            clearAuthCookies(res);
            res.json({ status: "success", message: "Successfully logout." });
        }
        catch (error) {
            console.log(error);
        }
    };
}
//# sourceMappingURL=UserLogoutController.js.map