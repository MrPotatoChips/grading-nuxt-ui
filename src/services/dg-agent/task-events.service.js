import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('dga/task-events', { params })
  },

  async show (id) {
    return axios.get(`dga/task-events/${id}`)
  },

  async post (params = {}) {
    return axios.post('dga/task-events', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`dga/task-events/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`dga/task-events/${data.id}`, { data })
  },

  async complete (id, params = {}) {
    return axios.post(`dga/task-events/${id}/complete`, params)
  }
}
