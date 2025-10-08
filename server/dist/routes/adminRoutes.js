import express, {} from 'express';
import adminAuthController from '../controllers/adminControllers/authController.js';
const router = express.Router();
router.route("/admin-login")
    .post(adminAuthController.verifyLogin);
router.route("/get-admin-users")
    .get(adminAuthController.getAllUsers);
router.route("/logout-admin")
    .post(adminAuthController.logout);
router.route("/update-user-admin")
    .post(adminAuthController.updateUser);
router.route("/delete-user")
    .delete(adminAuthController.deleteUser);
export default router;
//# sourceMappingURL=adminRoutes.js.map