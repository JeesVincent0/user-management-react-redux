import User from "../../model/userSchema.js";
import jwtTokens from "../../utility/jwt.js";
export const profileController = {
    getUserData: async (req, res) => {
        try {
            const payload = req.user;
            const user = await User.findOne({ _id: payload.id }).select("-hashPassword -refreshTokens");
            return res.json({
                status: "success", user
            });
        }
        catch (error) {
            console.log(error);
        }
    },
    // Update profile
    updateProfile: async (req, res) => {
        try {
            const { name, email, houseName, area, city, pin, phone } = req.body;
            if (email) {
                const existingUser = await User.findOne({ email, _id: { $ne: req.user.id } });
                if (existingUser) {
                    return res.status(400).json({
                        status: "failed",
                        message: "Email is already taken by another user",
                    });
                }
            }
            const updateData = {
                name,
                email,
                address: {
                    houseName,
                    area,
                    city,
                    pin,
                    phone: Number(phone),
                },
            };
            if (req.file) {
                updateData.image = `/uploads/profileImages/${req.file.filename}`;
            }
            const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });
            if (!user) {
                return res.status(404).json({ status: "failed", message: "User not found" });
            }
            return res.json({
                status: "success",
                message: "Profile updated successfully",
                user,
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Server error" });
        }
    },
    sendAccessToke: (req, res) => {
        try {
            const payLoad = { id: req.user.id, role: "user" };
            const accessToken = jwtTokens.generateAccessToken(payLoad);
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                maxAge: 60 * 1000,
                secure: false,
                sameSite: 'lax',
            });
            return res.json({ message: 'Access token send successfully' });
        }
        catch (error) {
            console.log(error);
        }
    }
};
//# sourceMappingURL=profileController.js.map