import axios from 'axios'

const SSOService = {
  async post (params = {}) {
    return axios.post('auth/sso/oauth2', params)
  }
}

export default SSOService
