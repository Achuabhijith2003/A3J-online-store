import { supabase } from '../config/supabase.js';

// 1. Add or Update an item in the cart
export const addToCart = async (userId: string, productId: string, quantity: number) => {
  const { data: existingItem } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .maybeSingle(); // FIX: maybeSingle() doesn't crash if 0 rows are found!

  if (existingItem) {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: existingItem.quantity + quantity })
      .eq('id', existingItem.id)
      .select()
      .single();

    if (error) throw new Error(`Database Error: ${error.message}`);
    return data;
  } else {
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
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      id,
      quantity,
      product_id,
      products (
        name,
        price,
        main_image_url
      )
    `)
    .eq('user_id', userId);

  if (error) throw new Error(`Database Error: ${error.message}`);
  return data;
};

// 3. Update exact quantity (decrease/increase)
export const updateCartItemQuantity = async (userId: string, productId: string, quantity: number) => {
  if (quantity <= 0) {
    return await removeFromCart(userId, productId);
  }

  // FIX: Removed .single() so it doesn't crash if the item isn't in the cart
  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('user_id', userId)
    .eq('product_id', productId)
    .select();

  if (error) throw new Error(`Database Error: ${error.message}`);
  
  if (!data || data.length === 0) {
    throw new Error(`Item not found in cart. Cannot update quantity.`);
  }

  return data[0];
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