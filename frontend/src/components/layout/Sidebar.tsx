import { Building2, CalendarRange, LayoutDashboard, LogOut, Newspaper, ShieldCheck, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Tableau de bord', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Salles', to: '/salles', icon: Building2 },
  { label: 'Réservations', to: '/reservations', icon: CalendarRange },
  { label: 'Actualités', to: '/actualites', icon: Newspaper },
  { label: 'Utilisateurs', to: '/utilisateurs', icon: Users, personnelOnly: true },
]

export function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <aside className="flex h-screen w-[270px] flex-col border-r border-border bg-[#090909] p-4">
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-border bg-white/5 p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-lg font-bold text-white">
          C
        </div>
        <div>
          <p className="text-lg font-bold text-text-primary">CampusFlow</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-text-secondary">ENSA</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="px-3 text-[10px] font-medium uppercase tracking-[0.2em] text-text-secondary">Espace de travail</p>
      </div>

      <nav className="space-y-2">
        {navItems
          .filter((item) => !item.personnelOnly || user?.role === 'PERSONNEL')
          .map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-white/5 text-text-primary ring-1 ring-brand-orange/40'
                    : 'text-text-secondary hover:bg-white/5 hover:text-text-primary',
                )
              }
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/30">
                <Icon className="h-4 w-4" />
              </span>
              {label}
              {label === 'Tableau de bord' && <span className="ml-auto h-2 w-2 rounded-full bg-brand-orange" />}
            </NavLink>
          ))}
      </nav>

      <div className="mt-auto space-y-3 border-t border-border pt-4">
        <Button variant="secondary" className="w-full justify-between rounded-xl">
          <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Sécurité</span>
        </Button>
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-white/5 p-3">
          <Avatar name={user ? `${user.prenom} ${user.nom}` : 'CampusFlow'} />
          <div className="flex-1 truncate">
            <p className="truncate text-sm font-semibold text-text-primary">{user ? `${user.prenom} ${user.nom}` : 'Utilisateur'}</p>
            <p className="text-[10px] uppercase tracking-[0.16em] text-text-secondary">{user?.role ?? 'ETUDIANT'}</p>
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start gap-2 rounded-xl text-text-secondary" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Déconnexion
        </Button>
      </div>
    </aside>
  )
}
