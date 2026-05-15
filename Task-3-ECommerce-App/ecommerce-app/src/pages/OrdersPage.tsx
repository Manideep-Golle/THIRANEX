import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Package, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { EmptyState } from '@/components/layout/EmptyState'
import { OrderStatusBadge } from '@/components/admin/OrderStatusBadge'
import { useAuthStore } from '@/stores/authStore'
import { getOrders } from '@/lib/supabase'
import { formatPrice, formatDate } from '@/lib/utils'
import type { Order } from '@/types'
import toast from 'react-hot-toast'

export function OrdersPage() {
  const [searchParams] = useSearchParams()
  const { user } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const success = searchParams.get('success')

  useEffect(() => {
    if (success) {
      toast.success('Order placed successfully!')
    }
    if (user) loadOrders()
  }, [user])

  const loadOrders = async () => {
    setIsLoading(true)
    try {
      const data = await getOrders(user!.id)
      setOrders(data)
    } catch {
      toast.error('Failed to load orders')
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EmptyState
            type="orders"
            title="Sign in to view your orders"
            description="Please sign in to see your order history."
          />
        </div>
      </div>
    )
  }

  if (!isLoading && orders.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EmptyState type="orders" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground mb-8">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'} placed
        </p>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Order #{order.id.slice(0, 8)}</CardTitle>
                      <p className="text-xs text-muted-foreground">{formatDate(order.created_at)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <OrderStatusBadge status={order.status} />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    >
                      {expandedOrder === order.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expandedOrder === order.id && (
                <CardContent className="pt-0">
                  <Separator className="mb-4" />

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Items</h4>
                      {order.items?.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 py-2">
                          <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted">
                            <img
                              src={item.product?.image_url}
                              alt={item.product?.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.product?.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity} × {formatPrice(item.price)}
                            </p>
                          </div>
                          <span className="text-sm font-semibold">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Shipping Address</p>
                        <p className="text-sm">{order.shipping_address}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-lg font-bold">{formatPrice(order.total)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}

              {expandedOrder !== order.id && (
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      {order.items?.length} {order.items?.length === 1 ? 'item' : 'items'}
                    </p>
                    <span className="font-semibold">{formatPrice(order.total)}</span>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
