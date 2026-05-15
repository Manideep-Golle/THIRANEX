import { motion } from 'framer-motion'
import { TrendingUp, Target } from 'lucide-react'
import type { DashboardStats } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface ProgressWidgetProps {
  stats: DashboardStats
}

/**
 * Progress widget showing completion rate
 * Includes animated progress bar and motivational text
 */
export function ProgressWidget({ stats }: ProgressWidgetProps) {
  const { completionRate, total, completed } = stats

  const getMessage = () => {
    if (completionRate === 100) return "🎉 Amazing! All tasks completed!"
    if (completionRate >= 75) return "🔥 You're on fire! Almost there!"
    if (completionRate >= 50) return "💪 Great progress! Keep it up!"
    if (completionRate >= 25) return "👍 Good start! Keep pushing!"
    return "🚀 Let's get started! You've got this!"
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Target className="h-4 w-4 text-primary" />
          Progress Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Completion Rate</span>
          <span className="font-bold text-lg">{completionRate}%</span>
        </div>

        <Progress value={completionRate} className="h-3" />

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{completed} completed</span>
          <span>{total} total</span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-lg bg-primary/5 p-3 text-sm text-center font-medium text-primary"
        >
          {getMessage()}
        </motion.div>
      </CardContent>
    </Card>
  )
}