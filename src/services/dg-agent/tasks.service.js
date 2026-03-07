import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('dga/tasks', { params })
  },

  async show (id) {
    return axios.get(`dga/tasks/${id}`)
  },

  async post (params = {}) {
    return axios.post('dga/tasks', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`dga/tasks/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`dga/tasks/${data.id}`, { data })
  },

  async complete (id, params = {}) {
    return axios.post(`dga/tasks/${id}/complete`, params)
  }
}
