import { Router } from 'express';
import multer from 'multer';
import { createProductHandler } from '../controllers/productcontroller.js';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { requirePermission } from '../middlewares/roleMiddleware.js';

const router = Router();

// Configure Multer to store files in memory temporarily before sending to Supabase
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// POST /api/products
// Requires: 1. Login, 2. 'write:products' permission, 3. parses the 'image' file
router.post(
  '/addproducts', 
  requireAuth, 
  requirePermission(['write:products']), 
  upload.single('image'), 
  createProductHandler
);

export default router;