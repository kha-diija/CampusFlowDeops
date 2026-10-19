import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import type { AxiosError } from 'axios'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'

const loginSchema = z.object({
  email: z.string().trim().email('Veuillez saisir une adresse e-mail valide.'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères.'),
  rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login({ email: values.email, password: values.password, rememberMe: values.rememberMe ?? true })
      navigate('/dashboard', { replace: true })
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>
      const message =
        axiosError.response?.data?.message ||
        (axiosError.code === 'ERR_NETWORK' ? 'Impossible de joindre le serveur' : 'E-mail ou mot de passe incorrect')

      setError('root', {
        type: 'manual',
        message,
      })
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center lg:text-left">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-secondary">Connexion</p>
        <h2 className="mt-2 text-3xl font-extrabold text-text-primary">Bon retour </h2>
      </div>

      {errors.root && (
        <Alert variant="error" className="mb-5">
          {errors.root.message}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <Input
          label="E-mail"
          type="email"
          placeholder="prenom.nom@campusflow.fr"
          icon={<Mail className="h-4 w-4" />}
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Mot de passe"
          type="password"
          placeholder="••••••••"
          icon={<LockKeyhole className="h-4 w-4" />}
          {...register('password')}
          error={errors.password?.message}
        />

        <div className="flex items-center justify-between gap-3 text-sm text-text-secondary">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('rememberMe')} className="h-4 w-4 rounded border-border bg-[#0D0D0D] text-brand-orange focus:ring-brand-orange" />
            <span>Se souvenir de moi</span>
          </label>
          <Link to="/forgot-password" className="font-medium text-brand-orange hover:text-[#ff8b4d]">
            Mot de passe oublié ?
          </Link>
        </div>

        <Button type="submit" className="w-full" size="lg" loading={isSubmitting} rightIcon={<ArrowRight className="h-4 w-4" />}>
          Se connecter
        </Button>
      </form>
    </div>
  )
}
