import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  Settings, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Settings', href: '/settings', icon: Settings },
]

/**
 * Sidebar navigation component
 * Collapsible, responsive, with tooltips for collapsed state
 */
export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { pathname } = useLocation()
  const { profile, signOut } = useAuth()
  const { resolvedTheme } = useTheme()

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        "fixed left-0 top-0 z-40 h-screen flex flex-col border-r bg-card/50 backdrop-blur-xl",
        resolvedTheme === 'dark' ? 'border-white/10' : 'border-black/5'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center px-4">
        <Link to="/" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
            <Sparkles className="h-5 w-5 text-white dark:text-slate-900" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-lg font-bold tracking-tight whitespace-nowrap"
              >
                TaskFlow
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-md hover:bg-accent transition-colors"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <TooltipProvider delayDuration={collapsed ? 100 : 1000}>
          {navigation.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary shadow-sm"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="whitespace-nowrap overflow-hidden"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    {item.name}
                  </TooltipContent>
                )}
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </nav>

      {/* User section */}
      <div className="border-t p-3">
        <TooltipProvider delayDuration={collapsed ? 100 : 1000}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-3 rounded-xl p-2 hover:bg-accent transition-colors cursor-pointer">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={profile?.avatar_url || undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                    {profile?.full_name?.charAt(0) || profile?.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <AnimatePresence>
                  {!collapsed && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="flex-1 min-w-0 overflow-hidden"
                    >
                      <p className="text-sm font-medium truncate">
                        {profile?.full_name || 'User'}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {profile?.email}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                {profile?.full_name || profile?.email}
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={collapsed ? 100 : 1000}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size={collapsed ? "icon" : "default"}
                onClick={signOut}
                className="w-full mt-2 text-muted-foreground hover:text-destructive"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="ml-2 whitespace-nowrap overflow-hidden"
                    >
                      Sign Out
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                Sign Out
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.aside>
  )
}