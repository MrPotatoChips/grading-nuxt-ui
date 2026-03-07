import axios from 'axios'

export default {
  async get (params = {}) {
    return axios.get('dgs/agent-tasks', { params })
  },

  async show (id) {
    return axios.get(`dgs/agent-tasks/${id}`)
  },

  async post (params = {}) {
    return axios.post('dgs/agent-tasks', params)
  },

  async put (params = { id: '' }) {
    return axios.put(`dgs/agent-tasks/${params.id}`, params)
  },

  async delete (data = { id: '' }) {
    return axios.delete(`dgs/agent-tasks/${data.id}`, { data })
  }
}
