import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Bell, Sun, Moon, Menu, Sparkles } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface HeaderProps {
  onMenuClick?: () => void
  onSearch?: (query: string) => void
  searchValue?: string
}

/**
 * Top header bar with search, theme toggle, and notifications
 */
export function Header({ onMenuClick, onSearch, searchValue = '' }: HeaderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { profile } = useAuth()
  const [search, setSearch] = useState(searchValue)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    onSearch?.(value)
  }

  return (
    <header className="sticky top-0 z-30 w-full glass border-b">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-8">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo - mobile only */}
        <Link to="/" className="flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
            <Sparkles className="h-4 w-4 text-white dark:text-slate-900" />
          </div>
          <span className="font-bold">TaskFlow</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-xl hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-10 bg-background/50 border-0 focus-visible:ring-1"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="relative"
          >
            <Sun className={cn("h-4 w-4 transition-all", resolvedTheme === 'dark' ? "scale-0 opacity-0" : "scale-100 opacity-100")} />
            <Moon className={cn("absolute h-4 w-4 transition-all", resolvedTheme === 'dark' ? "scale-100 opacity-100" : "scale-0 opacity-0")} />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </Button>

          {/* User avatar */}
          <Avatar className="h-8 w-8 border-2 border-background">
            <AvatarImage src={profile?.avatar_url || undefined} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {profile?.full_name?.charAt(0) || profile?.email?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}