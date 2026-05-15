import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, User, Moon, Bell, Shield, Palette } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

/**
 * Settings page for user preferences and profile management
 */
export default function Settings() {
  const { profile, user } = useAuth()
  const { theme, setTheme } = useTheme()
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [saving, setSaving] = useState(false)

  const handleSaveProfile = async () => {
    setSaving(true)
    // In a real app, you'd update the profile here
    setTimeout(() => {
      toast.success('Profile updated!')
      setSaving(false)
    }, 500)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <SettingsIcon className="h-6 w-6" />
          Settings
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your account and preferences.
        </p>
      </div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                  {profile?.full_name?.charAt(0) || profile?.email?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{profile?.full_name || 'User'}</p>
                <p className="text-sm text-muted-foreground">{profile?.email}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
              />
            </div>

            <Button onClick={handleSaveProfile} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Appearance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Palette className="h-4 w-4" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <label className="text-sm font-medium">Theme</label>
              <div className="flex gap-2">
                {(['light', 'dark', 'system'] as const).map((t) => (
                  <Button
                    key={t}
                    variant={theme === t ? 'default' : 'outline'}
                    onClick={() => setTheme(t)}
                    className="capitalize flex-1"
                  >
                    <Moon className={cn("h-4 w-4 mr-2", t === 'light' && "hidden")} />
                    {t}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="h-4 w-4" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Task Reminders</p>
                  <p className="text-xs text-muted-foreground">Get notified about upcoming tasks</p>
                </div>
                <div className="h-5 w-10 rounded-full bg-primary relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Due Date Alerts</p>
                  <p className="text-xs text-muted-foreground">Alert when tasks are due soon</p>
                </div>
                <div className="h-5 w-10 rounded-full bg-primary relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}