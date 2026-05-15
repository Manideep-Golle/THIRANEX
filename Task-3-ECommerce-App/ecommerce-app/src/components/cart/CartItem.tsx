import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { CartItem } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/stores/cartStore'
import toast from 'react-hot-toast'

interface CartItemProps {
  item: CartItem
}

export function CartItemRow({ item }: CartItemProps) {
  const { updateItem, removeItem } = useCartStore()
  const product = item.product!

  const handleUpdateQuantity = async (newQuantity: number) => {
    try {
      await updateItem(item.id, newQuantity)
    } catch {
      toast.error('Failed to update quantity')
    }
  }

  const handleRemove = async () => {
    try {
      await removeItem(item.id)
      toast.success('Removed from cart')
    } catch {
      toast.error('Failed to remove item')
    }
  }

  return (
    <div className="flex gap-4 py-4 border-b last:border-0">
      <div className="h-24 w-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
            <h4 className="font-medium text-sm mt-0.5 line-clamp-1">{product.name}</h4>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <span className="font-semibold">{formatPrice(product.price * item.quantity)}</span>
        </div>
      </div>
    </div>
  )
}
