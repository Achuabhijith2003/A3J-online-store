import { supabase } from '../config/supabase.js';

export interface ProductData {
  name: string;
  description?: string;
  price: number;
  stock: number;
  status: string;
  image_url?: string;
}

// 1. Upload the image to Supabase Storage
export const uploadProductImage = async (fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> => {
  // Generate a unique filename to prevent overwriting
  const uniqueFileName = `${Date.now()}-${fileName}`;

  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(uniqueFileName, fileBuffer, {
      contentType: mimeType,
      upsert: false
    });

  if (error) {
    throw new Error(`Storage Error: ${error.message}`);
  }

  // Get the public URL to save in the database
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(uniqueFileName);

  return publicUrl;
};

// 2. Insert the product data into the SQL database
export const createProduct = async (productData: ProductData) => {
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select() // Return the created row
    .single();

  if (error) {
    throw new Error(`Database Error: ${error.message}`);
  }

  return data;
};