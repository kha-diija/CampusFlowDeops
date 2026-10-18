import { Building2, CalendarCheck2, CalendarRange, Newspaper } from 'lucide-react'
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, StatCard } from '@/components/ui/card'
import { ChartCard } from '@/components/ui/chart-card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'

const stats = [
  { title: 'Salles disponibles', value: '18', icon: <Building2 className="h-4 w-4" />, trend: 8, trendLabel: 'vs. semaine dernière' },
  { title: 'Mes réservations', value: '06', icon: <CalendarCheck2 className="h-4 w-4" />, trend: 3, trendLabel: 'en cours' },
  { title: 'Réservations du jour', value: '24', icon: <CalendarRange className="h-4 w-4" />, trend: -2, trendLabel: 'à valider' },
  { title: 'Actualités', value: '12', icon: <Newspaper className="h-4 w-4" />, trend: 10, trendLabel: 'nouveautés' },
]

const barData = [
  { name: 'Lun', salles: 18, reservations: 11 },
  { name: 'Mar', salles: 22, reservations: 16 },
  { name: 'Mer', salles: 20, reservations: 14 },
  { name: 'Jeu', salles: 24, reservations: 18 },
  { name: 'Ven', salles: 16, reservations: 12 },
]

const pieData = [
  { name: 'Disponibles', value: 62, color: '#E85002' },
  { name: 'Occupées', value: 26, color: '#C10801' },
  { name: 'Maintenance', value: 12, color: '#D9C3AB' },
]

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-brand-gradient p-6 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">Bienvenue</p>
            <h2 className="mt-2 text-3xl font-extrabold text-white">Bonjour, {user?.prenom ?? 'Étudiant'}.</h2>
          </div>
          <Badge variant="brand">CampusFlow Live</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
            trend={item.trend}
            trendLabel={item.trendLabel}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <ChartCard title="Activité hebdomadaire">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#A7A7A7" tickLine={false} axisLine={false} />
                <YAxis stroke="#A7A7A7" tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="reservations" fill="#E85002" radius={[8, 8, 0, 0]} />
                <Bar dataKey="salles" fill="#D9C3AB" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Disponibilité des salles">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={55} outerRadius={82} dataKey="value" paddingAngle={4}>
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>À surveiller</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-text-secondary">Salles turbulentes</p>
              <p className="mt-2 text-xl font-bold text-text-primary">Amphi 3</p>
              <p className="mt-1 text-sm text-text-secondary">Réservation confirmée à 17h00.</p>
            </div>
            <div className="rounded-xl border border-border bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-text-secondary">Événements</p>
              <p className="mt-2 text-xl font-bold text-text-primary">06</p>
              <p className="mt-1 text-sm text-text-secondary">Les prochains jours sont chargés.</p>
            </div>
            <div className="rounded-xl border border-border bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-text-secondary">Dossiers</p>
              <p className="mt-2 text-xl font-bold text-text-primary">09</p>
              <p className="mt-1 text-sm text-text-secondary">Demandes en attente de validation.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
