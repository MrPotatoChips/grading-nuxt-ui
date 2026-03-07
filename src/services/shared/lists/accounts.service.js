import axios from 'axios'

export default {
  async getRoles (params = {}) {
    return axios.get('shared/lists/roles', { params })
  },

  async getUsers (params = {}) {
    return axios.get('shared/lists/users', { params })
  },

  async getDGAgents (params = {}) {
    return axios.get('shared/lists/dg-agents', { params })
  },

  async getGrowers (params = {}) {
    return axios.get('shared/lists/growers', { params })
  }
}
