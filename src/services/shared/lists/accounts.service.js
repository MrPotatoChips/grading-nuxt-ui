import axios from 'axios'

export default {
  async getRoles (params = {}) {
    return axios.get('shared/list/roles', { params })
  },

  async getUsers (params = {}) {
    return axios.get('shared/list/users', { params })
  },

  async getDGAgents (params = {}) {
    return axios.get('shared/list/dg-agents', { params })
  },

  async getGrowers (params = {}) {
    return axios.get('shared/list/growers', { params })
  }
}
