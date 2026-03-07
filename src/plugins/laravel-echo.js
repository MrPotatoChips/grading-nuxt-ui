import { useAuth } from '@/stores/auth.store'
import LaravelEcho from 'laravel-echo'

import Pusher from 'pusher-js'

export const setupEcho = () => {
  const auth = useAuth()

  if (!auth.token) {
    return
  }

  window.Pusher = Pusher

  const tine = new LaravelEcho({
      broadcaster: 'pusher',
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      authEndpoint: `${import.meta.env.VITE_API_BASE_URL}/broadcasting/auth`,
      bearerToken: auth.token,
      forceTLS: true
  })

  window.Echo = tine

  tine.join('chat').here(
    users => {
      console.log('Currently Online:', users)
    }
  ).listen('message.sent', evt => {
    console.log('Message Received:', evt)
  }).error(
    error => {
      console.error('Echo Error:', error)
    }
  )

  tine.join('presence-chat').here(
    users => {
      console.log('Currently Online:', users)
    }
  ).joining(
    user => {
      console.log('User Joined:', user)
    }
  ).leaving(
    user => {
      console.log('User Left:', user)
    }
  ).error(
    error => {
      console.error('Echo Error:', error)
    }
  )
}
