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