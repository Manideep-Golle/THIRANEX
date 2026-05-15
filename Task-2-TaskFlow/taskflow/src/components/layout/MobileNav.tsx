import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, LayoutDashboard, CheckSquare, Calendar, Settings, Sparkles } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Tasks', href: '/tasks', icon: CheckSquare },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Settings', href: '/settings', icon: Settings },
]

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

/**
 * Mobile slide-out navigation drawer
 */
export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { pathname } = useLocation()
  const { profile, signOut } = useAuth()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 z-50 h-full w-72 bg-card shadow-2xl lg:hidden"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex h-16 items-center justify-between px-4 border-b">
                <Link to="/" className="flex items-center gap-2" onClick={onClose}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                    <Sparkles className="h-4 w-4 text-white dark:text-slate-900" />
                  </div>
                  <span className="font-bold text-lg">TaskFlow</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* User info */}
              <div className="flex items-center gap-3 p-4 border-b">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={profile?.avatar_url || undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {profile?.full_name?.charAt(0) || profile?.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {profile?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {profile?.email}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-1 p-3">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      )}
                    >
                      <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>

              {/* Footer */}
              <div className="border-t p-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-destructive"
                  onClick={() => {
                    signOut()
                    onClose()
                  }}
                >
                  <span className="mr-2">→</span>
                  Sign Out
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}