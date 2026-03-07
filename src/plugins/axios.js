import { AxiosError } from 'axios'
import { useAuth } from '@/stores/auth.store'

import router from '@/router'
import { overlays } from '@/composables/overlays'

export const setupAxios = axios => {

  axios.defaults.baseURL = import.meta.env.VITE_API_URL
  // Request interceptor
  axios.interceptors.request.use(config => {
    const { token } = useAuth()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  // Response interceptor
  axios.interceptors.response.use(
    response => Promise.resolve(response),
    async error => {
      let message = {
        title: 'Error Connection',
        text: 'Please check your internet connection'
      }

      let requestError = new AxiosError(error?.message, 500)

      if (error.response && error.response.data) {
        const { data, status } = error.response // , statusText

        requestError = new AxiosError(data, status)

        switch (status) {
          case 400: { // bad request
            message = {
              title: 'Oops!', // 'Invalid Credentials / Payload',
              text: data.message
            }
            break
          }
          case 401: {
            message = {
              title: 'Session Expired', // 'Session Expired',
              text: 'Due to inactivity, please log in again'
            }
            break
          }
          case 403: {
            message = {
              title: 'Forbidden Page', // 'Unauthorize Access',
              text: 'You are attempting to access a restricted page.'
            }
            break
          }
          case 404: {
            message = {
              title: 'Page Not Found',
              text: 'You are attempting to access a unknown page.'
            }
            break
          }
          case 413: {
            message = {
              title: 'Attachment Too Large',
              text: 'Please limit the size of your files.'
            }
            break
          }
          case 422: { // unprocessable
            message = {
              title: 'Validation Error', // 'Invalid Data Format',
              text: 'Your inputs seem to be incorrect or incomplete, please check and try again.'
            }
            break
          }
          case 429: { // many request
            message = {
              title: 'Too Many Request',
              text: 'Please limit reloading the page'
            }
            break
          }
          default: {
            message = {
              title: 'Oops!', // 'Server Error'
              text: 'Something went wrong, please contact your System Administrator'
            }
          }
        }
      } else {
        if (navigator.onLine) {
          message = {
            title: 'Oops!', // 'Server Error'
            text: 'Something went wrong, please contact your System Administrator'
          }
        }
      }

      return overlays.invalid({
        title: message.title,
        body: message.text,
        confirmButtonText: 'Dismiss',
        confirmButtonVariant: 'error',
        preConfirm: () => {
          if ([401, 403].includes(requestError.code)) {
            const { user, setToken, setUser  } = useAuth()
            if (user) {
              setUser({})
              setToken('')
            }

            router.replace({ name: 'shared.login' })
            return Promise.resolve()
          }

          return Promise.reject(requestError)
        }
      })
    }
  )

  return axios
}
