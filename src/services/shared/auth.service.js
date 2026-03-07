import axios from 'axios'

export default {
  async getCurrentUser () {
    return axios.get('auth/me')
  },

  async signIn (params = {}) {
    return axios.post('auth/login', params)
  },

  async changePassword (params = {}) {
    return axios.post('auth/password', params)
  },

  async logout () {
    return axios.post('auth/logout')
  }
}
