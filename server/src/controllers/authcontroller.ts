import type { Request, Response } from 'express';
import * as authModel from '../models/authmodel.js';

// The controller handles the HTTP request and response
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // 1. Basic validation
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  try {
    // 2. Call the Model to authenticate
    const { data, error } = await authModel.loginUser(email, password);

    // 3. Handle errors (e.g., wrong password)
    if (error) {
      res.status(401).json({ error: error.message });
      return;
    }

    // 4. Send success response with session/token
    res.status(200).json({
      message: 'Login successful',
      user: data.user,
      session: data.session,
    });
  } catch (err) {
    console.error('Server Login Error:', err);
    res.status(500).json({ error: 'Internal server error during login.' });
  }
};

// / Handle new user registration as a customer
export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  try {
    // 1. Sign up the user via Supabase Auth
    const { data, error } = await authModel.registerUser(email, password);

    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }

    // 2. If signup is successful, create their customer profile
    if (data.user) {
      try {
        await authModel.createCustomerProfile(data.user.id);
      } catch (profileErr: any) {
        console.error('Error creating customer profile:', profileErr.message);
      }
    }

    res.status(201).json({
      message: 'User registered successfully as a customer',
      user: data.user,
      session: data.session,
    });
  } catch (err) {
    console.error('Server Registration Error:', err);
    res.status(500).json({ error: 'Internal server error during registration.' });
  }
};



export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: 'Email is required.' });
    return;
  }
  try {
    const { data, error } = await authModel.resetPasswordForEmail(email);
    if (error) {
      res.status(400).json({ error: error.message });
      return;
    }
    res.status(200).json({ message: 'Password reset email sent.' });
  } catch (err) {
    console.error('Server Forgot Password Error:', err);
    res.status(500).json({ error: 'Internal server error during password reset.' });
  }
};