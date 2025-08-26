import express from 'express';
import * as UserController from '../controller/user.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);

// 👨‍👩‍👧 Add Family Member (protected)
router.post('/family', authenticate, UserController.addFamilyMember);

export default router;
