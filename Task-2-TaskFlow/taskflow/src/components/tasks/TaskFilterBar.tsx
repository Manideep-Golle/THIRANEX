import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react'
import type { TaskFilters } from '@/types'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface TaskFilterBarProps {
  filters: TaskFilters
  onFilterChange: (filters: TaskFilters) => void
  categories: { id: string; name: string }[]
}

/**
 * Filter and search bar for task list
 * Includes status, priority, category filters and sorting
 */
export function TaskFilterBar({ filters, onFilterChange, categories }: TaskFilterBarProps) {
  const updateFilter = (key: keyof TaskFilters, value: any) => {
    onFilterChange({ ...filters, [key]: value })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 p-4 bg-card/50 rounded-xl border">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="pl-10 bg-background/50"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <Select value={filters.status} onValueChange={(v) => updateFilter('status', v)}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.priority} onValueChange={(v) => updateFilter('priority', v)}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.category} onValueChange={(v) => updateFilter('category', v)}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="icon"
          onClick={() => updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
          className={cn(filters.sortOrder === 'desc' && "bg-accent")}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}