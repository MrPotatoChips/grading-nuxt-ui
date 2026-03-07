import { defineStore } from "pinia"
import cookieStorage from 'js-cookie'

const AUTH_STORAGE_KEY = 'auth'

const useAuth = defineStore(AUTH_STORAGE_KEY, {
  state: () => ({
    user: {},
    token: ''
  }),
  actions: {
    setUser (newUser) {
      this.user = newUser
    },
    setToken (newToken) {
      this.token = newToken
    },
    clear () {
      this.user = {}
      this.token = ''
    }
  },
  persist: {
    key: AUTH_STORAGE_KEY,
    storage: {
      getItem: key => cookieStorage.get(key),
      setItem: (key, value) => cookieStorage.set(key, value, {
        secure: true,
        sameSite: 'strict',
        expires: 7 // days
      }),
      removeItem: key => cookieStorage.remove(key)
    }
  }
})

export { useAuth }
