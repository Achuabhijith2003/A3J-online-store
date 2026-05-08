import type { Request, Response } from 'express';
import * as productModel from '../models/Productmodel.js';
import logger from '../utils/logger.js';

export const createProductHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, stock, status } = req.body;
    const file = req.file;

    if (!name || !price || !stock) {
      res.status(400).json({ error: 'Name, price, and stock are required fields.' });
      return;
    }

    let imageUrl = '';

    if (file) {
      imageUrl = await productModel.uploadProductImage(
        file.buffer, 
        file.originalname, 
        file.mimetype
      );
      logger.info(`Image uploaded successfully: ${imageUrl}`);
    }

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

// Handle fetching a single product
export const getSingleProductHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const product = await productModel.getProductById(productId as string);
    
    logger.info(`Fetched product ${productId} successfully.`);
    
    res.status(200).json({
      message: 'Product retrieved successfully',
      product: product
    });

  } catch (error: any) {
    logger.error(`Error fetching single product:`,error);
  } 
}
