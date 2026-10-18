import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Modal({ isOpen, title, onClose, children, className }: { isOpen: boolean; title?: string; onClose: () => void; children: ReactNode; className?: string }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      <div className={cn('w-full max-w-lg rounded-2xl border border-border bg-[#0B0B0B] p-6 shadow-soft', className)}>
        <div className="mb-4 flex items-center justify-between">
          {title && <h3 className="text-lg font-semibold text-text-primary">{title}</h3>}
          <button type="button" onClick={onClose} className="rounded-full p-2 text-text-secondary hover:bg-white/5 hover:text-text-primary" aria-label="Fermer">
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
