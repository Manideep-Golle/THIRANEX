import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'
import { supabase, getCurrentUser } from '@/lib/supabase'

interface AuthState {
  user: User | null
  isLoading: boolean
  isAdmin: boolean
  setUser: (user: User | null) => void
  loadUser: () => Promise<void>
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      isAdmin: false,
      setUser: (user) => set({ user, isAdmin: user?.role === 'admin' }),
      loadUser: async () => {
        try {
          const user = await getCurrentUser()
          set({ user, isAdmin: user?.role === 'admin', isLoading: false })
        } catch {
          set({ user: null, isAdmin: false, isLoading: false })
        }
      },
      signOut: async () => {
        await supabase.auth.signOut()
        set({ user: null, isAdmin: false })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAdmin: state.isAdmin }),
    }
  )
)
