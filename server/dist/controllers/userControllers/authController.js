import {} from "express";
const authController = {
    createUser: (req, res) => {
        res.json({ status: "success", error: null, user: {
                name: "Jees Vincent",
                email: "test.jees@gmail.com",
            } });
    },
    logout: (req, res) => {
        res.json({ status: "success", error: null, user: null });
    }
};
export default authController;
//# sourceMappingURL=authController.js.map