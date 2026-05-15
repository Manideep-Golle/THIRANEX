import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Check, 
  Calendar, 
  Tag, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Clock,
  AlertCircle
} from 'lucide-react'
import type { TaskWithCategory } from '@/types'
import { cn, formatDate, getPriorityColor, getPriorityIconColor } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface TaskCardProps {
  task: TaskWithCategory
  onToggle: (id: string, status: string) => void
  onEdit: (task: TaskWithCategory) => void
  onDelete: (id: string) => void
  index?: number
}

/**
 * Individual task card with animations and actions
 * Supports hover effects, priority badges, and quick actions
 */
export function TaskCard({ task, onToggle, onEdit, onDelete, index = 0 }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isCompleted = task.status === 'completed'
  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !isCompleted

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex items-start gap-3 rounded-xl border p-4 transition-all duration-300 hover:shadow-lg",
        isCompleted 
          ? "bg-muted/30 border-muted opacity-75" 
          : "bg-card border-border hover:border-primary/20",
        isOverdue && !isCompleted && "border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-900/10"
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(task.id, task.status)}
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-200",
          isCompleted
            ? "border-primary bg-primary text-primary-foreground"
            : "border-muted-foreground/30 hover:border-primary"
        )}
      >
        {isCompleted && <Check className="h-3.5 w-3.5" />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className={cn(
            "font-medium text-sm leading-tight transition-all duration-200",
            isCompleted && "line-through text-muted-foreground"
          )}>
            {task.title}
          </h3>

          {/* Actions dropdown */}
          <div className={cn(
            "flex items-center gap-1 transition-opacity duration-200",
            isHovered ? "opacity-100" : "opacity-0 lg:opacity-0"
          )}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onEdit(task)}
                    className="h-7 w-7"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" className="h-7 w-7">
                  <MoreHorizontal className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(task)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(task.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className={cn(
            "mt-1 text-xs text-muted-foreground line-clamp-2",
            isCompleted && "line-through opacity-60"
          )}>
            {task.description}
          </p>
        )}

        {/* Meta info */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {/* Priority badge */}
          <Badge variant={task.priority} className="text-xs capitalize">
            {task.priority}
          </Badge>

          {/* Category badge */}
          {task.category && (
            <Badge 
              variant="outline" 
              className="text-xs"
              style={{ 
                borderColor: task.category.color + '40',
                backgroundColor: task.category.color + '15',
                color: task.category.color 
              }}
            >
              <Tag className="mr-1 h-2.5 w-2.5" />
              {task.category.name}
            </Badge>
          )}

          {/* Due date */}
          {task.due_date && (
            <div className={cn(
              "flex items-center gap-1 text-xs",
              isOverdue && !isCompleted ? "text-red-500 font-medium" : "text-muted-foreground"
            )}>
              {isOverdue && !isCompleted ? (
                <AlertCircle className="h-3 w-3" />
              ) : (
                <Calendar className="h-3 w-3" />
              )}
              {formatDate(task.due_date)}
            </div>
          )}

          {/* Created time */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
            <Clock className="h-3 w-3" />
            {new Date(task.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>
    </motion.div>
  )
}