// Task priority levels
export type Priority = 'low' | 'medium' | 'high'

// Task status
export type TaskStatus = 'pending' | 'completed'

// Category type
export interface Category {
  id: string
  name: string
  color: string
  user_id: string
  created_at: string
}

// Task type matching Supabase schema
export interface Task {
  id: string
  title: string
  description: string | null
  priority: Priority
  status: TaskStatus
  due_date: string | null
  category_id: string | null
  user_id: string
  created_at: string
  updated_at: string
  completed_at: string | null
}

// Extended task with category info
export interface TaskWithCategory extends Task {
  category: Category | null
}

// User profile type
export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

// Dashboard stats
export interface DashboardStats {
  total: number
  completed: number
  pending: number
  overdue: number
  completionRate: number
}

// Filter options
export interface TaskFilters {
  status: TaskStatus | 'all'
  priority: Priority | 'all'
  category: string | 'all'
  search: string
  sortBy: 'due_date' | 'priority' | 'created_at'
  sortOrder: 'asc' | 'desc'
}

// Auth state
export interface AuthState {
  user: Profile | null
  loading: boolean
  error: string | null
}