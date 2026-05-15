import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, ShoppingBag, Users, DollarSign } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string
  change?: string
  icon: 'revenue' | 'orders' | 'users' | 'products'
}

const icons = {
  revenue: DollarSign,
  orders: ShoppingBag,
  users: Users,
  products: TrendingUp,
}

export function AdminStatsCard({ title, value, change, icon }: StatsCardProps) {
  const Icon = icons[icon]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground mt-1">{change}</p>
        )}
      </CardContent>
    </Card>
  )
}
