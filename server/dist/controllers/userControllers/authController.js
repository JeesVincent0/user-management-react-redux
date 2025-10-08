import {} from "express";
import User from "../../model/userSchema.js";
import bcrypt from "bcrypt";
import jwtTokens from "../../utility/jwt.js";
import {} from "mongoose";
import { hashToken } from "../../utility/hashToken.js";
import { UserAuthServices } from "../../services/userServices/userAuthService.js";
import { UserAuthRepositories } from "../../repositories/userRepositories/userAuthRepositories.js";
import { hashPassword } from "../../utility/hash.js";
const authController = {
    // Verify user login
    verifyLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                return res.status(401).json({ status: "failed", message: "Enter credentials..." });
            let user = await User.findOne({ email });
            let checkPassword;
            if (user) {
                const hashPassword = user.hashPassword;
                checkPassword = await bcrypt.compare(password, hashPassword);
            }
            else {
                res.status(401).json({ status: "failed", message: "Enter valid credentials..." });
            }
            if (checkPassword && user) {
                const payLoad = { id: user._id.toString(), role: "user" };
                const accessToken = jwtTokens.generateAccessToken(payLoad);
                const refreshToken = jwtTokens.generateRefreshToken(payLoad);
                await User.updateOne({ email }, { $push: { refreshTokens: { token: hashToken(refreshToken) } } });
                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    maxAge: 15 * 60 * 1000,
                    secure: false,
                    sameSite: 'lax',
                });
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    path: '/api/refresh-token',
                    sameSite: 'lax',
                    secure: false,
                });
                user = await User.findOne({ email }).select("-hashPassword -refreshTokens");
                return res.json({
                    status: 'success',
                    message: "Successfully logged-in...",
                    user
                });
            }
            return res.status(401).json({ status: "failed", message: "Wrong password entered..." });
        }
        catch (error) {
            console.log(error);
        }
    }
};
export class AuthController {
    userAuthService;
    constructor() {
        const userAtuthRepositories = new UserAuthRepositories(User);
        this.userAuthService = new UserAuthServices(userAtuthRepositories, jwtTokens, hashToken, hashPassword);
    }
    createUser = async (req, res) => {
        try {
            const resData = await this.userAuthService.createUser(req.body);
            if (!resData.valid && resData.statusCode)
                return res.status(resData.statusCode).json({ message: resData.message, status: 'failed' });
            res.cookie("accessToken", resData.accessToken, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000,
                secure: false,
                sameSite: 'lax',
            });
            res.cookie("refreshToken", resData.refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/api/refresh-token',
                sameSite: 'lax',
                secure: false,
            });
            res.json({
                status: "success", message: "User created success fully.", user: resData.user,
            });
        }
        catch (error) {
            console.log(error);
        }
    };
}
export default authController;
//# sourceMappingURL=authController.js.map