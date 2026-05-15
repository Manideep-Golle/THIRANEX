import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/stores/cartStore'
import { useNavigate } from 'react-router-dom'

export function CartSummary() {
  const { items, getTotalPrice } = useCartStore()
  const navigate = useNavigate()

  const subtotal = getTotalPrice()
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (items.length === 0) return null

  return (
    <div className="rounded-xl border bg-card p-6 space-y-4 sticky top-24">
      <h3 className="font-semibold text-lg">Order Summary</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax (8%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>

      {subtotal < 100 && (
        <p className="text-xs text-muted-foreground">
          Add {formatPrice(100 - subtotal)} more for free shipping!
        </p>
      )}

      <Button
        className="w-full"
        size="lg"
        onClick={() => navigate('/checkout')}
      >
        Proceed to Checkout
      </Button>

      <Button
        variant="ghost"
        className="w-full"
        onClick={() => navigate('/products')}
      >
        Continue Shopping
      </Button>
    </div>
  )
}
