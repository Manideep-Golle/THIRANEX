import { motion } from 'framer-motion'
import { CheckSquare, Search, Inbox } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  type?: 'tasks' | 'search' | 'completed'
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

/**
 * Empty state illustration with contextual messaging
 * Adapts based on the empty state type
 */
export function EmptyState({ 
  type = 'tasks', 
  title, 
  description, 
  action,
  className 
}: EmptyStateProps) {
  const configs = {
    tasks: {
      icon: CheckSquare,
      defaultTitle: 'No tasks yet',
      defaultDescription: "Get started by creating your first task. Stay organized and productive!",
    },
    search: {
      icon: Search,
      defaultTitle: 'No results found',
      defaultDescription: "Try adjusting your search or filters to find what you are looking for.",
    },
    completed: {
      icon: Inbox,
      defaultTitle: 'No completed tasks',
      defaultDescription: "Complete some tasks to see them here. You are doing great!",
    },
  }

  const config = configs[type]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
        <Icon className="h-8 w-8 text-primary/60" />
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2">
        {title || config.defaultTitle}
      </h3>

      <p className="text-sm text-muted-foreground max-w-sm mb-6">
        {description || config.defaultDescription}
      </p>

      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </motion.div>
  )
}