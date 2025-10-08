import express from 'express';
import User from '../../model/userSchema.js';
import jwtTokens from '../../utility/jwt.js';
import { upload } from '../../middleware/multer.js';
import { hashPassword } from '../../utility/hash.js';
import { hashToken } from '../../utility/hashToken.js';
import { comparePassword } from '../../utility/checkPassword.js';
import { UserLoginService } from '../../services/userServices/UserLoginService.js';
import { validateLoginUserInputs } from '../../middleware/validateLogiUserInputs.js';
import { validateCreateUserInput } from '../../middleware/validateCreateUserInput.js';
import { accessTokenValidation, refreshTokenValidation } from '../../middleware/jwt.js';
import UserLoginController from '../../controllers/userControllers/UserLoginController.js';
import { profileController } from '../../controllers/userControllers/profileController.js';
import { UserAuthController } from '../../controllers/userControllers/UserAuthController.js';
import { UserLogoutController } from '../../controllers/userControllers/UserLogoutController.js';
import { ProfileUpdateController } from '../../controllers/userControllers/ProfileUpdateController.js';
import { UserAuthServices } from '../../services/userServices/UserAuthService.js';
import { UserAuthRepositories } from '../../repositories/userRepositories/UserAuthRepositories.js';
import { ProfileUpdateService } from '../../services/userServices/ProfuleUpdateService.js';

const router = express.Router();

// create repository instance.
const userRepo = new UserAuthRepositories(User);

// create service instance.
const signupService = new UserAuthServices(userRepo, jwtTokens, hashToken, hashPassword);
const loginService = new UserLoginService(userRepo, jwtTokens, comparePassword, hashToken);
const profileUpdateService = new ProfileUpdateService(userRepo)

// create controller instance.
const authcontroller = new UserAuthController(signupService);
const loginController = new UserLoginController(loginService);
const logoutController = new UserLogoutController();
const prfileUpdateController = new ProfileUpdateController(profileUpdateService);

// user loguot.
router.post('/logout', logoutController.logutUser);

// create new user.
router.post('/signup', validateCreateUserInput, authcontroller.createUser);

// verify user login.
router.post('/login', validateLoginUserInputs, loginController.verifyUser);

// generate new access token.
router.post("/refresh", refreshTokenValidation, profileController.sendAccessToke);

// parse user data.
router.get("/get-user-data", accessTokenValidation, profileController.getUserData);

// update user details.
router.put("/udate-profile", accessTokenValidation, upload.single("image"), prfileUpdateController.profileUpdate);

export default router;