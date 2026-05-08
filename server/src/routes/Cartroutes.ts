import { Router } from 'express';
import { addToCartHandler, getCartHandler, removeCartItemHandler,updateQuantityHandler } from '../controllers/Cartcontroller.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = Router();

// GET /api/cart
// Requires login. Fetches the current user's cart.
router.get('/', requireAuth, getCartHandler);

// POST /api/cart/add
// Requires login. Adds an item or updates quantity.
router.post('/add', requireAuth, addToCartHandler);
router.put('/update', requireAuth, updateQuantityHandler);
router.delete('/remove/:productId', requireAuth, removeCartItemHandler);

export default router;