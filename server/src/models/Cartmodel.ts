import { supabase } from '../config/supabase.js';

// 1. Add or Update an item in the cart
export const addToCart = async (userId: string, productId: string, quantity: number) => {
  // First, check if the user already has this product in their cart
  const { data: existingItem } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single();

  if (existingItem) {
    // If it exists, just update the quantity!
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: existingItem.quantity + quantity })
      .eq('id', existingItem.id)
      .select()
      .single();

    if (error) throw new Error(`Database Error: ${error.message}`);
    return data;
  } else {
    // If it doesn't exist, insert a brand new row
    const { data, error } = await supabase
      .from('cart_items')
      .insert([{ user_id: userId, product_id: productId, quantity }])
      .select()
      .single();

    if (error) throw new Error(`Database Error: ${error.message}`);
    return data;
  }
};

// 2. Get all cart items for a specific user
export const getCartItems = async (userId: string) => {
  // We use Supabase relationships to fetch the product details (name, price, image) at the same time!
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      id,
      quantity,
      product_id,
      products (
        name,
        price,
        image_url
      )
    `)
    .eq('user_id', userId);

  if (error) throw new Error(`Database Error: ${error.message}`);
  return data;
};


// 3. Update exact quantity (decrease/increase)
export const updateCartItemQuantity = async (userId: string, productId: string, quantity: number) => {
  // If the quantity drops to 0 or below, just delete the item from the cart automatically
  if (quantity <= 0) {
    return await removeFromCart(userId, productId);
  }

  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('user_id', userId)
    .eq('product_id', productId)
    .select()
    .single();

  if (error) throw new Error(`Database Error: ${error.message}`);
  return data;
};

// 4. Remove an item entirely
export const removeFromCart = async (userId: string, productId: string) => {
  const { data, error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId)
    .select();

  if (error) throw new Error(`Database Error: ${error.message}`);
  return data;
};