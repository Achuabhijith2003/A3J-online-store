import type { Request, Response } from 'express';
import * as productModel from '../models/Productmodel.js';
import logger from '../utils/logger.js';

export const createProductHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      name, 
      description, 
      price, 
      retail_price, 
      max_selling_price, 
      stock, 
      status, 
      category, 
      tags 
    } = req.body;

    // files will be an object because of upload.fields()
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (!name || !price || !stock) {
      res.status(400).json({ error: 'Name, price, and stock are required fields.' });
      return;
    }

    let main_image_url = '';
    let sub_images_urls: string[] = [];

    // Process Main Image
    if (files?.['main_image']?.[0]) {
      const file = files['main_image'][0];
      main_image_url = await productModel.uploadProductImage(file.buffer, file.originalname, file.mimetype);
      logger.info(`Main image uploaded successfully: ${main_image_url}`);
    }

    // Process Sub Images
    if (files?.['sub_images']?.length) {
      const uploadPromises = files['sub_images'].map(file => 
        productModel.uploadProductImage(file.buffer, file.originalname, file.mimetype)
      );
      sub_images_urls = await Promise.all(uploadPromises);
      logger.info(`Uploaded ${sub_images_urls.length} sub images.`);
    }

    // Parse tags (incoming as a JSON string from frontend FormData)
    let parsedTags: string[] = [];
    if (tags) {
      try {
        parsedTags = JSON.parse(tags);
      } catch (e) {
        parsedTags = [];
      }
    }

    const newProduct = await productModel.createProduct({
      name,
      description,
      price: parseFloat(price),
      retail_price: retail_price ? parseFloat(retail_price) : undefined,
      max_selling_price: max_selling_price ? parseFloat(max_selling_price) : undefined,
      stock: parseInt(stock, 10),
      status: status || 'Draft',
      category: category,
      tags: parsedTags,
      main_image_url,
      sub_images_urls
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

// Handle fetching all products
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
    res.status(500).json({ error: 'Internal server error' });
  } 
}