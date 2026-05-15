import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ListTodo } from 'lucide-react'
import { useTasks } from '@/hooks/useTasks'
import type { TaskFilters, TaskWithCategory } from '@/types'
import { Button } from '@/components/ui/button'
import { TaskCard } from '@/components/tasks/TaskCard'
import { TaskForm } from '@/components/tasks/TaskForm'
import { TaskFilterBar } from '@/components/tasks/TaskFilterBar'
import { EmptyState } from '@/components/tasks/EmptyState'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

/**
 * Full tasks management page
 * Includes filtering, sorting, search, and CRUD operations
 */
export default function Tasks() {
  const { 
    tasks, 
    categories, 
    loading, 
    filterTasks, 
    createTask, 
    updateTask, 
    deleteTask, 
    toggleComplete 
  } = useTasks()

  const [filters, setFilters] = useState<TaskFilters>({
    status: 'all',
    priority: 'all',
    category: 'all',
    search: '',
    sortBy: 'due_date',
    sortOrder: 'asc',
  })

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<TaskWithCategory | null>(null)

  const filteredTasks = filterTasks(filters)

  const handleCreateTask = async (taskData: any) => {
    try {
      await createTask(taskData)
      toast.success('Task created successfully!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to create task')
    }
  }

  const handleEditTask = async (taskData: any) => {
    if (!editingTask) return
    try {
      await updateTask(editingTask.id, taskData)
      toast.success('Task updated successfully!')
      setEditingTask(null)
    } catch (error: any) {
      toast.error(error.message || 'Failed to update task')
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id)
      toast.success('Task deleted')
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete task')
    }
  }

  const handleToggleComplete = async (id: string, status: string) => {
    try {
      await toggleComplete(id, status)
      const isCompleting = status !== 'completed'
      toast.success(isCompleting ? 'Task completed! 🎉' : 'Task marked as pending')
    } catch (error: any) {
      toast.error(error.message || 'Failed to update task')
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20" />
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ListTodo className="h-6 w-6" />
            Tasks
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage and organize all your tasks in one place.
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Filters */}
      <TaskFilterBar
        filters={filters}
        onFilterChange={setFilters}
        categories={categories}
      />

      {/* Results count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{filteredTasks.length} tasks found</span>
        <span>Sort by: {filters.sortBy.replace('_', ' ')}</span>
      </div>

      {/* Task List */}
      <AnimatePresence mode="popLayout">
        {filteredTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EmptyState 
              type={filters.search ? 'search' : 'tasks'}
              action={!filters.search ? { label: 'Create Task', onClick: () => setIsFormOpen(true) } : undefined}
            />
          </motion.div>
        ) : (
          <div className="space-y-2">
            {filteredTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onToggle={handleToggleComplete}
                onEdit={(t) => { setEditingTask(t); setIsFormOpen(true) }}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Task Form Dialog */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={() => { setIsFormOpen(false); setEditingTask(null) }}
        onSubmit={editingTask ? handleEditTask : handleCreateTask}
        task={editingTask}
        categories={categories}
      />
    </div>
  )
}