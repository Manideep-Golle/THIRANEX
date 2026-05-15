import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTasks } from '@/hooks/useTasks'
import { cn, formatDate } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

/**
 * Simple calendar view showing tasks by date
 * Visual month view with task indicators
 */
export default function Calendar() {
  const { tasks } = useTasks()
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDay = firstDay.getDay()

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const getTasksForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return tasks.filter(t => t.due_date?.startsWith(dateStr))
  }

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <CalendarIcon className="h-6 w-6" />
          Calendar
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          View your tasks by date.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">
              {monthNames[month]} {year}
            </h2>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month starts */}
            {[...Array(startingDay)].map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Days */}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1
              const dayTasks = getTasksForDay(day)
              const isToday = new Date().toDateString() === new Date(year, month, day).toDateString()

              return (
                <motion.div
                  key={day}
                  whileHover={{ scale: 1.05 }}
                  className={cn(
                    "aspect-square rounded-lg border p-1 transition-colors cursor-pointer hover:bg-accent",
                    isToday && "border-primary bg-primary/5"
                  )}
                >
                  <div className={cn(
                    "text-xs font-medium text-center",
                    isToday && "text-primary"
                  )}>
                    {day}
                  </div>
                  <div className="flex flex-wrap gap-0.5 mt-1 justify-center">
                    {dayTasks.slice(0, 3).map((task, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          task.priority === 'high' && "bg-red-500",
                          task.priority === 'medium' && "bg-amber-500",
                          task.priority === 'low' && "bg-emerald-500",
                        )}
                      />
                    ))}
                    {dayTasks.length > 3 && (
                      <span className="text-[8px] text-muted-foreground">+{dayTasks.length - 3}</span>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tasks for selected/upcoming */}
      <div className="space-y-2">
        <h3 className="font-semibold">Upcoming Tasks</h3>
        {tasks
          .filter(t => t.status === 'pending' && t.due_date)
          .sort((a, b) => new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime())
          .slice(0, 5)
          .map(task => (
            <Card key={task.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(task.due_date)}</p>
                </div>
                <Badge variant={task.priority} className="text-xs capitalize">
                  {task.priority}
                </Badge>
              </div>
            </Card>
          ))}
      </div>
    </div>
  )
}