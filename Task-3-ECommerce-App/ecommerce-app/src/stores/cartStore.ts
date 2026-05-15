import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types'
import { addToCart, updateCartItem, removeFromCart, getCartItems } from '@/lib/supabase'

interface CartState {
  items: CartItem[]
  isLoading: boolean
  addItem: (userId: string, productId: string, quantity: number) => Promise<void>
  updateItem: (id: string, quantity: number) => Promise<void>
  removeItem: (id: string) => Promise<void>
  loadItems: (userId: string) => Promise<void>
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      addItem: async (userId, productId, quantity) => {
        set({ isLoading: true })
        try {
          await addToCart(userId, productId, quantity)
          const items = await getCartItems(userId)
          set({ items, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
      updateItem: async (id, quantity) => {
        if (quantity <= 0) {
          await get().removeItem(id)
          return
        }
        set({ isLoading: true })
        try {
          await updateCartItem(id, quantity)
          const items = get().items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
          set({ items, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
      removeItem: async (id) => {
        set({ isLoading: true })
        try {
          await removeFromCart(id)
          const items = get().items.filter(item => item.id !== id)
          set({ items, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
      loadItems: async (userId) => {
        set({ isLoading: true })
        try {
          const items = await getCartItems(userId)
          set({ items, isLoading: false })
        } catch {
          set({ isLoading: false })
        }
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0),
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
