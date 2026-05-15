import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/layout/EmptyState'
import { StarRating } from '@/components/products/StarRating'
import { useAuthStore } from '@/stores/authStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import { useCartStore } from '@/stores/cartStore'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

export function WishlistPage() {
  const { user } = useAuthStore()
  const { items, loadItems, removeItem } = useWishlistStore()
  const { addItem } = useCartStore()

  useEffect(() => {
    if (user) loadItems(user.id)
  }, [user])

  const handleRemove = async (id: string) => {
    try {
      await removeItem(id)
      toast.success('Removed from wishlist')
    } catch {
      toast.error('Failed to remove')
    }
  }

  const handleAddToCart = async (productId: string) => {
    if (!user) return
    try {
      await addItem(user.id, productId, 1)
      toast.success('Added to cart!')
    } catch {
      toast.error('Failed to add to cart')
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EmptyState
            type="wishlist"
            title="Sign in to view your wishlist"
            description="Please sign in to manage your wishlist."
          />
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EmptyState type="wishlist" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">{items.length} saved items</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => {
            const product = item.product!
            const discount = product.original_price
              ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
              : 0

            return (
              <div key={item.id} className="group">
                <Link to={`/products/${product.id}`} className="block">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-muted mb-4">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {discount > 0 && (
                      <Badge variant="destructive" className="absolute top-3 left-3">
                        -{discount}%
                      </Badge>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleRemove(item.id)
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm text-red-500 hover:scale-110 transition-transform"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </Link>

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1">
                    <StarRating rating={product.rating} />
                    <span className="text-xs text-muted-foreground">({product.review_count})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{formatPrice(product.price)}</span>
                      {product.original_price && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.original_price)}
                        </span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddToCart(product.id)}
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
