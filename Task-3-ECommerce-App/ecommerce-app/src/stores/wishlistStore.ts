import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WishlistItem } from '@/types'
import { getWishlist, addToWishlist, removeFromWishlist } from '@/lib/supabase'

interface WishlistState {
  items: WishlistItem[]
  isLoading: boolean
  addItem: (userId: string, productId: string) => Promise<void>
  removeItem: (id: string) => Promise<void>
  loadItems: (userId: string) => Promise<void>
  isInWishlist: (productId: string) => boolean
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      addItem: async (userId, productId) => {
        set({ isLoading: true })
        try {
          await addToWishlist(userId, productId)
          const items = await getWishlist(userId)
          set({ items, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
      removeItem: async (id) => {
        set({ isLoading: true })
        try {
          await removeFromWishlist(id)
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
          const items = await getWishlist(userId)
          set({ items, isLoading: false })
        } catch {
          set({ isLoading: false })
        }
      },
      isInWishlist: (productId) => {
        return get().items.some(item => item.product_id === productId)
      },
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)
