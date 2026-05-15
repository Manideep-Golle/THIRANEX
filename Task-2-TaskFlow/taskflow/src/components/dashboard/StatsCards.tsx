import { motion } from 'framer-motion'
import { CheckSquare, Clock, AlertTriangle, TrendingUp, ListTodo, CheckCircle2 } from 'lucide-react'
import type { DashboardStats } from '@/types'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

interface StatsCardsProps {
  stats: DashboardStats
  loading?: boolean
}

const statConfig = [
  {
    key: 'total' as const,
    label: 'Total Tasks',
    icon: ListTodo,
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
  {
    key: 'pending' as const,
    label: 'Pending',
    icon: Clock,
    color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    borderColor: 'border-amber-200 dark:border-amber-800',
  },
  {
    key: 'completed' as const,
    label: 'Completed',
    icon: CheckCircle2,
    color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
  },
  {
    key: 'overdue' as const,
    label: 'Overdue',
    icon: AlertTriangle,
    color: 'bg-red-500/10 text-red-600 dark:text-red-400',
    borderColor: 'border-red-200 dark:border-red-800',
  },
]

/**
 * Dashboard statistics cards with animations
 * Shows total, pending, completed, and overdue task counts
 */
export function StatsCards({ stats, loading }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statConfig.map((config, index) => {
        const Icon = config.icon
        const value = stats[config.key]

        return (
          <motion.div
            key={config.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={cn(
              "overflow-hidden border-l-4 hover-lift",
              config.borderColor
            )}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {config.label}
                    </p>
                    <motion.p
                      key={value}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-2xl font-bold mt-1"
                    >
                      {value}
                    </motion.p>
                  </div>
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl",
                    config.color
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}