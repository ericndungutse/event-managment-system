import express from 'express';
import {
  getMe,
  signin,
  signup,
} from '../controller/auth.js';
import { isLoggedIn } from '../middleware/authentication.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/signin', signin);
router.get('/get-me', isLoggedIn, getMe);

export default router;
