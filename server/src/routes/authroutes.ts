import { Router } from 'express';
import { login, register, forgotPassword } from '../controllers/authcontroller.js';

const router = Router();


// POST /api/auth/register
// Public route for customers to create a new account
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/forgot-password
// Public route to trigger a password reset email
router.post('/forgot-password', forgotPassword);

export default router;