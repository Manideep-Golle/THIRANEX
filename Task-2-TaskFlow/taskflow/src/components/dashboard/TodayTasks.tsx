import { motion } from 'framer-motion'
import { CalendarDays, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { TaskWithCategory } from '@/types'
import { cn, formatDate } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface TodayTasksProps {
  tasks: TaskWithCategory[]
}

/**
 * Widget showing tasks due today
 * Displays priority and category for each task
 */
export function TodayTasks({ tasks }: TodayTasksProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <CalendarDays className="h-4 w-4 text-primary" />
          Today's Tasks
          <Badge variant="secondary" className="ml-auto">
            {tasks.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <div className="text-center py-6 text-sm text-muted-foreground">
            No tasks due today. Enjoy your day! ☀️
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <div className={cn(
                  "h-2 w-2 rounded-full shrink-0",
                  task.priority === 'high' && "bg-red-500",
                  task.priority === 'medium' && "bg-amber-500",
                  task.priority === 'low' && "bg-emerald-500",
                )} />
                <span className="text-sm flex-1 truncate">{task.title}</span>
                {task.category && (
                  <Badge 
                    variant="outline" 
                    className="text-xs shrink-0"
                    style={{ 
                      borderColor: task.category.color + '40',
                      color: task.category.color 
                    }}
                  >
                    {task.category.name}
                  </Badge>
                )}
              </motion.div>
            ))}
          </div>
        )}

        <Link 
          to="/tasks"
          className="flex items-center justify-center gap-1 mt-4 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          View all tasks
          <ArrowRight className="h-3 w-3" />
        </Link>
      </CardContent>
    </Card>
  )
}