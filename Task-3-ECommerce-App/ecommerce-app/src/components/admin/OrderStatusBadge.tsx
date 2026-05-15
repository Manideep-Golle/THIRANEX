import { Badge } from '@/components/ui/badge'
import type { Order } from '@/types'

const statusConfig: Record<Order['status'], { variant: 'default' | 'secondary' | 'success' | 'warning' | 'destructive'; label: string }> = {
  pending: { variant: 'warning', label: 'Pending' },
  processing: { variant: 'secondary', label: 'Processing' },
  shipped: { variant: 'default', label: 'Shipped' },
  delivered: { variant: 'success', label: 'Delivered' },
  cancelled: { variant: 'destructive', label: 'Cancelled' },
}

export function OrderStatusBadge({ status }: { status: Order['status'] }) {
  const config = statusConfig[status]
  return <Badge variant={config.variant}>{config.label}</Badge>
}
