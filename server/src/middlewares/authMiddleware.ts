import type { Request, Response, NextFunction } from 'express';
import  { supabase } from '../config/supabase.js'; // Updated to named import
import type { User } from '@supabase/supabase-js'; // Added strict typing

// Extend the standard Express Request to include the Supabase user
export interface AuthRequest extends Request {
  user?: User; // Replaced 'any' with strict Supabase User type
}

// Middleware to protect routes that require a logged-in admin
export const requireAuth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Unauthorized: No token provided' });
      return;
    }

    // Verify token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      res.status(401).json({ error: 'Unauthorized: Invalid token' });
      return;
    }

    // Attach user to the request object so the controller can use it
    req.user = user;
    next(); // Proceed to the controller
  } catch (err) {
    console.error("Middleware Error:", err);
    res.status(500).json({ error: 'Internal server error during authentication' });
  }
};