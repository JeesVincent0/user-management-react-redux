import {} from "express";
import User from "../../model/userSchema.js";
import bcrypt from 'bcrypt';
const adminAuthController = {
    verifyLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user || !user.isAdmin)
                return res.status(401).json({ status: "failed", message: "Wrong email entered..." });
            const hashPassword = user.hashPassword;
            const checkPassword = await bcrypt.compare(password, hashPassword);
            if (checkPassword)
                return res.json({ status: "success", user: { name: user.name, email } });
            return res.status(401).json({ status: "failed", message: "Wrong password entered..." });
        }
        catch (error) {
            console.log(error);
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const search = req.query.search || "";
            const user = await User.find({
                $and: [
                    {
                        $or: [
                            { name: { $regex: search, $options: "i" } },
                            { email: { $regex: search, $options: "i" } },
                        ],
                    },
                    { email: { $ne: "admin@gmail.com" } },
                ],
            });
            res.json({ status: "success", user });
        }
        catch (error) {
            console.log(error);
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id, name, email, housename, area, city, pin, phone } = req.body;
            const existingUser = await User.findOne({ email, _id: { $ne: id } });
            if (existingUser)
                return res.status(400).json({
                    status: "error",
                    message: "Email is already taken by another user",
                });
            const updatedUser = await User.findByIdAndUpdate(id, {
                name,
                email,
                address: {
                    houseName: housename,
                    area,
                    city,
                    pin,
                    phone,
                },
            }, { new: true });
            if (!updatedUser)
                return res.status(404).json({
                    status: "error",
                    message: "User not found",
                });
            return res.status(200).json({
                status: "success",
                message: "User updated successfully",
                user: updatedUser,
            });
        }
        catch (error) {
            console.log(error);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const id = req.body.id;
            await User.deleteOne({ _id: id });
            res.json({ status: 'success' });
        }
        catch (error) {
            console.log(error);
        }
    },
    logout: (req, res) => {
        try {
            return res.json({ status: "success", message: "Logged out successfully..." });
        }
        catch (error) {
            console.log(error);
        }
    }
};
export default adminAuthController;
//# sourceMappingURL=authController.js.map