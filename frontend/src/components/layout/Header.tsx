import { Bell, Moon, SunMedium } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/input'
import { useTheme } from '@/context/ThemeContext'

export function Header({ title }: { title: string }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="flex items-center justify-between gap-4 border-b border-border bg-[#090909]/80 px-6 py-4 backdrop-blur">
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-text-secondary">CampusFlow</p>
        <h1 className="mt-1 text-2xl font-bold text-text-primary">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-[320px] max-w-[32vw]">
          <SearchInput placeholder="Rechercher..." />
        </div>
        <Button variant="secondary" size="sm" className="rounded-full px-3" onClick={toggleTheme} aria-label="Changer de thème">
          {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button variant="secondary" size="sm" className="rounded-full px-3" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
