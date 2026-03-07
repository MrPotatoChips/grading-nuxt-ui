import axios from 'axios'

export default {
  async getPending (params = {}) {
    return axios.get('marketing-officer/programs/pending', { params })
  },

  async getHistory (params = {}) {
    return axios.get('marketing-officer/programs/history', { params })
  },

  async show (id) {
    return axios.get(`marketing-officer/programs/${id}`)
  },

  async approve (id, params = {}) {
    return axios.post(`marketing-officer/programs/${id}/approve`, params)
  },

  async reject (id, params = {}) {
    return axios.post(`marketing-officer/programs/${id}/reject`, params)
  }
}
