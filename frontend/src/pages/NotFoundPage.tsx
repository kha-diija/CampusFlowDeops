import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="max-w-md text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-brand-orange">Erreur 404</p>
        <h1 className="mt-3 text-5xl font-extrabold text-text-primary">Oups...</h1>
        <p className="mt-4 text-base text-text-secondary">La page que vous cherchez n’existe pas ou a été déplacée.</p>
        <Link to="/dashboard" className="mt-6 inline-block">
          <Button leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Retour au tableau de bord
          </Button>
        </Link>
      </div>
    </div>
  )
}
