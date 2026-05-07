import type { Response, NextFunction } from 'express';
import { supabase } from '../config/supabase.js';
import type { AuthRequest } from './authMiddleware.js';

// ---------------------------------------------------------
// 1. BROAD ROLE CHECK (e.g., 'superadmin', 'manager')
// ---------------------------------------------------------
export const requireRole = (allowedRoles: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user;
      
      if (!user) {
        res.status(401).json({ error: 'Unauthorized: User not found in request' });
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (error || !profile) {
        res.status(403).json({ error: 'Forbidden: User profile or role not found' });
        return;
      }

      if (!allowedRoles.includes(profile.role)) {
        res.status(403).json({ 
          error: `Forbidden: Requires one of [${allowedRoles.join(', ')}], but user has [${profile.role}]` 
        });
        return;
      }

      next();
    } catch (err) {
      console.error("Role Middleware Error:", err);
      res.status(500).json({ error: 'Internal server error while checking permissions' });
    }
  };
};

// ---------------------------------------------------------
// 2. GRANULAR PERMISSION CHECK (e.g., 'write:products')
// ---------------------------------------------------------
export const requirePermission = (requiredPermissions: string[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user;
      
      if (!user) {
        res.status(401).json({ error: 'Unauthorized: User not found' });
        return;
      }

      // Fetch BOTH role and the new permissions array
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role, permissions')
        .eq('user_id', user.id)
        .single();

      if (error || !profile) {
        res.status(403).json({ error: 'Forbidden: Profile not found' });
        return;
      }

      // OPTIONAL: Let 'superadmin' bypass all granular checks automatically
      if (profile.role === 'superadmin') {
        next();
        return;
      }

      const userPermissions: string[] = profile.permissions || [];

      // Check if the user has ALL the permissions required by this route
      const hasAllPermissions = requiredPermissions.every(perm => 
        userPermissions.includes(perm)
      );

      if (!hasAllPermissions) {
        res.status(403).json({ 
          error: `Forbidden: Missing specific required permissions.`,
          required: requiredPermissions,
          owned: userPermissions
        });
        return;
      }

      // If they have the exact custom permissions, allow them to proceed!
      next();
    } catch (err) {
      console.error("Permission Middleware Error:", err);
      res.status(500).json({ error: 'Internal server error while checking custom permissions' });
    }
  };
};