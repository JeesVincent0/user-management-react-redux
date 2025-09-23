import express, { type Request, type Response } from 'express';
import authController from '../../controllers/userControllers/authController.js';

const router = express.Router();

router.route('/signup')
    .post(authController.createUser)

export default router;