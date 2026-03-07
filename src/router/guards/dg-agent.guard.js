import { useAuth } from '@/stores/auth.store'

export default function (to, from, next) {
  const auth = useAuth()
  const user = auth.user

  if (!user || user.role !== 'dga') {
    // Redirect to appropriate dashboard or login
    if (user && user.role) {
      next({ name: `${user.role}.dashboard` })
    } else {
      next({ name: 'shared.login' })
    }
  } else {
    next()
  }
}
