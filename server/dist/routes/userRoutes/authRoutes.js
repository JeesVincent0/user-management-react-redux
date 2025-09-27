import express, {} from 'express';
import authController from '../../controllers/userControllers/authController.js';
import { accessTokenValidation, refreshTokenValidation } from '../../middleware/jwt.js';
import { profileController } from '../../controllers/userControllers/profileController.js';
const router = express.Router();
router.route('/signup')
    .post(authController.createUser);
router.route('/login')
    .post(authController.verifyLogin);
router.route("/get-user-data")
    .get(accessTokenValidation, profileController.getUserData);
router.route("/refresh")
    .post(refreshTokenValidation, (req, res) => {
    console.log("The refresh token controller invoked...");
});
router.route('/logout')
    .get(profileController.logout);
export default router;
//# sourceMappingURL=authRoutes.js.map