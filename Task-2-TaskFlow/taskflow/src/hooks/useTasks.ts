import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'
import type { Task, TaskWithCategory, Category, TaskFilters, DashboardStats } from '@/types'

/**
 * Custom hook for task CRUD operations
 * Handles real-time updates and optimistic UI
 */
export function useTasks() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<TaskWithCategory[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch tasks with categories
  const fetchTasks = useCallback(async () => {
    if (!user) return

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          category:categories(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setTasks(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [user])

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', user.id)
        .order('name')

      if (error) throw error
      setCategories(data || [])
    } catch (err: any) {
      console.error('Error fetching categories:', err)
    }
  }, [user])

  // Create new task
  const createTask = async (task: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'user_id' | 'completed_at'>) => {
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        ...task,
        user_id: user.id,
      })
      .select('*, category:categories(*)')
      .single()

    if (error) throw error
    setTasks(prev => [data, ...prev])
    return data
  }

  // Update task
  const updateTask = async (id: string, updates: Partial<Task>) => {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select('*, category:categories(*)')
      .single()

    if (error) throw error
    setTasks(prev => prev.map(t => t.id === id ? data : t))
    return data
  }

  // Delete task
  const deleteTask = async (id: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)

    if (error) throw error
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  // Toggle task completion
  const toggleComplete = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed'
    const completedAt = newStatus === 'completed' ? new Date().toISOString() : null

    return updateTask(id, { 
      status: newStatus, 
      completed_at: completedAt 
    })
  }

  // Create category
  const createCategory = async (name: string, color: string) => {
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('categories')
      .insert({
        name,
        color,
        user_id: user.id,
      })
      .select()
      .single()

    if (error) throw error
    setCategories(prev => [...prev, data])
    return data
  }

  // Filter tasks based on criteria
  const filterTasks = useCallback((filters: TaskFilters): TaskWithCategory[] => {
    return tasks.filter(task => {
      // Status filter
      if (filters.status !== 'all' && task.status !== filters.status) return false

      // Priority filter
      if (filters.priority !== 'all' && task.priority !== filters.priority) return false

      // Category filter
      if (filters.category !== 'all' && task.category_id !== filters.category) return false

      // Search filter
      if (filters.search) {
        const search = filters.search.toLowerCase()
        const matchesTitle = task.title.toLowerCase().includes(search)
        const matchesDesc = task.description?.toLowerCase().includes(search)
        if (!matchesTitle && !matchesDesc) return false
      }

      return true
    }).sort((a, b) => {
      // Sort logic
      const sortField = filters.sortBy
      const order = filters.sortOrder === 'asc' ? 1 : -1

      if (sortField === 'due_date') {
        if (!a.due_date && !b.due_date) return 0
        if (!a.due_date) return 1
        if (!b.due_date) return -1
        return (new Date(a.due_date).getTime() - new Date(b.due_date).getTime()) * order
      }

      if (sortField === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return (priorityOrder[a.priority] - priorityOrder[b.priority]) * order
      }

      return (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) * order
    })
  }, [tasks])

  // Calculate dashboard statistics
  const getStats = useCallback((): DashboardStats => {
    const total = tasks.length
    const completed = tasks.filter(t => t.status === 'completed').length
    const pending = total - completed
    const overdue = tasks.filter(t => {
      if (t.status === 'completed' || !t.due_date) return false
      return new Date(t.due_date) < new Date()
    }).length

    return {
      total,
      completed,
      pending,
      overdue,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    }
  }, [tasks])

  // Get today's tasks
  const getTodayTasks = useCallback(() => {
    const today = new Date().toISOString().split('T')[0]
    return tasks.filter(t => {
      if (t.status === 'completed') return false
      if (!t.due_date) return false
      return t.due_date.startsWith(today)
    })
  }, [tasks])

  // Real-time subscription
  useEffect(() => {
    if (!user) return

    fetchTasks()
    fetchCategories()

    // Subscribe to real-time changes
    const channel = supabase
      .channel('tasks_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks', filter: `user_id=eq.${user.id}` },
        () => {
          fetchTasks()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user, fetchTasks, fetchCategories])

  return {
    tasks,
    categories,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
    createCategory,
    filterTasks,
    getStats,
    getTodayTasks,
    refresh: fetchTasks,
  }
}