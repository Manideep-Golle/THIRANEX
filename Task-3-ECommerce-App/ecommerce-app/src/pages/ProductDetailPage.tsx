import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag, ArrowLeft, Star, Truck, Shield, RotateCcw, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ProductGrid } from '@/components/products/ProductGrid'
import { StarRating } from '@/components/products/StarRating'
import { ProductDetailSkeleton } from '@/components/layout/LoadingSkeleton'
import { getProductById, getProducts } from '@/lib/supabase'
import { useAuthStore } from '@/stores/authStore'
import { useCartStore } from '@/stores/cartStore'
import { useWishlistStore } from '@/stores/wishlistStore'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { user } = useAuthStore()
  const { addItem } = useCartStore()
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore()

  const isWishlisted = wishlistItems.some(item => item.product_id === id)

  useEffect(() => {
    if (id) loadProduct()
  }, [id])

  const loadProduct = async () => {
    setIsLoading(true)
    try {
      const data = await getProductById(id!)
      setProduct(data)

      // Load related products
      const related = await getProducts({ category: data.category })
      setRelatedProducts(related.filter(p => p.id !== id).slice(0, 4))
    } catch {
      toast.error('Product not found')
      navigate('/products')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please sign in to add to cart')
      return
    }
    try {
      await addItem(user.id, id!, quantity)
      toast.success(`Added ${quantity} item(s) to cart!`)
    } catch {
      toast.error('Failed to add to cart')
    }
  }

  const handleWishlist = async () => {
    if (!user) {
      toast.error('Please sign in to add to wishlist')
      return
    }
    try {
      if (isWishlisted) {
        const item = wishlistItems.find(w => w.product_id === id)
        if (item) await removeFromWishlist(item.id)
        toast.success('Removed from wishlist')
      } else {
        await addToWishlist(user.id, id!)
        toast.success('Added to wishlist!')
      }
    } catch {
      toast.error('Failed to update wishlist')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductDetailSkeleton />
        </div>
      </div>
    )
  }

  if (!product) return null

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Button variant="ghost" className="mb-6 gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted mb-4">
              <img
                src={product.image_url}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              {discount > 0 && <Badge variant="destructive">-{discount}%</Badge>}
            </div>

            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={product.rating} size="md" />
              <span className="text-sm text-muted-foreground">({product.review_count} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.original_price && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.original_price)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                {product.stock} in stock
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`gap-2 ${isWishlisted ? 'text-red-500 border-red-200' : ''}`}
                onClick={handleWishlist}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                {isWishlisted ? 'Saved' : 'Save'}
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-muted/50">
              <div className="text-center">
                <Truck className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xs font-medium">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xs font-medium">2 Year Warranty</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xs font-medium">30-Day Returns</p>
              </div>
            </div>
          </motion.div>
        </div>

        <Separator className="my-12" />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  )
}
