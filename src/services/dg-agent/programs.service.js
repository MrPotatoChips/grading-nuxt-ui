import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('dga/programs', { params })
  },

  async show (id) {
    return axios.get(`dga/programs/${id}`)
  },

  async post (params = {}) {
    return axios.post('dga/programs', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`dga/programs/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`dga/programs/${data.id}`, { data })
  },

  async submit (id) {
    return axios.post(`dga/programs/${id}/submit`)
  }
}
