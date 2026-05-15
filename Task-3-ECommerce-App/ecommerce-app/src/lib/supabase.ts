import { createClient } from '@supabase/supabase-js'
import type { Product, CartItem, Order, OrderItem, User, WishlistItem } from '@/types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Auth helpers
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, role: 'customer' }
    }
  })
  if (error) throw error
  return data
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  return data
}

// Product helpers
export const getProducts = async (filters?: { category?: string; search?: string; featured?: boolean }) => {
  let query = supabase.from('products').select('*')

  if (filters?.category) {
    query = query.eq('category', filters.category)
  }
  if (filters?.featured) {
    query = query.eq('featured', true)
  }
  if (filters?.search) {
    query = query.ilike('name', `%${filters.search}%`)
  }

  const { data, error } = await query.order('created_at', { ascending: false })
  if (error) throw error
  return data as Product[]
}

export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data as Product
}

export const createProduct = async (product: Omit<Product, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('products').insert(product).select().single()
  if (error) throw error
  return data as Product
}

export const updateProduct = async (id: string, product: Partial<Product>) => {
  const { data, error } = await supabase.from('products').update(product).eq('id', id).select().single()
  if (error) throw error
  return data as Product
}

export const deleteProduct = async (id: string) => {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

// Cart helpers
export const getCartItems = async (userId: string) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*, product:products(*)')
    .eq('user_id', userId)
  if (error) throw error
  return data as CartItem[]
}

export const addToCart = async (userId: string, productId: string, quantity: number) => {
  const { data: existing } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single()

  if (existing) {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + quantity })
      .eq('id', existing.id)
      .select()
      .single()
    if (error) throw error
    return data
  } else {
    const { data, error } = await supabase
      .from('cart_items')
      .insert({ user_id: userId, product_id: productId, quantity })
      .select()
      .single()
    if (error) throw error
    return data
  }
}

export const updateCartItem = async (id: string, quantity: number) => {
  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export const removeFromCart = async (id: string) => {
  const { error } = await supabase.from('cart_items').delete().eq('id', id)
  if (error) throw error
}

// Order helpers
export const createOrder = async (userId: string, items: { product_id: string; quantity: number; price: number }[], total: number, shippingAddress: string) => {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({ user_id: userId, total, shipping_address: shippingAddress, status: 'pending' })
    .select()
    .single()

  if (orderError) throw orderError

  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price
  }))

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
  if (itemsError) throw itemsError

  // Clear cart
  await supabase.from('cart_items').delete().eq('user_id', userId)

  return order as Order
}

export const getOrders = async (userId?: string) => {
  let query = supabase.from('orders').select('*, items:order_items(*, product:products(*))')
  if (userId) {
    query = query.eq('user_id', userId)
  }
  const { data, error } = await query.order('created_at', { ascending: false })
  if (error) throw error
  return data as Order[]
}

export const updateOrderStatus = async (id: string, status: Order['status']) => {
  const { data, error } = await supabase.from('orders').update({ status }).eq('id', id).select().single()
  if (error) throw error
  return data as Order
}

// Wishlist helpers
export const getWishlist = async (userId: string) => {
  const { data, error } = await supabase
    .from('wishlist')
    .select('*, product:products(*)')
    .eq('user_id', userId)
  if (error) throw error
  return data as WishlistItem[]
}

export const addToWishlist = async (userId: string, productId: string) => {
  const { data, error } = await supabase
    .from('wishlist')
    .insert({ user_id: userId, product_id: productId })
    .select()
    .single()
  if (error) throw error
  return data
}

export const removeFromWishlist = async (id: string) => {
  const { error } = await supabase.from('wishlist').delete().eq('id', id)
  if (error) throw error
}

// Categories
export const getCategories = async () => {
  const { data, error } = await supabase.from('products').select('category').distinct()
  if (error) throw error
  return data.map((d: any) => d.category) as string[]
}
