import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { user } = useAuthStore()
  const { addItem } = useCartStore()
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore()

  const isWishlisted = wishlistItems.some(item => item.product_id === product.id)
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      toast.error('Please sign in to add items to cart')
      return
    }
    try {
      await addItem(user.id, product.id, 1)
      toast.success('Added to cart!')
    } catch {
      toast.error('Failed to add to cart')
    }
  }

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      toast.error('Please sign in to add to wishlist')
      return
    }
    try {
      if (isWishlisted) {
        const item = wishlistItems.find(w => w.product_id === product.id)
        if (item) await removeFromWishlist(item.id)
        toast.success('Removed from wishlist')
      } else {
        await addToWishlist(user.id, product.id)
        toast.success('Added to wishlist!')
      }
    } catch {
      toast.error('Failed to update wishlist')
    }
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-muted mb-4">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={product.image_url}
          alt={product.name}
          className={`h-full w-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <Badge variant="destructive" className="font-semibold">
              -{discount}%
            </Badge>
          )}
          {product.featured && (
            <Badge variant="secondary" className="font-semibold">
              Featured
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-200 hover:scale-110 ${
            isWishlisted ? 'text-red-500' : 'text-neutral-600'
          }`}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <Button
            onClick={handleAddToCart}
            className="w-full bg-white/90 backdrop-blur-sm text-foreground hover:bg-white shadow-lg"
            size="sm"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
        <h3 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.review_count})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{formatPrice(product.price)}</span>
          {product.original_price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
