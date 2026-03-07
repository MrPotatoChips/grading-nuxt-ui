import { useAuth } from "@/stores/auth.store"

export default async (_to, _from, navigate) => {
  const { user } = useAuth()

  if (!user?.role) {
    return navigate({
      name: `shared.login`
    })
  }

  return navigate()
}
