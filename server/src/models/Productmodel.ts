import { supabase } from '../config/supabase.js';

export interface ProductData {
  name: string;
  description?: string;
  price: number;
  retail_price?: number;
  max_selling_price?: number;
  stock: number;
  status: string;
  category?: string;
  tags?: string[];
  main_image_url?: string;
  sub_images_urls?: string[];
}

// 1. Upload the image to Supabase Storage
export const uploadProductImage = async (fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> => {
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
    .select() 
    .single();

  if (error) {
    throw new Error(`Database Error: ${error.message}`);
  }

  return data;
};

// 3. Fetch all products from the database
export const getAllProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false }); 

  if (error) {
    throw new Error(`Database Error: ${error.message}`);
  }

  return data;
};

// 4. Fetch single products
export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(`Database Error: ${error.message}`);
  }

  return data;
};