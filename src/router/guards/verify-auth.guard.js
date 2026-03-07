import { SSharedAuth } from "@/services/shared"
import { useAuth } from "@/stores/auth.store"

export default async (_to, _from, navigate) => {
  const { user, token, setUser } = useAuth()

  if (!user?.role && token) {
    await SSharedAuth.getCurrentUser().then(
      ({ data: user }) => {
        setUser({
          id: user.id,
          email: user.email,
          role: user.role.role_code,
          role_name: user.role.role_name,
          username: user.username,
          name: user.name
        })
      }
    ).catch(() => {
      setUser({})
    })
  }

  return navigate()
}
