import type { ReactNode } from 'react'
import { ArrowRight, Building2, CalendarCheck2, Newspaper } from 'lucide-react'

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen bg-bg text-text-primary lg:grid-cols-[1.08fr_0.92fr]">
      <div className="flex items-center justify-center bg-[#080808] px-6 py-12 lg:px-12">{children}</div>
      <div className="hidden bg-brand-gradient p-10 lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl font-bold text-white">C</div>
            <div>
              <div className="text-2xl font-bold text-white">CampusFlow</div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/70">ENSA</div>
            </div>
          </div>
          <div className="max-w-md text-4xl font-extrabold leading-tight text-white">
            Votre campus, simplifié.
          </div>
        </div>

        <div className="space-y-5">
          {[
            { icon: Building2, label: 'Salles', text: 'Accédez aux ressources pédagogiques en quelques clics.' },
            { icon: CalendarCheck2, label: 'Réservations', text: 'Gérez les demandes et les disponibilités en temps réel.' },
            { icon: Newspaper, label: 'Actualités', text: 'Suivez les annonces du campus et les événements clés.' },
          ].map(({ icon: Icon, label, text }) => (
            <div key={label} className="flex items-start gap-4 rounded-2xl border border-white/15 bg-black/10 p-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg font-semibold text-white">{label}</div>
                <div className="mt-1 text-sm text-white/75">{text}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm text-white/80">
          <span>Tout commence ici</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}
