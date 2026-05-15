import { PackageOpen, ShoppingBag, Heart, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

interface EmptyStateProps {
  type: 'cart' | 'wishlist' | 'orders' | 'products'
  title?: string
  description?: string
}

const config = {
  cart: {
    icon: ShoppingBag,
    title: 'Your cart is empty',
    description: "Looks like you haven't added anything to your cart yet.",
    action: 'Start Shopping',
    path: '/products',
  },
  wishlist: {
    icon: Heart,
    title: 'Your wishlist is empty',
    description: 'Save items you love to your wishlist and find them easily.',
    action: 'Explore Products',
    path: '/products',
  },
  orders: {
    icon: PackageOpen,
    title: 'No orders yet',
    description: "You haven't placed any orders yet. Start shopping to see your orders here.",
    action: 'Shop Now',
    path: '/products',
  },
  products: {
    icon: SearchX,
    title: 'No products found',
    description: "We couldn't find any products matching your search.",
    action: 'View All Products',
    path: '/products',
  },
}

export function EmptyState({ type, title, description }: EmptyStateProps) {
  const navigate = useNavigate()
  const cfg = config[type]
  const Icon = cfg.icon

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <Icon className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title || cfg.title}</h3>
      <p className="text-muted-foreground max-w-sm mb-6">{description || cfg.description}</p>
      <Button onClick={() => navigate(cfg.path)}>{cfg.action}</Button>
    </div>
  )
}
