import { useAuth } from "@/stores/auth.store"

export default function (_to, _from, navigate) {
  const { user } = useAuth()

  if (['admin'].includes(user?.role)) {
    return navigate()
  }

  return navigate({
    name: `${user?.role}.dashboard`
  })
}
