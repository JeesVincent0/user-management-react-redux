import { type Request, type Response } from "express"
import User from "../../model/userSchema.js";
import bcrypt from "bcrypt";
import jwtTokens from "../../utility/jwt.js";
import { type ObjectId } from "mongoose";
import type { PayLoad } from "../../utility/types.js";
import { hashToken } from "../../utility/hashToken.js";
import type { INewUserCredentials } from "../../interface/INewUserCredentials.js";
import { userAuthServices } from "../../services/userServices/userAuthServices.js";
import { userAuthRepositories } from "../../repositories/userRepositories/userAuthRepositories.js";

const authController = {

    // creating new user account and parsing JWT tokens to client;
    createUser: async (req: Request, res: Response) => {

        try {

            // validating user credentials
            const validator = new userAuthServices();
            const { valid, name, email, password, message }: INewUserCredentials = validator.validator(req.body);
            if (!valid) return res.send(401).json({ status: "failed", message });

            if (email && password && name) {

                // checking user existing or not
                const getUser = new userAuthRepositories();
                const user = await getUser.findUserByEmail(email);
                if (user) return res.status(400).json({ status: "failed", error: "Email already taken", user: null });

                const userRepositories = new userAuthRepositories();
                const newUser = await userRepositories.createNewUser(name, email, password);
                const payLoad: PayLoad = { id: (newUser._id as ObjectId).toString(), role: "user" };

                const accessToken = jwtTokens.generateAccessToken(payLoad);
                const refreshToken = jwtTokens.generateRefreshToken(payLoad);

                userRepositories.updateRefreshToken(refreshToken, email);

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
                })

                res.json({
                    status: "success", message: "User created success fully", user: {
                        name: newUser.name,
                        email: newUser.email,
                        isAdmin: newUser.isAdmin,
                    }
                })
            }

        } catch (error: any) {
            console.log(error.message);
        }

    },

    // Verify user login
    verifyLogin: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) return res.status(401).json({ status: "failed", message: "Enter credentials..." });

            const user = await User.findOne({ email });

            let checkPassword;

            if (user) {
                const hashPassword: string = user.hashPassword;
                checkPassword = await bcrypt.compare(password, hashPassword);
            } else {
                res.status(401).json({ status: "failed", message: "Enter valid credentials..." })
            }

            if (checkPassword && user) {

                const payLoad: PayLoad = { id: (user._id as ObjectId).toString(), role: "user" };

                const accessToken = jwtTokens.generateAccessToken(payLoad);
                const refreshToken = jwtTokens.generateRefreshToken(payLoad);

                await User.updateOne({ email }, { $push: { refreshTokens: { token: hashToken(refreshToken) } } })

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

                return res.json({
                    status: 'success',
                    message: "Successfully logged-in...",
                    user: {
                        name: user?.name,
                        email: user?.email,
                    }
                });

            }

            return res.status(401).json({ status: "failed", message: "Wrong password entered..." })

        } catch (error) {
            console.log(error);
        }
    }
}

export default authController;