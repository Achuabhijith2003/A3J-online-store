import type { Request, Response } from 'express';
import * as productModel from '../models/Productmodel.js';
import logger from '../utils/logger.js';

export const createProductHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Extract text fields from the request body
    const { name, description, price, stock, status } = req.body;
    
    // 2. Extract the uploaded file (handled by Multer middleware)
    const file = (req as any).file;

    if (!name || !price || !stock) {
      res.status(400).json({ error: 'Name, price, and stock are required fields.' });
      return;
    }

    let imageUrl = '';

    // 3. If an image was uploaded, send it to Supabase Storage first
    if (file) {
      imageUrl = await productModel.uploadProductImage(
        file.buffer, 
        file.originalname, 
        file.mimetype
      );
      logger.info(`Image uploaded successfully: ${imageUrl}`);
    }

    // 4. Save everything to the Supabase SQL Database
    const newProduct = await productModel.createProduct({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      status: status || 'Draft',
      image_url: imageUrl,
    });

    logger.info(`Product created successfully: ${newProduct.id}`);
    
    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct
    });

  } catch (error: any) {
    logger.error(`Error creating product: ${error.message}`);
    res.status(500).json({ error: 'Internal server error while creating product.' });
  }
};


// Handle fetching all products (NEW)
export const getAllProductsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productModel.getAllProducts();
    
    logger.info(`Fetched ${products.length} products successfully.`);
    
    res.status(200).json({
      message: 'Products retrieved successfully',
      products: products
    });

  } catch (error: any) {
    logger.error(`Error fetching products: ${error.message}`);
    res.status(500).json({ error: 'Internal server error while fetching products.' });
  }
};