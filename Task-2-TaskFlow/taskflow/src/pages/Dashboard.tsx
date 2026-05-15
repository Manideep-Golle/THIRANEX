import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, LayoutDashboard } from 'lucide-react'
import { useTasks } from '@/hooks/useTasks'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { ProgressWidget } from '@/components/dashboard/ProgressWidget'
import { TodayTasks } from '@/components/dashboard/TodayTasks'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { TaskCard } from '@/components/tasks/TaskCard'
import { TaskForm } from '@/components/tasks/TaskForm'
import { EmptyState } from '@/components/tasks/EmptyState'
import { toast } from 'sonner'

/**
 * Main dashboard page
 * Shows statistics, today's tasks, recent activity, and quick task management
 */
export default function Dashboard() {
  const { 
    tasks, 
    categories, 
    loading, 
    getStats, 
    getTodayTasks, 
    createTask, 
    updateTask, 
    deleteTask, 
    toggleComplete 
  } = useTasks()

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const stats = getStats()
  const todayTasks = getTodayTasks()
  const recentTasks = tasks.slice(0, 5)

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
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Welcome back! Here's what's happening with your tasks.
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Widgets Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ProgressWidget stats={stats} />
        <TodayTasks tasks={todayTasks} />
        <RecentActivity tasks={tasks} />
      </div>

      {/* Recent Tasks */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Tasks</h2>
        {recentTasks.length === 0 ? (
          <EmptyState 
            type="tasks" 
            action={{ label: 'Create Task', onClick: () => setIsFormOpen(true) }}
          />
        ) : (
          <div className="space-y-2">
            {recentTasks.map((task, index) => (
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
      </div>

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