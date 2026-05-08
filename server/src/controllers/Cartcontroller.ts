import type { Request, Response } from 'express';
import * as cartModel from '../models/Cartmodel.js';
import logger from '../utils/logger.js';

export const addToCartHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId, quantity } = req.body;

        // We get the user ID from the JWT token processed by requireAuth
        // Using 'any' here temporarily to bypass strict TS checking on custom req properties
        const userId = (req as any).user?.sub || (req as any).user?.id;

        if (!userId) {
            res.status(401).json({ error: 'Unauthorized: User ID missing from token' });
            return;
        }

        if (!productId || !quantity) {
            res.status(400).json({ error: 'Product ID and quantity are required.' });
            return;
        }

        const cartItem = await cartModel.addToCart(userId, productId, quantity);

        logger.info(`User ${userId} added product ${productId} to cart.`);
        res.status(200).json({ message: 'Item added to cart', cartItem });

    } catch (error: any) {
        logger.error(`Error adding to cart: ${error.message}`);
        res.status(500).json({ error: 'Internal server error while adding to cart.' });
    }
};

export const getCartHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user?.sub || (req as any).user?.id;

        if (!userId) {
            res.status(401).json({ error: 'Unauthorized: User ID missing from token' });
            return;
        }

        const cartItems = await cartModel.getCartItems(userId);
        res.status(200).json({ cartItems });

    } catch (error: any) {
        logger.error(`Error fetching cart: ${error.message}`);
        res.status(500).json({ error: 'Internal server error while fetching cart.' });
    }
};

// Handle Quantity Updates (Decrease/Increase)
export const updateQuantityHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // FIX: This must be req.body, NOT req.productId!
    const { productId, quantity } = req.body;
    
    const userId = (req as any).user?.sub || (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized: User ID missing from token' });
      return;
    }

    if (!productId || typeof quantity !== 'number') {
      res.status(400).json({ error: 'Product ID and a valid quantity are required.' });
      return;
    }

    const updatedItem = await cartModel.updateCartItemQuantity(userId, productId, quantity);
    logger.info(`User ${userId} updated cart product ${productId} to quantity ${quantity}.`);
    res.status(200).json({ message: 'Cart updated', item: updatedItem });

  } catch (error: any) {
    logger.error(`Error updating cart: ${error.message}`);
    res.status(500).json({ error: 'Internal server error while updating cart.' });
  }
};

// Handle Complete Removal
export const removeCartItemHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params; // Get ID from URL parameter (e.g., /remove/123)
    const userId = (req as any).user?.sub || (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!productId) {
      res.status(400).json({ error: 'Product ID is required in URL.' });
      return;
    }

    await cartModel.removeFromCart(userId, productId as string);
    logger.info(`User ${userId} removed product ${productId} from cart.`);
    res.status(200).json({ message: 'Item successfully removed from cart.' });

  } catch (error: any) {
    logger.error(`Error removing from cart: ${error.message}`);
    res.status(500).json({ error: 'Internal server error while removing item from cart.' });
  }
};