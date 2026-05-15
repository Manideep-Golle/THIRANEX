import { motion } from 'framer-motion'
import { Activity, CheckCircle2, Plus, Pencil, Trash2 } from 'lucide-react'
import type { TaskWithCategory } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'

interface RecentActivityProps {
  tasks: TaskWithCategory[]
}

/**
 * Recent activity feed showing latest task changes
 */
export function RecentActivity({ tasks }: RecentActivityProps) {
  // Get recent tasks (last 5)
  const recentTasks = tasks
    .filter(t => t.status === 'completed' && t.completed_at)
    .sort((a, b) => new Date(b.completed_at!).getTime() - new Date(a.completed_at!).getTime())
    .slice(0, 5)

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Activity className="h-4 w-4 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentTasks.length === 0 ? (
          <div className="text-center py-6 text-sm text-muted-foreground">
            Complete some tasks to see your activity here!
          </div>
        ) : (
          <div className="space-y-3">
            {recentTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    Completed "{task.title}"
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {task.completed_at && formatDistanceToNow(new Date(task.completed_at), { addSuffix: true })}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}