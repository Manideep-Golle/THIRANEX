import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useAuthStore } from '@/stores/authStore'
import { useThemeStore } from '@/stores/themeStore'
import { HomePage } from '@/pages/HomePage'
import { ProductsPage } from '@/pages/ProductsPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { CartPage } from '@/pages/CartPage'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { AuthPage } from '@/pages/AuthPage'
import { OrdersPage } from '@/pages/OrdersPage'
import { WishlistPage } from '@/pages/WishlistPage'
import { AdminPage } from '@/pages/AdminPage'

function App() {
  const { loadUser } = useAuthStore()
  const { theme, setTheme } = useThemeStore()

  useEffect(() => {
    loadUser()
    // Apply saved theme
    const savedTheme = localStorage.getItem('theme-storage')
    if (savedTheme) {
      const parsed = JSON.parse(savedTheme)
      if (parsed.state?.theme) {
        setTheme(parsed.state.theme)
      }
    }
  }, [])

  return (
    <BrowserRouter>
      <div className={`min-h-screen flex flex-col ${theme}`}>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'hsl(var(--card))',
              color: 'hsl(var(--card-foreground))',
              border: '1px solid hsl(var(--border))',
            },
          }}
        />
      </div>
    </BrowserRouter>
  )
}

export default App
